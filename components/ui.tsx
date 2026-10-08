'use client';

import { useApp } from './AppProvider';

export function VerifiedBadge({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { t } = useApp();
  const cls = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-600 to-violet-500 font-bold text-white shadow-card ${cls}`}
      title={t('profile.verified')}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l2.4 2.4 3.3-.5.9 3.2 3 1.5-1.5 3 1.5 3-3 1.5-.9 3.2-3.3-.5L12 22l-2.4-2.4-3.3.5-.9-3.2-3-1.5 1.5-3-1.5-3 3-1.5.9-3.2 3.3.5L12 2z" fill="currentColor" opacity=".35" />
        <path d="M9 12.5l2.2 2.2L15.5 10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {t('profile.verified')}
    </span>
  );
}

export function SimulatedLabel() {
  const { t } = useApp();
  return (
    <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
      {t('common.ai.simulated')}
    </span>
  );
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      {children}
    </div>
  );
}

export function PageHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-zinc-500 dark:text-zinc-400">{sub}</p>
    </div>
  );
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-2.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent-600 to-violet-400 transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
