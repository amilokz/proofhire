'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../components/AppProvider';
import { Card, PageHead, SimulatedLabel } from '../../components/ui';
import { getCurrentDev } from '../../lib/current';
import { DevProfile, Project } from '../../lib/dev';
import { saveMyProfile } from '../../lib/myprofile';

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Deterministic simulated uptime check — no network calls. */
function simulatedCheck(url: string): boolean {
  return hashStr(url.trim().toLowerCase()) % 10 < 7;
}

export default function ProjectsPage() {
  const { t } = useApp();
  const [dev, setDev] = useState<DevProfile | null>(null);
  const [mine, setMine] = useState(true);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const cur = getCurrentDev();
    setDev(cur.dev);
    setMine(cur.mine);
  }, []);

  const updateProjects = (projects: Project[]) => {
    if (!dev || !mine) return;
    const next = { ...dev, projects };
    setDev(next);
    saveMyProfile(next);
  };

  const add = () => {
    if (!name.trim() || !url.trim() || !dev) return;
    let fixed = url.trim();
    if (!/^https?:\/\//i.test(fixed)) fixed = 'https://' + fixed;
    updateProjects([...dev.projects, { name: name.trim(), url: fixed, live: simulatedCheck(fixed) }]);
    setName('');
    setUrl('');
  };

  const recheck = (i: number) => {
    if (!dev) return;
    const next = dev.projects.map((p, idx) =>
      idx === i ? { ...p, live: simulatedCheck(p.url) } : p
    );
    updateProjects(next);
  };

  const remove = (i: number) => {
    if (!dev) return;
    updateProjects(dev.projects.filter((_, idx) => idx !== i));
  };

  if (!dev) {
    return (
      <div>
        <PageHead title={t('projects.title')} sub={t('projects.sub')} />
        <Card className="text-center">
          <Link href="/build" className="btn-primary inline-flex">
            {t('landing.cta.build')}
          </Link>
        </Card>
      </div>
    );
  }

  const inputCls = 'field';

  return (
    <div>
      <PageHead title={t('projects.title')} sub={t('projects.sub')} />
      <div className="mb-4">
        <SimulatedLabel />
      </div>

      {mine && (
        <Card className="hero-mesh mb-6">
          <div className="relative grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              className={inputCls}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('projects.name')}
              aria-label={t('projects.name')}
            />
            <input
              className={inputCls}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('projects.url')}
              aria-label={t('projects.url')}
              inputMode="url"
            />
            <button
              onClick={add}
              disabled={!name.trim() || !url.trim()}
              className="btn-primary"
            >
              + {t('projects.add')}
            </button>
          </div>
          <p className="relative mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            {t('common.ai.simulated')}: status check runs on seed math, no network.
          </p>
        </Card>
      )}

      {dev.projects.length === 0 ? (
        <Card className="text-center text-zinc-500 dark:text-zinc-400">{t('projects.empty')}</Card>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {dev.projects.map((p, i) => (
            <li key={i}>
              <Card lift className="flex items-center gap-3 !p-4">
                <span className={`relative flex h-3 w-3 shrink-0`}>
                  {p.live && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  )}
                  <span
                    className={`relative inline-flex h-3 w-3 rounded-full shadow ${p.live ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50'}`}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{p.name}</p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{p.url}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${
                    p.live
                      ? 'bg-green-500/15 text-green-700 ring-green-500/30 dark:text-green-300'
                      : 'bg-red-500/15 text-red-700 ring-red-500/30 dark:text-red-300'
                  }`}
                >
                  {p.live ? `● ${t('projects.live')}` : `● ${t('projects.down')}`}
                </span>
                {mine && (
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      onClick={() => recheck(i)}
                      title="Re-check (simulated)"
                      className="btn-ghost btn-sm !px-2.5"
                    >
                      ↻
                    </button>
                    <button
                      onClick={() => remove(i)}
                      title={t('shortlist.remove')}
                      className="btn-ghost btn-sm !px-2.5 !text-red-600 hover:!border-red-400 dark:!text-red-400"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </Card>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-7">
        <Link href="/test" className="btn-primary btn-sm !px-5 !py-2.5 !text-sm">
          {t('build.next.test')}
        </Link>
      </div>
    </div>
  );
}
