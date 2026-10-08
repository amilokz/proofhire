'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../components/AppProvider';
import { Card, PageHead, ProgressBar, VerifiedBadge } from '../../components/ui';
import { getCurrentDev, setViewedDev } from '../../lib/current';
import { availabilityLabel, DevProfile, fmtPKR, isVerified } from '../../lib/dev';
import { saveMyProfile } from '../../lib/myprofile';

export default function ProfilePage() {
  const { t, lang } = useApp();
  const [dev, setDev] = useState<DevProfile | null>(null);
  const [mine, setMine] = useState(true);

  useEffect(() => {
    const cur = getCurrentDev();
    setDev(cur.dev);
    setMine(cur.mine);
  }, []);

  const toggleId = () => {
    if (!dev || !mine) return;
    const next = { ...dev, idVerified: !dev.idVerified };
    setDev(next);
    saveMyProfile(next);
  };

  if (!dev) {
    return (
      <div>
        <PageHead title={t('profile.title')} sub="" />
        <Card className="text-center">
          <Link href="/build" className="inline-block rounded-xl bg-accent-600 px-6 py-2.5 font-bold text-white">
            {t('landing.cta.build')}
          </Link>
        </Card>
      </div>
    );
  }

  const ur = lang === 'ur';
  const verified = isVerified(dev);
  const checks = [
    { ok: dev.idVerified, label: t('profile.verify.1'), href: null as string | null },
    { ok: (dev.testScore ?? 0) >= 70, label: `${t('profile.verify.2')} (${dev.testScore ?? '—'}/100)`, href: '/test' },
    { ok: dev.projects.some((p) => p.live), label: t('profile.verify.3'), href: '/projects' },
  ];

  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <Link href="/search" className="text-sm text-accent-600 hover:underline dark:text-accent-300">
          {t('profile.view.search')}
        </Link>
        {!mine && (
          <button
            onClick={() => {
              setViewedDev(null);
              const cur = getCurrentDev();
              setDev(cur.dev);
              setMine(cur.mine);
            }}
            className="rounded-lg border border-accent-500/40 px-3 py-1 text-xs font-bold text-accent-700 dark:text-accent-300"
          >
            {lang === 'ur' ? 'Meri profile dekhein' : 'View my profile'}
          </button>
        )}
      </div>
      <PageHead title={t('profile.title')} sub="" />

      <Card className="mb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold">{dev.name}</h2>
            <p className="mt-1 text-accent-600 dark:text-accent-300">{dev.title}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              📍 {dev.city} · 🕐 {dev.yearsExp} {ur ? 'saal' : 'yrs'} · 💰 {fmtPKR(dev.expectedSalary)}/mo
            </p>
          </div>
          {verified && <VerifiedBadge />}
        </div>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">{dev.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {dev.skills.map((s) => (
            <span key={s} className="rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-700 dark:text-accent-300">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-white/5">
            <p className="text-lg font-extrabold">{availabilityLabel(dev.availability, ur)}</p>
            <p className="text-[11px] text-zinc-500">{t('build.avail')}</p>
          </div>
          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-white/5">
            <p className="text-lg font-extrabold">{dev.testScore != null ? `${dev.testScore}/100` : '—'}</p>
            <p className="text-[11px] text-zinc-500">{t('profile.testscore')}</p>
          </div>
          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-white/5">
            <p className="text-lg font-extrabold">{dev.completion}%</p>
            <p className="text-[11px] text-zinc-500">{t('build.completion')}</p>
          </div>
        </div>
        <div className="mt-3"><ProgressBar value={dev.completion} /></div>
      </Card>

      <Card className="mb-4">
        <h3 className="font-bold">🎖️ {t('profile.verify.how')}</h3>
        <ul className="mt-3 space-y-2">
          {checks.map((c, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${c.ok ? 'bg-green-500 text-white' : 'bg-zinc-200 text-zinc-500 dark:bg-white/10'}`}>
                {c.ok ? '✓' : '○'}
              </span>
              <span className={c.ok ? '' : 'text-zinc-500'}>{c.label}</span>
              {c.href && !c.ok && (
                <Link href={c.href} className="ml-auto text-xs font-bold text-accent-600 hover:underline dark:text-accent-300">
                  →
                </Link>
              )}
            </li>
          ))}
        </ul>
        {mine && (
          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-accent-400 p-3 text-sm">
            <input type="checkbox" checked={dev.idVerified} onChange={toggleId} className="h-5 w-5 accent-violet-600" />
            <span>
              <strong>{t('profile.idcheck')}</strong>
              <span className="block text-xs text-zinc-500">{t('profile.idcheck.done').split('(')[0]} — demo only</span>
            </span>
          </label>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="mb-3 font-bold">🌐 {t('projects.title')}</h3>
          {dev.projects.length === 0 ? (
            <p className="text-sm text-zinc-500">{t('projects.empty')}</p>
          ) : (
            <ul className="space-y-2">
              {dev.projects.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className={`h-2.5 w-2.5 rounded-full ${p.live ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="truncate font-medium">{p.name}</span>
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold ${p.live ? 'bg-green-500/15 text-green-700 dark:text-green-300' : 'bg-red-500/15 text-red-700 dark:text-red-300'}`}>
                    {p.live ? t('projects.live') : t('projects.down')}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/github" className="mt-4 inline-block text-sm font-bold text-accent-600 hover:underline dark:text-accent-300">
            {t('github.title')} →
          </Link>
        </Card>
        <Card>
          <h3 className="mb-3 font-bold">📇 {t('profile.contact')}</h3>
          {mine ? (
            <ul className="space-y-1.5 text-sm">
              <li>✉️ {dev.email}</li>
              <li>📞 {dev.phone}</li>
              <li>💻 <span className="break-all text-accent-600 dark:text-accent-300">{dev.links.github}</span></li>
              <li>🌐 <span className="break-all text-accent-600 dark:text-accent-300">{dev.links.portfolio}</span></li>
            </ul>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              🔒 {t('search.unlock')} — <Link href="/search" className="font-bold text-accent-600 hover:underline dark:text-accent-300">{t('nav.search')}</Link>
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
