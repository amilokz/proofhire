'use client';

import Link from 'next/link';
import { useApp } from '../components/AppProvider';
import { Card, VerifiedBadge } from '../components/ui';
import { DEVELOPERS } from '../data/developers';
import { STACKS } from '../data/questions';

/* ---------- Inline SVG icons (decorative, aria-hidden) ---------- */
function IconBadge() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );
}
function IconTimer() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2.5M9 2h6" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
function IconCompare() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M8 21H4a1 1 0 0 1-1-1v-4M16 21h4a1 1 0 0 0 1-1v-4" />
      <path d="M9 9l-2 2 2 2M15 9l2 2-2 2" />
    </svg>
  );
}
function IconCode() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
    </svg>
  );
}
function IconInstitute() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-4h6v4M9 12h.01M15 12h.01" />
    </svg>
  );
}

/* ---------- Language bars for the hero profile card ---------- */
const LANG_BARS = [
  { lang: 'PHP', pct: 45 },
  { lang: 'JavaScript', pct: 25 },
  { lang: 'SQL', pct: 20 },
  { lang: 'CSS', pct: 10 },
];

export default function Landing() {
  const { t } = useApp();

  const features = [
    { icon: <IconBadge />, t: t('landing.feat6.1t'), d: t('landing.feat6.1d') },
    { icon: <IconTimer />, t: t('landing.feat6.2t'), d: t('landing.feat6.2d') },
    { icon: <IconSearch />, t: t('landing.feat6.3t'), d: t('landing.feat6.3d') },
    { icon: <IconCompare />, t: t('landing.feat6.4t'), d: t('landing.feat6.4d') },
    { icon: <IconCode />, t: t('landing.feat6.5t'), d: t('landing.feat6.5d') },
    { icon: <IconInstitute />, t: t('landing.feat6.6t'), d: t('landing.feat6.6d') },
  ];

  const steps = [
    { n: '1', title: t('landing.how2.1t'), desc: t('landing.how2.1d') },
    { n: '2', title: t('landing.how2.2t'), desc: t('landing.how2.2d') },
    { n: '3', title: t('landing.how2.3t'), desc: t('landing.how2.3d') },
  ];

  const quotes = [
    { q: t('landing.testi.1q'), a: t('landing.testi.1a'), initials: 'SK' },
    { q: t('landing.testi.2q'), a: t('landing.testi.2a'), initials: 'BA' },
    { q: t('landing.testi.3q'), a: t('landing.testi.3a'), initials: 'FK' },
  ];

  const faqs = [
    { q: t('landing.faq.1q'), a: t('landing.faq.1a') },
    { q: t('landing.faq.2q'), a: t('landing.faq.2a') },
    { q: t('landing.faq.3q'), a: t('landing.faq.3a') },
    { q: t('landing.faq.4q'), a: t('landing.faq.4a') },
    { q: t('landing.faq.5q'), a: t('landing.faq.5a') },
  ];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="hero-mesh hero-grid relative overflow-hidden rounded-[2rem] border border-accent-500/20 bg-white/60 px-6 pb-14 pt-16 text-center shadow-card-lg backdrop-blur dark:border-accent-400/20 dark:bg-white/[0.02] sm:px-12 sm:pt-20">
        <span aria-hidden="true" className="orb left-[8%] top-[10%] h-56 w-56 bg-accent-500/25 dark:bg-accent-500/30" />
        <span aria-hidden="true" className="orb bottom-[5%] right-[6%] h-64 w-64 bg-violet-500/20 dark:bg-violet-500/25" style={{ animationDelay: '-7s' }} />

        <p className="anim-fade-up relative inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-700 shadow-sm dark:text-accent-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-500" aria-hidden="true" />
          {t('landing.hero.badge')}
        </p>
        <h1 className="anim-fade-up delay-1 relative mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Stop sending CVs.{' '}
          <span className="gradient-text">Start showing proof.</span>
        </h1>
        <p className="anim-fade-up delay-2 relative mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
          {t('landing.hero.problem')}
        </p>
        <div className="anim-fade-up delay-3 relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/search" className="btn-primary w-full px-9 py-4 text-base sm:w-auto">
            {t('landing.hero.cta.search')} →
          </Link>
          <Link href="/build" className="btn-secondary w-full px-9 py-4 text-base sm:w-auto">
            {t('landing.hero.cta.build')}
          </Link>
        </div>

        {/* ---- CSS-only hero visual: sample developer profile card ---- */}
        <div className="anim-fade-up delay-4 relative mx-auto mt-14 max-w-xl" aria-hidden="true">
          <div className="card-premium relative z-10 mx-auto max-w-md p-6 text-left shadow-glow-lg">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 via-violet-500 to-fuchsia-600 p-[3px] shadow-glow">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-white text-xl font-extrabold text-accent-700 dark:bg-[#151024] dark:text-accent-200">
                  AR
                </span>
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  {t('landing.hero.card.name')}
                </p>
                <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                  {t('landing.hero.card.title')}
                </p>
                <div className="mt-1.5">
                  <VerifiedBadge size="sm" />
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {['Laravel', 'PHP', 'MySQL', 'Redis'].map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                {t('landing.hero.card.langs')}
              </p>
              <div className="space-y-1.5">
                {LANG_BARS.map((b) => (
                  <div key={b.lang} className="flex items-center gap-2">
                    <span className="w-20 shrink-0 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                      {b.lang}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-500 to-violet-500"
                        style={{ width: `${b.pct}%` }}
                      />
                    </div>
                    <span className="w-9 shrink-0 text-right text-[11px] font-bold text-accent-700 dark:text-accent-300">
                      {b.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                  {t('landing.hero.card.test')}
                </p>
                <p className="text-sm font-extrabold text-accent-700 dark:text-accent-300">
                  87<span className="text-xs font-semibold text-zinc-400">/100</span>
                </p>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-white/10">
                <div
                  className="sheen h-full rounded-full bg-gradient-to-r from-accent-600 via-violet-500 to-fuchsia-500 shadow-glow"
                  style={{ width: '87%' }}
                />
              </div>
            </div>
          </div>

          {/* floating accent cards */}
          <div className="animate-floaty absolute -right-2 -top-8 z-20 hidden rounded-2xl border border-accent-500/25 bg-white/90 px-4 py-3 text-left shadow-glow backdrop-blur dark:bg-[#151024]/90 sm:block">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Match
            </p>
            <p className="text-sm font-extrabold text-zinc-900 dark:text-white">
              <span className="gradient-text text-lg">94%</span> —{' '}
              {t('landing.hero.card.match').split('—')[1]?.trim() ?? ''}
            </p>
            <div className="mt-1.5 h-1.5 w-36 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-white/10">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-accent-500 to-violet-500" />
            </div>
          </div>
          <div
            className="animate-floaty absolute -left-2 bottom-6 z-20 hidden items-center gap-2 rounded-2xl border border-accent-500/25 bg-white/90 px-4 py-3 shadow-glow backdrop-blur dark:bg-[#151024]/90 sm:flex"
            style={{ animationDelay: '-2.5s' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l2.5 2.5M9 2h6" />
            </svg>
            <p className="text-sm font-extrabold text-zinc-900 dark:text-white">
              {t('landing.hero.card.test')}: <span className="gradient-text">87/100</span>
            </p>
          </div>
        </div>

        {/* ---- stats row ---- */}
        <dl className="anim-fade-up delay-5 relative mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-3">
          {[
            { v: String(DEVELOPERS.length), l: t('landing.hero.stats.profiles') },
            { v: String(STACKS.length), l: t('landing.hero.stats.tests') },
            { v: '0', l: t('landing.hero.stats.cvs') },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-accent-500/15 bg-white/50 px-3 py-4 backdrop-blur dark:bg-white/[0.03]">
              <dt className="order-2 mt-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {s.l}
              </dt>
              <dd className="gradient-text text-3xl font-extrabold tracking-tight sm:text-4xl">
                {s.v}
              </dd>
            </div>
          ))}
        </dl>
        <p className="relative mt-6 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          {t('common.ai.simulated')}
        </p>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section aria-label="Trust highlights" className="anim-fade-up mt-10">
        <ul className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          {[t('landing.trust.1'), t('landing.trust.2'), t('landing.trust.3'), t('landing.trust.4')].map(
            (label) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-accent-500/25 bg-accent-500/[0.06] px-4 py-2 text-sm font-bold text-accent-700 dark:border-accent-400/25 dark:bg-accent-500/10 dark:text-accent-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
                {label}
              </li>
            )
          )}
        </ul>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="anim-fade-up mt-20 scroll-mt-28">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
          {t('nav.features')}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card key={f.t} lift className={`anim-fade-up delay-${(i % 3) + 1} flex gap-4`}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-violet-700 text-white shadow-glow">
                {f.icon}
              </span>
              <div>
                <h3 className="font-bold tracking-tight text-zinc-900 dark:text-white">{f.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {f.d}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how" className="anim-fade-up mt-20 scroll-mt-28">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
          {t('landing.how2.title')}
        </h2>
        <div className="relative mt-10 grid gap-5 md:grid-cols-3">
          <span
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-6 hidden h-0.5 bg-gradient-to-r from-accent-500/10 via-accent-500/40 to-accent-500/10 md:block"
          />
          {steps.map((s, i) => (
            <Card key={s.n} lift className={`anim-fade-up delay-${i + 1} relative`}>
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-violet-700 text-lg font-extrabold text-white shadow-glow ring-4 ring-white dark:ring-[#0b0713]">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {s.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ============ LIVE DEMO BAND ============ */}
      <section
        id="live-demo"
        className="hero-mesh anim-fade-up relative mt-20 scroll-mt-28 overflow-hidden rounded-[2rem] border border-accent-400/25 bg-gradient-to-br from-accent-700 via-accent-600 to-violet-700 px-6 py-14 text-center text-white shadow-glow-lg sm:py-16"
      >
        <span aria-hidden="true" className="orb left-[10%] top-[0%] h-52 w-52 bg-white/15" />
        <span aria-hidden="true" className="orb bottom-[0%] right-[8%] h-52 w-52 bg-fuchsia-400/25" style={{ animationDelay: '-5s' }} />
        <h2 className="relative text-2xl font-extrabold tracking-tight sm:text-4xl">
          {t('landing.band.title')}
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-white/85">
          {t('landing.band.sub')}
        </p>
        <Link
          href="/search"
          className="relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-9 py-4 text-base font-bold text-accent-700 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:brightness-105 active:translate-y-0"
        >
          {t('nav.trydemo')} →
        </Link>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="anim-fade-up mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            {t('landing.testi.title')}
          </h2>
          <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-dashed border-amber-500/60 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
            {t('landing.testi.sample')}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Card key={q.a} lift className={`anim-fade-up delay-${i + 1} flex flex-col`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-accent-400">
                <path d="M10 8H6a4 4 0 0 0-4 4v6h8v-8a2 2 0 0 0 0-2zm12 0h-4a4 4 0 0 0-4 4v6h8v-8a2 2 0 0 0 0-2z" opacity=".55" />
              </svg>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                “{q.q}”
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-violet-700 text-xs font-extrabold text-white">
                  {q.initials}
                </span>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">{q.a}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="anim-fade-up mx-auto mt-20 max-w-3xl scroll-mt-28">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
          {t('landing.faq.title')}
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="card-premium group [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-bold text-zinc-900 transition-colors hover:text-accent-700 dark:text-white dark:hover:text-accent-300">
                {f.q}
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-accent-600 transition-transform duration-300 group-open:rotate-180 dark:text-accent-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="hero-mesh anim-fade-up relative mt-20 overflow-hidden rounded-[2rem] border border-accent-400/25 bg-gradient-to-br from-accent-700 via-accent-600 to-violet-700 px-6 py-14 text-center text-white shadow-glow-lg sm:py-16">
        <span aria-hidden="true" className="orb left-[10%] top-[0%] h-52 w-52 bg-white/15" />
        <span aria-hidden="true" className="orb bottom-[0%] right-[8%] h-52 w-52 bg-fuchsia-400/25" style={{ animationDelay: '-5s' }} />
        <div className="relative mt-5 flex justify-center">
          <VerifiedBadge />
        </div>
        <h2 className="relative mt-6 text-2xl font-extrabold tracking-tight sm:text-4xl">
          {t('landing.final.title')}
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-white/85">
          {t('landing.final.sub')}
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-9 py-4 text-base font-bold text-accent-700 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:brightness-105 active:translate-y-0"
          >
            {t('landing.hero.cta.search')} →
          </Link>
          <Link
            href="/build"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/40 px-9 py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 active:translate-y-0"
          >
            {t('landing.hero.cta.build')}
          </Link>
        </div>
      </section>
    </div>
  );
}
