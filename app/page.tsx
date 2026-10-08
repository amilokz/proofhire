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
      {/* HERO — one line on the problem, then try it immediately */}
      <section className="relative overflow-hidden rounded-3xl border border-accent-500/20 bg-gradient-to-br from-accent-600/15 via-transparent to-violet-500/10 px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-accent-500/20 blur-3xl"
        />
        <p className="relative mb-4 inline-block rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-300">
          {t('landing.kicker')}
        </p>
        <h1 className="relative mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          {t('landing.headline')}
        </h1>
        <p className="relative mx-auto mt-5 max-w-2xl text-base text-zinc-500 dark:text-zinc-400 sm:text-lg">
          {t('landing.problem')}
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/search"
            className="animate-pulse-ring w-full rounded-2xl bg-accent-600 px-8 py-4 text-base font-bold text-white shadow-pop transition hover:bg-accent-700 sm:w-auto"
          >
            🔍 {t('landing.cta.search')}
          </Link>
          <Link
            href="/build"
            className="w-full rounded-2xl border-2 border-accent-500/40 px-8 py-4 text-base font-bold text-accent-700 transition hover:border-accent-500 hover:bg-accent-500/10 dark:text-accent-300 sm:w-auto"
          >
            {t('landing.cta.build')}
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">{t('landing.how.title')}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { n: '1', title: t('landing.how.1t'), desc: t('landing.how.1d'), icon: '🛠️' },
            { n: '2', title: t('landing.how.2t'), desc: t('landing.how.2d'), icon: '💬' },
            { n: '3', title: t('landing.how.3t'), desc: t('landing.how.3d'), icon: '✅' },
          ].map((s) => (
            <Card key={s.n} className="relative">
              <span className="absolute right-4 top-4 text-5xl font-extrabold text-accent-500/15">
                {s.n}
              </span>
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-16 grid gap-4 sm:grid-cols-2">
        {[
          { icon: '⏱️', title: t('landing.feat.1t'), desc: t('landing.feat.1d') },
          { icon: '🎖️', title: t('landing.feat.2t'), desc: t('landing.feat.2d') },
          { icon: '🌐', title: t('landing.feat.3t'), desc: t('landing.feat.3d') },
          { icon: '🏫', title: t('landing.feat.4t'), desc: t('landing.feat.4d') },
        ].map((f) => (
          <Card key={f.title} className="flex gap-4">
            <div className="text-3xl">{f.icon}</div>
            <div>
              <h3 className="font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{f.desc}</p>
            </div>
          </Card>
        ))}
      </section>

      {/* STATS */}
      <section className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { v: String(DEVELOPERS.length), l: t('landing.stats.devs') },
          { v: String(verifiedCount), l: t('profile.verified') },
          { v: String(STACKS.length), l: t('landing.stats.stacks') },
          { v: '15', l: t('landing.stats.mins') },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-2xl border border-accent-500/20 bg-accent-500/5 p-5 text-center"
          >
            <p className="text-3xl font-extrabold text-accent-600 dark:text-accent-300">{s.v}</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{s.l}</p>
          </div>
        ))}
      </section>

      {/* BOTTOM CTA */}
      <section className="mt-16 rounded-3xl bg-gradient-to-r from-accent-700 to-violet-600 px-6 py-12 text-center text-white shadow-pop">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{t('landing.cta2.title')}</h2>
        <p className="mx-auto mt-2 max-w-xl text-white/80">{t('landing.cta2.sub')}</p>
        <div className="mt-2 flex justify-center">
          <VerifiedBadge />
        </div>
        <Link
          href="/search"
          className="mt-6 inline-block rounded-2xl bg-white px-8 py-3.5 font-bold text-accent-700 shadow transition hover:bg-accent-50"
        >
          {t('landing.cta.search')} →
        </Link>
      </section>
    </div>
  );
}
