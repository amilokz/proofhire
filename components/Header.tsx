'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './AppProvider';

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="2" y="2" width="28" height="28" rx="8" fill="#7c3aed" />
        <path
          d="M10 16.5l5 5 8-11"
          stroke="#fff"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-lg font-extrabold tracking-tight">
        Proof<span className="text-accent-500">Hire</span>
      </span>
    </span>
  );
}

export default function Header() {
  const { t, lang, setLang, theme, toggleTheme } = useApp();
  const pathname = usePathname();

  const links = [
    { href: '/build', label: t('nav.build') },
    { href: '/search', label: t('nav.search') },
    { href: '/test', label: t('nav.test') },
    { href: '/institute', label: t('nav.institute') },
    { href: '/pricing', label: t('nav.pricing') },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-accent-600 text-white text-xs sm:text-sm">
        <div className="mx-auto max-w-6xl px-4 py-1.5">
          <a
            href="https://akclnt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {t('more.demos')}
          </a>
        </div>
      </div>
      <div className="border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-[#0b0713]/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
          <Link href="/" aria-label="ProofHire home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === l.href
                    ? 'bg-accent-500/15 text-accent-600 dark:text-accent-300'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              title={t('lang.toggle')}
              aria-label={t('lang.toggle')}
              className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-bold text-zinc-600 hover:border-accent-400 dark:border-white/15 dark:text-zinc-300"
            >
              {lang === 'en' ? 'UR' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              title={t('theme.toggle')}
              aria-label={t('theme.toggle')}
              className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-sm text-zinc-600 hover:border-accent-400 dark:border-white/15 dark:text-zinc-300"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <Link
              href="/admin"
              className="hidden rounded-lg bg-accent-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-accent-700 sm:inline-block"
            >
              {t('nav.login')}
            </Link>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden nice-scroll" aria-label="Main mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${
                pathname === l.href
                  ? 'bg-accent-500/15 text-accent-600 dark:text-accent-300'
                  : 'text-zinc-600 dark:text-zinc-300'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
