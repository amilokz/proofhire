'use client';

import Link from 'next/link';
import { useApp } from '../components/AppProvider';
import { Card } from '../components/ui';
import { VerifiedBadge } from '../components/ui';
import { DEVELOPERS } from '../data/developers';
import { STACKS } from '../data/questions';
import { isVerified } from '../lib/dev';

export default function Landing() {
  const { t } = useApp();
  const verifiedCount = DEVELOPERS.filter(isVerified).length;

  return (
    <div>
      {/* HERO */}
      <section className="hero-mesh hero-grid relative rounded-[2rem] border border-accent-500/20 bg-white/60 px-6 py-16 text-center shadow-card-lg backdrop-blur dark:border-accent-400/20 dark:bg-white/[0.02] sm:px-12 sm:py-24">
        <span aria-hidden="true" className="orb left-[8%] top-[10%] h-56 w-56 bg-accent-500/25 dark:bg-accent-500/30" />
        <span aria-hidden="true" className="orb bottom-[5%] right-[6%] h-64 w-64 bg-violet-500/20 dark:bg-violet-500/25" style={{ animationDelay: '-7s' }} />

        <p className="anim-fade-up relative mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-700 shadow-sm dark:text-accent-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-500" aria-hidden="true" />
          {t('landing.kicker')}
        </p>
        <h1 className="anim-fade-up delay-1 gradient-text relative mx-auto max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
          {t('landing.headline')}
        </h1>
        <p className="anim-fade-up delay-2 relative mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
          {t('landing.problem')}
        </p>
        <div className="anim-fade-up delay-3 relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/search" className="btn-primary animate-pulse-ring w-full px-9 py-4 text-base sm:w-auto">
            🔍 {t('landing.cta.search')}
          </Link>
          <Link href="/build" className="btn-secondary w-full px-9 py-4 text-base sm:w-auto">
            {t('landing.cta.build')}
          </Link>
        </div>
        <p className="anim-fade-up delay-4 relative mt-6 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          {t('common.ai.simulated')}
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="anim-fade-up mt-20">
        <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
          {t('landing.how.title')}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { n: '1', title: t('landing.how.1t'), desc: t('landing.how.1d'), icon: '🛠️' },
            { n: '2', title: t('landing.how.2t'), desc: t('landing.how.2d'), icon: '💬' },
            { n: '3', title: t('landing.how.3t'), desc: t('landing.how.3d'), icon: '✅' },
          ].map((s, i) => (
            <Card key={s.n} lift className={`anim-fade-up delay-${i + 1} relative`}>
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/20 to-violet-500/20 text-2xl shadow-sm ring-1 ring-accent-500/20">
                  {s.icon}
                </span>
                <span className="gradient-text text-5xl font-extrabold opacity-80">{s.n}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="anim-fade-up mt-20 grid gap-5 sm:grid-cols-2">
        {[
          { icon: '⏱️', title: t('landing.feat.1t'), desc: t('landing.feat.1d') },
          { icon: '🎖️', title: t('landing.feat.2t'), desc: t('landing.feat.2d') },
          { icon: '🌐', title: t('landing.feat.3t'), desc: t('landing.feat.3d') },
          { icon: '🏫', title: t('landing.feat.4t'), desc: t('landing.feat.4d') },
        ].map((f) => (
          <Card key={f.title} lift className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-600 to-violet-600 text-2xl text-white shadow-glow">
              {f.icon}
            </span>
            <div>
              <h3 className="font-bold tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{f.desc}</p>
            </div>
          </Card>
        ))}
      </section>

      {/* STATS */}
      <section className="anim-fade-up mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { v: String(DEVELOPERS.length), l: t('landing.stats.devs') },
          { v: String(verifiedCount), l: t('profile.verified') },
          { v: String(STACKS.length), l: t('landing.stats.stacks') },
          { v: '15', l: t('landing.stats.mins') },
        ].map((s) => (
          <div
            key={s.l}
            className="card-premium p-6 text-center"
          >
            <p className="gradient-text text-4xl font-extrabold tracking-tight">{s.v}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{s.l}</p>
          </div>
        ))}
      </section>

      {/* BOTTOM CTA */}
      <section className="hero-mesh anim-fade-up relative mt-20 overflow-hidden rounded-[2rem] border border-accent-400/25 bg-gradient-to-br from-accent-700 via-accent-600 to-violet-700 px-6 py-14 text-center text-white shadow-glow-lg sm:py-16">
        <span aria-hidden="true" className="orb left-[10%] top-[0%] h-52 w-52 bg-white/15" />
        <span aria-hidden="true" className="orb bottom-[0%] right-[8%] h-52 w-52 bg-fuchsia-400/25" style={{ animationDelay: '-5s' }} />
        <h2 className="relative text-2xl font-extrabold tracking-tight sm:text-4xl">{t('landing.cta2.title')}</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-white/85">{t('landing.cta2.sub')}</p>
        <div className="relative mt-5 flex justify-center">
          <VerifiedBadge />
        </div>
        <Link
          href="/search"
          className="relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-9 py-4 text-base font-bold text-accent-700 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:brightness-105 active:translate-y-0"
        >
          {t('landing.cta.search')} →
        </Link>
      </section>
    </div>
  );
}
