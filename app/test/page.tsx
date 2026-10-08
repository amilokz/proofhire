'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../components/AppProvider';
import { Card, PageHead, ProgressBar, SimulatedLabel, VerifiedBadge } from '../../components/ui';
import { QUESTIONS, STACKS, TEST_MINUTES, PASS_SCORE } from '../../data/questions';
import { loadMyProfile, saveMyProfile } from '../../lib/myprofile';
import { isVerified } from '../../lib/dev';

type Phase = 'choose' | 'running' | 'done';

export default function TestPage() {
  const { t } = useApp();
  const [phase, setPhase] = useState<Phase>('choose');
  const [stack, setStack] = useState(STACKS[0]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [seconds, setSeconds] = useState(TEST_MINUTES * 60);
  const [timedOut, setTimedOut] = useState(false);
  const [hasProfile, setHasProfile] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const answersRef = useRef<(number | null)[]>([]);

  const questions = useMemo(() => QUESTIONS[stack], [stack]);

  useEffect(() => {
    setHasProfile(loadMyProfile() !== null);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const setAnswer = (qIdx: number, optIdx: number) => {
    answersRef.current[qIdx] = optIdx;
    setAnswers((a) => {
      const n = [...a];
      n[qIdx] = optIdx;
      return n;
    });
  };

  const computeScore = () => {
    const qs = QUESTIONS[stack];
    const ans = answersRef.current;
    const correct = qs.filter((q, i) => ans[i] === q.answer).length;
    return { correct, score: Math.round((correct / qs.length) * 100) };
  };

  const persistScore = () => {
    const p = loadMyProfile();
    if (!p) return;
    const { score } = computeScore();
    if (p.testStack === stack) {
      p.testScore = Math.max(score, p.testScore ?? 0);
    } else {
      p.testStack = stack;
      p.testScore = score;
    }
    saveMyProfile(p);
  };

  const finish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    persistScore();
    setPhase('done');
  };

  // auto-submit when the clock hits zero
  useEffect(() => {
    if (phase === 'running' && seconds === 0) {
      setTimedOut(true);
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, phase]);

  const start = () => {
    const p = loadMyProfile();
    if (!p) {
      setHasProfile(false);
      return;
    }
    const blank = Array(questions.length).fill(null);
    answersRef.current = blank;
    setAnswers(blank);
    setIdx(0);
    setSeconds(TEST_MINUTES * 60);
    setTimedOut(false);
    setPhase('running');
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSeconds((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
  };

  const correct = questions.filter((q, i) => answers[i] === q.answer).length;
  const score = Math.round((correct / questions.length) * 100);
  const passed = score >= PASS_SCORE;
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const urgent = seconds < 120;

  if (!hasProfile && phase !== 'running') {
    return (
      <div>
        <PageHead title={t('test.title')} sub={t('test.sub')} />
        <Card className="text-center">
          <p className="text-zinc-500 dark:text-zinc-400">Build your profile first, then take the test.</p>
          <Link href="/build" className="btn-primary mt-5 inline-flex">
            {t('landing.cta.build')}
          </Link>
        </Card>
      </div>
    );
  }

  if (phase === 'choose') {
    const prev = loadMyProfile();
    return (
      <div>
        <PageHead title={t('test.title')} sub={t('test.sub')} />
        <Card>
          <h2 className="mb-5 text-lg font-bold tracking-tight">📚 {t('test.choose')}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {STACKS.map((s) => (
              <button
                key={s}
                onClick={() => setStack(s)}
                className={`rounded-2xl border-2 px-4 py-5 text-sm font-bold transition-all duration-200 ${
                  stack === s
                    ? 'border-accent-500 bg-accent-500/10 text-accent-700 shadow-glow dark:text-accent-200'
                    : 'border-zinc-200 text-zinc-600 hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-card dark:border-white/10 dark:text-zinc-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">{t('test.rules')}</p>
          {prev?.testScore != null && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-1.5 text-sm font-semibold text-accent-700 dark:text-accent-200">
              {t('profile.testscore')}: {prev.testScore}/100 ({prev.testStack})
              {isVerified(prev) && <VerifiedBadge size="sm" />}
            </p>
          )}
          <button
            onClick={start}
            className="btn-primary mt-7 w-full px-8 py-4 text-base sm:w-auto"
          >
            ▶ {t('test.start')} — {stack}
          </button>
        </Card>
      </div>
    );
  }

  if (phase === 'running') {
    const q = questions[idx];
    const answered = answers.filter((a) => a !== null).length;
    return (
      <div>
        <div className="mb-6 flex items-center justify-between gap-3">
          <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">{stack} — {t('test.title')}</h1>
          <div
            className={`rounded-2xl px-4 py-2 font-mono text-lg font-bold shadow-sm ring-1 ${
              urgent ? 'bg-red-500/15 text-red-600 ring-red-500/30 dark:text-red-300' : 'bg-accent-500/10 text-accent-700 ring-accent-500/25 dark:text-accent-200'
            }`}
            role="timer"
            aria-label={t('test.time.left')}
          >
            ⏱ {mm}:{ss}
          </div>
        </div>
        <div className="mb-4 flex items-center gap-3">
          <ProgressBar value={(answered / questions.length) * 100} className="flex-1" />
          <span className="text-xs text-zinc-500">{answered}/{questions.length}</span>
        </div>

        <Card>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            {t('test.question')} {idx + 1} {t('test.of')} {questions.length}
          </p>
          <h2 className="mt-2 text-lg font-bold tracking-tight sm:text-xl">{q.q}</h2>
          <div className="mt-5 space-y-2.5" role="radiogroup" aria-label={q.q}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                role="radio"
                aria-checked={answers[idx] === i}
                onClick={() => setAnswer(idx, i)}
                className={`w-full rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${
                  answers[idx] === i
                    ? 'border-accent-500 bg-accent-500/15 text-accent-800 shadow-glow dark:text-accent-100'
                    : 'border-zinc-200 hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-card dark:border-white/10'
                }`}
              >
                <span className={`mr-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${
                  answers[idx] === i ? 'bg-accent-600 text-white' : 'bg-zinc-100 dark:bg-white/10'
                }`}>
                  {['A', 'B', 'C', 'D'][i]}
                </span>
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-7 flex items-center justify-between">
            <button
              onClick={() => setIdx((v) => Math.max(0, v - 1))}
              disabled={idx === 0}
              className="btn-ghost disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← {t('test.prev')}
            </button>
            <div className="hidden gap-1.5 sm:flex">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`${t('test.question')} ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${answers[i] !== null ? 'bg-accent-500' : 'bg-zinc-300 dark:bg-white/20'} ${i === idx ? 'ring-2 ring-accent-400 ring-offset-2 dark:ring-offset-[#0b0713]' : ''}`}
                />
              ))}
            </div>
            {idx < questions.length - 1 ? (
              <button
                onClick={() => setIdx((v) => v + 1)}
                className="btn-primary btn-sm !px-5 !py-2.5 !text-sm"
              >
                {t('test.next')} →
              </button>
            ) : (
              <button
                onClick={() => finish()}
                className="btn-sm inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                ✓ {t('test.submit')}
              </button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // done
  const prof = loadMyProfile();
  return (
    <div>
      <PageHead title={t('test.result')} sub={timedOut ? t('test.timeout') : ''} />
      <Card className="hero-mesh relative text-center">
        <div
          className={`sheen relative mx-auto flex h-36 w-36 items-center justify-center rounded-full text-4xl font-extrabold text-white ${
            passed ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-[0_18px_50px_-16px_rgba(16,185,129,0.6)]' : 'bg-gradient-to-br from-accent-500 to-violet-700 shadow-glow-lg'
          }`}
        >
          {score}
        </div>
        <p className="relative mt-5 text-lg font-bold">
          {correct}/{questions.length} {t('test.question')}s · {stack}
        </p>
        <p className={`relative mt-1.5 text-sm font-semibold ${passed ? 'text-green-600 dark:text-green-300' : 'text-zinc-500'}`}>
          {passed ? `🎉 ${PASS_SCORE}+ — ${t('profile.verified')} track!` : `${t('test.retake')} · ${PASS_SCORE}+ needed for badge`}
        </p>
        {prof && isVerified(prof) && (
          <div className="relative mt-4 flex justify-center"><VerifiedBadge /></div>
        )}
        <p className="relative mt-2 text-xs text-zinc-500">{t('test.saved')}</p>
        <div className="relative mt-7 flex justify-center gap-3">
          <button
            onClick={() => setPhase('choose')}
            className="btn-secondary btn-sm !px-5 !py-2.5 !text-sm"
          >
            ↻ {t('test.retake')}
          </button>
          <Link href="/profile" className="btn-primary btn-sm !px-5 !py-2.5 !text-sm">
            {t('profile.title')} →
          </Link>
        </div>
      </Card>

      <h2 className="mb-4 mt-10 text-lg font-bold tracking-tight">Answer review</h2>
      <div className="space-y-2.5">
        {questions.map((q, i) => {
          const ok = answers[i] === q.answer;
          return (
            <details key={i} className="card-premium group p-4">
              <summary className="cursor-pointer text-sm font-semibold">
                <span className={ok ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}>
                  {ok ? '✓' : '✗'}
                </span>{' '}
                Q{i + 1}: {q.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                <strong>Correct:</strong> {q.options[q.answer]} — {q.why}
              </p>
              {!ok && answers[i] != null && (
                <p className="mt-1 text-sm text-zinc-500">Your answer: {q.options[answers[i]!]}</p>
              )}
            </details>
          );
        })}
      </div>
      <div className="mt-4"><SimulatedLabel /></div>
    </div>
  );
}
