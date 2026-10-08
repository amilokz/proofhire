'use client';

import Link from 'next/link';
import { useApp } from './AppProvider';
import { VerifiedBadge } from './ui';
import MockWhatsApp from './MockWhatsApp';
import { availabilityLabel, DevProfile, fmtPKR, isVerified } from '../lib/dev';
import { RankedDev } from '../lib/search';

interface Props {
  r: RankedDev;
  shortlisted: boolean;
  onToggleShortlist: () => void;
  compareChecked: boolean;
  onToggleCompare: () => void;
  unlocked: boolean;
  credits: number;
  onUnlock: () => void;
  onView: () => void;
}

export default function DevCard({
  r, shortlisted, onToggleShortlist, compareChecked, onToggleCompare,
  unlocked, credits, onUnlock, onView,
}: Props) {
  const { t, lang } = useApp();
  const { dev, score, reasons } = r;
  const ur = lang === 'ur';

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-card dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-lg font-extrabold">{dev.name}</h3>
            {isVerified(dev) && <VerifiedBadge size="sm" />}
          </div>
          <p className="text-sm text-accent-600 dark:text-accent-300">{dev.title}</p>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            📍 {dev.city} · {dev.yearsExp} {ur ? 'saal' : 'yrs'} · {fmtPKR(dev.expectedSalary)}/mo · {availabilityLabel(dev.availability, ur)}
          </p>
        </div>
        <div className="shrink-0 text-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-extrabold text-white ${
              score >= 75 ? 'bg-gradient-to-br from-green-500 to-emerald-600'
              : score >= 50 ? 'bg-gradient-to-br from-accent-500 to-violet-600'
              : 'bg-zinc-400'
            }`}
            aria-label={`Match ${score}%`}
          >
            {score}%
          </div>
          <p className="mt-1 text-[10px] uppercase tracking-wide text-zinc-400">match</p>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {dev.skills.slice(0, 5).map((s) => (
          <span key={s} className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
            {s}
          </span>
        ))}
      </div>

      {reasons.length > 0 && (
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          ✓ {reasons.slice(0, 3).join(' · ')}
        </p>
      )}

      {dev.testScore != null && (
        <p className="mt-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          🧪 {dev.testStack}: {dev.testScore}/100
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={onToggleShortlist}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
            shortlisted
              ? 'bg-accent-600 text-white'
              : 'border border-accent-500/40 text-accent-700 dark:text-accent-300'
          }`}
        >
          {shortlisted ? t('search.shortlisted') : `☆ ${t('search.shortlist')}`}
        </button>
        <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-bold dark:border-white/15">
          <input type="checkbox" checked={compareChecked} onChange={onToggleCompare} className="accent-violet-600" />
          {t('search.compare')}
        </label>
        <button onClick={onView} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-bold dark:border-white/15">
          {t('common.view')} →
        </button>
        {!unlocked ? (
          <button
            onClick={onUnlock}
            disabled={credits <= 0}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-green-700 disabled:opacity-40"
            title={`${credits} ${t('search.credits')}`}
          >
            🔓 {t('search.unlock')} (1💰)
          </button>
        ) : (
          <span className="rounded-lg bg-green-500/15 px-3 py-1.5 text-xs font-bold text-green-700 dark:text-green-300">
            ✓ {t('search.unlocked')}
          </span>
        )}
      </div>

      {unlocked && (
        <div className="mt-3 space-y-2">
          <div className="rounded-xl bg-zinc-50 p-3 text-sm dark:bg-white/5">
            ✉️ {dev.email} · 📞 {dev.phone}
          </div>
          <MockWhatsApp to={dev.name} body={t('wa.body')} />
        </div>
      )}
    </article>
  );
}
