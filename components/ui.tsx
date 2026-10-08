'use client';

import { useApp } from './AppProvider';

export function VerifiedBadge({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { t } = useApp();
  const cls = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3.5 py-1 text-xs';
  return (
    <span
      className={`sheen inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-600 via-violet-500 to-accent-600 font-bold text-white shadow-glow ring-1 ring-white/25 ${cls}`}
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
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-amber-500/60 bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-700 dark:text-amber-300">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" aria-hidden="true" />
      {t('common.ai.simulated')}
    </span>
  );
}

export function Card({
  children,
  className = '',
  lift = false,
}: {
  children: React.ReactNode;
  className?: string;
  lift?: boolean;
}) {
  return (
    <div className={`card-premium p-6 ${lift ? 'card-lift' : ''} ${className}`}>{children}</div>
  );
}

export function PageHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="anim-fade-up mb-8 sm:mb-10">
      <span
        aria-hidden="true"
        className="mb-4 block h-1 w-14 rounded-full bg-gradient-to-r from-accent-500 via-violet-500 to-accent-300 shadow-glow"
      />
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
        {title}
      </h1>
      {sub ? (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div
      className={`h-2.5 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-white/10 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent-600 via-violet-500 to-accent-400 shadow-glow transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
