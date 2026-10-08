'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../components/AppProvider';
import { Card, PageHead, SimulatedLabel } from '../../components/ui';
import DevCard from '../../components/DevCard';
import { DEVELOPERS } from '../../data/developers';
import { STACKS } from '../../data/questions';
import { getJSON, setJSON } from '../../lib/storage';
import { ParsedQuery, parseQuery, rankDevs, RankedDev } from '../../lib/search';
import { setViewedDev } from '../../lib/current';
import { Availability, fmtPKR, isVerified } from '../../lib/dev';

const CITIES = ['Rawalpindi', 'Islamabad', 'Lahore', 'Karachi', 'Peshawar', 'Multan', 'Faisalabad', 'Hyderabad', 'Quetta'];

interface Filters {
  stack: string;
  city: string;
  minYears: string;
  maxBudget: string;
  avail: string;
  verifiedOnly: boolean;
}

const EMPTY_F: Filters = { stack: '', city: '', minYears: '', maxBudget: '', avail: '', verifiedOnly: false };

function getSR(): any {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export default function SearchPage() {
  const { t, lang } = useApp();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [parsed, setParsed] = useState<ParsedQuery | null>(null);
  const [results, setResults] = useState<RankedDev[]>([]);
  const [filters, setFilters] = useState<Filters>(EMPTY_F);
  const [showFilters, setShowFilters] = useState(false);
  const [shortlist, setShortlist] = useState<string[]>(() => getJSON<string[]>('proofhire-shortlist', []));
  const [compareSel, setCompareSel] = useState<string[]>(() => getJSON<string[]>('proofhire-compare', []));
  const [credits, setCredits] = useState(() => getJSON<number>('proofhire-credits', 10));
  const [unlocked, setUnlocked] = useState<string[]>(() => getJSON<string[]>('proofhire-unlocked', []));
  const [listening, setListening] = useState(false);
  const [voiceNA, setVoiceNA] = useState(false);
  const [noCredits, setNoCredits] = useState(false);
  const srRef = useRef<any>(null);

  const runSearch = (q: string, f: Filters) => {
    const pq = parseQuery(q);
    let pool = DEVELOPERS.slice();
    if (f.stack) pool = pool.filter((d) => d.stack === f.stack || d.skills.includes(f.stack));
    if (f.city) pool = pool.filter((d) => d.city === f.city);
    if (f.minYears) pool = pool.filter((d) => d.yearsExp >= parseInt(f.minYears, 10));
    if (f.maxBudget) pool = pool.filter((d) => d.expectedSalary <= parseInt(f.maxBudget, 10));
    if (f.avail) pool = pool.filter((d) => d.availability === (f.avail as Availability));
    if (f.verifiedOnly) pool = pool.filter(isVerified);
    setParsed(pq);
    setResults(rankDevs(pool, pq, lang === 'ur', t));
  };

  // initial run: show everything ranked
  useEffect(() => {
    runSearch('', EMPTY_F);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (k: string, v: unknown) => setJSON(k, v);

  const toggleShortlist = (id: string) => {
    setShortlist((s) => {
      const n = s.includes(id) ? s.filter((x) => x !== id) : [...s, id];
      persist('proofhire-shortlist', n);
      return n;
    });
  };

  const toggleCompare = (id: string) => {
    setCompareSel((s) => {
      if (s.includes(id)) {
        const n = s.filter((x) => x !== id);
        persist('proofhire-compare', n);
        return n;
      }
      if (s.length >= 3) return s;
      const n = [...s, id];
      persist('proofhire-compare', n);
      return n;
    });
  };

  const unlock = (id: string) => {
    if (unlocked.includes(id)) return;
    if (credits <= 0) {
      setNoCredits(true);
      return;
    }
    const c = credits - 1;
    setCredits(c);
    persist('proofhire-credits', c);
    setUnlocked((u) => {
      const n = [...u, id];
      persist('proofhire-unlocked', n);
      return n;
    });
  };

  const viewDev = (id: string) => {
    setViewedDev(id);
    router.push('/profile');
  };

  const startListening = () => {
    const SR = getSR();
    if (!SR) {
      setVoiceNA(true);
      return;
    }
    try {
      const rec = new SR();
      srRef.current = rec;
      rec.lang = lang === 'ur' ? 'ur-PK' : 'en-US';
      rec.interimResults = false;
      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript as string;
        setQuery(text);
        setListening(false);
        runSearch(text, filters);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => {
        setListening(false);
        setVoiceNA(true);
      };
      setListening(true);
      rec.start();
    } catch {
      setVoiceNA(true);
    }
  };

  const speakSummary = () => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      const top = results.slice(0, 3);
      const text =
        lang === 'ur'
          ? `${top.length} behtareen matches. ${top.map((r, i) => `${i + 1}. ${r.dev.name}, ${r.dev.stack}, ${r.score} percent match`).join('. ')}`
          : `Top ${top.length} matches. ${top.map((r, i) => `${i + 1}. ${r.dev.name}, ${r.dev.stack}, ${r.score} percent match`).join('. ')}`;
      synth.cancel();
      synth.speak(new SpeechSynthesisUtterance(text));
    } catch {
      /* voice unsupported — text UI remains */
    }
  };

  const setF = (k: keyof Filters, v: string | boolean) =>
    setFilters((f) => {
      const n = { ...f, [k]: v };
      return n;
    });

  const applyFilters = (f: Filters) => runSearch(query, f);

  const chips: string[] = useMemo(() => {
    if (!parsed) return [];
    const c: string[] = [];
    parsed.stacks.forEach((s) => c.push(`stack: ${s}`));
    if (parsed.city) c.push(`city: ${parsed.city}`);
    if (parsed.minYears != null) c.push(`${parsed.minYears}+ yrs`);
    if (parsed.maxBudget != null) c.push(`≤ ${fmtPKR(parsed.maxBudget)}`);
    if (parsed.availability) c.push(parsed.availability.replace('-', ' '));
    return c;
  }, [parsed]);

  const inputCls = 'field';

  return (
    <div>
      <PageHead title={t('search.title')} sub={t('search.sub')} />

      {/* search bar + voice */}
      <Card className="hero-mesh mb-4">
        <div className="relative flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runSearch(query, filters)}
            placeholder={t('search.placeholder')}
            aria-label={t('search.title')}
            className="field flex-1 rounded-2xl border-2 border-accent-500/30 px-5 py-3.5 text-sm shadow-sm focus:border-accent-500 sm:text-base"
          />
          <button
            onClick={startListening}
            title="Voice search (Web Speech API)"
            aria-label="Voice search"
            className={`shrink-0 rounded-2xl px-4 text-xl transition-all duration-200 hover:-translate-y-0.5 ${listening ? 'animate-pulse-ring bg-red-500 text-white' : 'border-2 border-accent-500/30 bg-white/50 hover:border-accent-500 hover:shadow-glow dark:bg-white/5'}`}
          >
            🎤
          </button>
          <button
            onClick={() => runSearch(query, filters)}
            className="btn-primary shrink-0 px-6 py-3.5"
          >
            {t('search.button')}
          </button>
        </div>
        {listening && <p className="mt-2 text-sm font-semibold text-red-500">🎙️ {t('search.listening')}…</p>}
        {voiceNA && <p className="mt-2 text-xs text-zinc-500">{t('search.voice.na')}</p>}

        {/* AI-parsed panel */}
        {parsed && (chips.length > 0 || query) && (
          <div className="relative mt-4 rounded-2xl border border-accent-500/20 bg-accent-500/5 p-4 dark:bg-accent-500/10">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="text-sm font-bold">🤖 {t('search.parsed')}:</span>
              <SimulatedLabel />
            </div>
            <div className="flex flex-wrap gap-2">
              {chips.length === 0 && <span className="text-xs text-zinc-500">—</span>}
              {chips.map((c) => (
                <span key={c} className="rounded-full bg-gradient-to-r from-accent-600 to-violet-600 px-3 py-1 text-xs font-bold text-white shadow-glow">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="relative mt-4 flex items-center justify-between">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="text-sm font-bold text-accent-600 transition hover:text-accent-500 dark:text-accent-300"
          >
            {showFilters ? '▴' : '▾'} {t('search.filters')}
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="chip !bg-amber-500/15 !text-amber-700 dark:!text-amber-300">
              💰 {credits} {t('search.credits')}
            </span>
            <button onClick={speakSummary} title="Read top matches aloud" className="btn-ghost btn-sm !px-2.5">
              🔊
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="relative mt-4 grid gap-4 border-t border-zinc-200/80 pt-5 dark:border-white/10 sm:grid-cols-3">
            <div>
              <label className="field-label" htmlFor="f-stack">{t('search.f.stack')}</label>
              <select id="f-stack" className={inputCls} value={filters.stack} onChange={(e) => { setF('stack', e.target.value); }}>
                <option value="">{t('search.any')}</option>
                {STACKS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="f-city">{t('search.f.city')}</label>
              <select id="f-city" className={inputCls} value={filters.city} onChange={(e) => setF('city', e.target.value)}>
                <option value="">{t('search.any')}</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="f-years">{t('search.f.years')}</label>
              <input id="f-years" type="number" min="0" max="20" className={inputCls} value={filters.minYears} onChange={(e) => setF('minYears', e.target.value)} placeholder="2" />
            </div>
            <div>
              <label className="field-label" htmlFor="f-budget">{t('search.f.budget')}</label>
              <input id="f-budget" type="number" min="0" step="10000" className={inputCls} value={filters.maxBudget} onChange={(e) => setF('maxBudget', e.target.value)} placeholder="150000" />
            </div>
            <div>
              <label className="field-label" htmlFor="f-avail">{t('search.f.avail')}</label>
              <select id="f-avail" className={inputCls} value={filters.avail} onChange={(e) => setF('avail', e.target.value)}>
                <option value="">{t('search.any')}</option>
                <option value="available-now">{t('build.avail.now')}</option>
                <option value="in-1-month">{t('build.avail.month')}</option>
                <option value="freelance-only">{t('build.avail.free')}</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <label className="btn-ghost w-full cursor-pointer !justify-start">
                <input type="checkbox" checked={filters.verifiedOnly} onChange={(e) => setF('verifiedOnly', e.target.checked)} className="h-4 w-4 accent-violet-600" />
                {t('search.f.verified')}
              </label>
            </div>
            <div className="flex items-end gap-2 sm:col-span-3">
              <button onClick={() => applyFilters(filters)} className="btn-primary btn-sm !px-6 !py-2.5 !text-sm">
                {t('search.filters')} ✓
              </button>
              <button
                onClick={() => { setFilters(EMPTY_F); runSearch(query, EMPTY_F); }}
                className="btn-ghost btn-sm !px-5 !py-2.5 !text-sm"
              >
                {t('search.f.clear')}
              </button>
            </div>
          </div>
        )}
      </Card>

      {noCredits && (
        <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3.5 text-sm font-medium text-red-700 shadow-sm dark:text-red-300">
          ⚠️ {t('search.nocredits')}
          <button onClick={() => setNoCredits(false)} className="ml-3 font-bold underline">{t('common.close')}</button>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          {results.length} {t('search.results')}
          {compareSel.length > 0 && (
            <button
              onClick={() => router.push('/shortlist')}
              className="btn-primary btn-sm ml-3"
            >
              {t('search.compare')} ({compareSel.length}/3) →
            </button>
          )}
        </p>
      </div>

      {results.length === 0 ? (
        <Card className="text-center text-zinc-500">{t('search.empty')}</Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {results.map((r) => (
            <DevCard
              key={r.dev.id}
              r={r}
              shortlisted={shortlist.includes(r.dev.id)}
              onToggleShortlist={() => toggleShortlist(r.dev.id)}
              compareChecked={compareSel.includes(r.dev.id)}
              onToggleCompare={() => toggleCompare(r.dev.id)}
              unlocked={unlocked.includes(r.dev.id)}
              credits={credits}
              onUnlock={() => unlock(r.dev.id)}
              onView={() => viewDev(r.dev.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
