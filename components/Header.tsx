'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './AppProvider';

function Logo() {
  return (
    <span className="group flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-500 via-accent-600 to-violet-700 shadow-glow transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
        />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="relative">
          <path
            d="M5 12.5l4.5 4.5L19 7"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
        Proof<span className="gradient-text">Hire</span>
      </span>
    </span>
  );
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
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

  const navCls = (active: boolean) =>
    `rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
      active
        ? 'bg-accent-500/15 text-accent-700 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.3)] dark:text-accent-200'
        : 'text-zinc-600 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-zinc-200/70 bg-white/75 shadow-[0_8px_30px_-18px_rgba(124,58,237,0.4)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0713]/75">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
          <Link href="/" aria-label="ProofHire home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={navCls(pathname === l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              title={t('lang.toggle')}
              aria-label={t('lang.toggle')}
              className="flex h-9 items-center rounded-xl border border-zinc-200 bg-white px-3 text-xs font-extrabold tracking-widest text-zinc-600 shadow-sm transition hover:border-accent-400 hover:text-accent-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-accent-400 dark:hover:text-accent-300"
            >
              {lang === 'en' ? 'UR' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              title={t('theme.toggle')}
              aria-label={t('theme.toggle')}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all duration-300 hover:rotate-12 hover:border-accent-400 hover:text-accent-600 dark:border-white/15 dark:bg-white/5 dark:text-amber-300 dark:hover:border-accent-400"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <Link href="/admin" className="btn-primary btn-sm hidden sm:inline-flex">
              {t('nav.login')}
            </Link>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-2.5 md:hidden nice-scroll" aria-label="Main mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                pathname === l.href
                  ? 'bg-accent-500/15 text-accent-700 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.3)] dark:text-accent-200'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div
          aria-hidden="true"
          className="h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"
        />
      </div>
    </header>
  );
}
