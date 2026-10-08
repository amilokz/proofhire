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
          <Link href="/build" className="mt-4 inline-block rounded-xl bg-accent-600 px-6 py-2.5 font-bold text-white">
            {t('landing.cta.build')}
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHead title={t('github.title')} sub={t('github.sub')} />
      <div className="mb-4 flex items-center gap-3">
        <SimulatedLabel />
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {mine ? dev.name : `${dev.name} · ${dev.city}`} — {totalContributions(dev.activitySeed)} contributions (sample)
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-bold">📦 {t('github.repos')}</h2>
          <ul className="space-y-3">
            {dev.repos.map((r) => (
              <li key={r.name} className="rounded-xl border border-zinc-200 p-4 dark:border-white/10">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-accent-600 dark:text-accent-300">📁 {r.name}</p>
                  <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                    ⭐ {r.stars} {t('github.stars')}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{r.desc}</p>
                <p className="mt-2 text-xs font-semibold text-zinc-500">
                  <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-accent-500" />
                  {r.language}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card>
            <h2 className="mb-4 text-lg font-bold">📊 {t('github.langs')}</h2>
            <LanguageChart languages={dev.languages} />
          </Card>
          <Card>
            <h2 className="mb-4 text-lg font-bold">🟩 {t('github.activity')}</h2>
            <ActivityGrid seed={dev.activitySeed} />
          </Card>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/projects" className="rounded-xl bg-accent-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-700">
          {t('build.next.projects')}
        </Link>
        <Link href="/profile" className="rounded-xl border border-accent-500/40 px-5 py-2.5 text-sm font-bold text-accent-700 dark:text-accent-300">
          {t('profile.title')} →
        </Link>
      </div>
    </div>
  );
}
