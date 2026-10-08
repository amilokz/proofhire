'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../components/AppProvider';
import { Card, PageHead, SimulatedLabel } from '../../components/ui';
import ActivityGrid from '../../components/ActivityGrid';
import LanguageChart from '../../components/LanguageChart';
import { getCurrentDev } from '../../lib/current';
import { DevProfile, totalContributions } from '../../lib/dev';

export default function GithubPage() {
  const { t } = useApp();
  const [dev, setDev] = useState<DevProfile | null>(null);
  const [mine, setMine] = useState(true);

  useEffect(() => {
    const { dev, mine } = getCurrentDev();
    setDev(dev);
    setMine(mine);
  }, []);

  if (!dev) {
    return (
      <div>
        <PageHead title={t('github.title')} sub={t('github.sub')} />
        <Card className="text-center">
          <p className="text-zinc-500 dark:text-zinc-400">No profile yet.</p>
          <Link href="/build" className="btn-primary mt-5 inline-flex">
            {t('landing.cta.build')}
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHead title={t('github.title')} sub={t('github.sub')} />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <SimulatedLabel />
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {mine ? dev.name : `${dev.name} · ${dev.city}`} — {totalContributions(dev.activitySeed)} contributions (sample)
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="mb-5 text-lg font-bold tracking-tight">📦 {t('github.repos')}</h2>
          <ul className="space-y-3">
            {dev.repos.map((r) => (
              <li key={r.name} className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-4 transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-accent-700 dark:text-accent-200">📁 {r.name}</p>
                  <span className="chip shrink-0">
                    ⭐ {r.stars} {t('github.stars')}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{r.desc}</p>
                <p className="mt-2.5 text-xs font-semibold text-zinc-500">
                  <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-accent-500 shadow-glow" />
                  {r.language}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-5">
          <Card>
            <h2 className="mb-5 text-lg font-bold tracking-tight">📊 {t('github.langs')}</h2>
            <LanguageChart languages={dev.languages} />
          </Card>
          <Card>
            <h2 className="mb-5 text-lg font-bold tracking-tight">🟩 {t('github.activity')}</h2>
            <ActivityGrid seed={dev.activitySeed} />
          </Card>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/projects" className="btn-primary btn-sm !px-5 !py-2.5 !text-sm">
          {t('build.next.projects')}
        </Link>
        <Link href="/profile" className="btn-secondary btn-sm !px-5 !py-2.5 !text-sm">
          {t('profile.title')} →
        </Link>
      </div>
    </div>
  );
}
