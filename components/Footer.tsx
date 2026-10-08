'use client';

import { useApp } from './AppProvider';

// Placeholder number per demo spec — replace with the real business number.
const WA_LINK = 'https://wa.me/920000000000';

export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="mt-20">
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"
      />
      <div className="hero-mesh bg-gradient-to-b from-accent-500/[0.05] to-transparent dark:from-accent-500/[0.08]">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-14 text-center">
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-10 w-10 items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500 via-accent-600 to-violet-700 shadow-glow"
              />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="relative">
                <path
                  d="M5 12.5l4.5 4.5L19 7"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Proof<span className="gradient-text">Hire</span>
            </span>
          </span>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {t('footer.demo')}
          </p>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary sheen mt-7 px-8 py-4 text-base"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.2-3.6-.8-3-1.2-4.9-4.2-5.1-4.4-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.4 1.5z" />
            </svg>
            {t('footer.cta')}
          </a>

          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            Fictional sample data · Nothing leaves your browser
          </p>
        </div>
      </div>
    </footer>
  );
}
