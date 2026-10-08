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
          <Link href="/build" className="btn-primary inline-flex">
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
      <div className="mb-3 flex items-center gap-3">
        <Link href="/search" className="text-sm font-semibold text-accent-600 transition hover:text-accent-500 dark:text-accent-300">
          ← {t('profile.view.search')}
        </Link>
        {!mine && (
          <button
            onClick={() => {
              setViewedDev(null);
              const cur = getCurrentDev();
              setDev(cur.dev);
              setMine(cur.mine);
            }}
            className="btn-secondary btn-sm"
          >
            {lang === 'ur' ? 'Meri profile dekhein' : 'View my profile'}
          </button>
        )}
      </div>
      <PageHead title={t('profile.title')} sub="" />

      <Card className="hero-mesh mb-5">
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{dev.name}</h2>
            <p className="gradient-text mt-1 font-bold">{dev.title}</p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              📍 {dev.city} · 🕐 {dev.yearsExp} {ur ? 'saal' : 'yrs'} · 💰 {fmtPKR(dev.expectedSalary)}/mo
            </p>
          </div>
          {verified && <VerifiedBadge />}
        </div>
        <p className="relative mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{dev.summary}</p>
        <div className="relative mt-4 flex flex-wrap gap-2">
          {dev.skills.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
        <div className="relative mt-5 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl border border-zinc-200/60 bg-zinc-50/70 p-3.5 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-lg font-extrabold">{availabilityLabel(dev.availability, ur)}</p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-500">{t('build.avail')}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200/60 bg-zinc-50/70 p-3.5 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="gradient-text text-lg font-extrabold">{dev.testScore != null ? `${dev.testScore}/100` : '—'}</p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-500">{t('profile.testscore')}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200/60 bg-zinc-50/70 p-3.5 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="gradient-text text-lg font-extrabold">{dev.completion}%</p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-500">{t('build.completion')}</p>
          </div>
        </div>
        <div className="relative mt-4"><ProgressBar value={dev.completion} /></div>
      </Card>

      <Card className="mb-5">
        <h3 className="font-bold tracking-tight">🎖️ {t('profile.verify.how')}</h3>
        <ul className="mt-4 space-y-2.5">
          {checks.map((c, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${c.ok ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-[0_6px_16px_-6px_rgba(16,185,129,0.7)]' : 'bg-zinc-200 text-zinc-500 dark:bg-white/10'}`}>
                {c.ok ? '✓' : '○'}
              </span>
              <span className={c.ok ? 'font-medium' : 'text-zinc-500'}>{c.label}</span>
              {c.href && !c.ok && (
                <Link href={c.href} className="btn-ghost btn-sm ml-auto">
                  →
                </Link>
              )}
            </li>
          ))}
        </ul>
        {mine && (
          <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-accent-400/60 bg-accent-500/5 p-4 text-sm transition hover:bg-accent-500/10">
            <input type="checkbox" checked={dev.idVerified} onChange={toggleId} className="h-5 w-5 shrink-0 accent-violet-600" />
            <span>
              <strong>{t('profile.idcheck')}</strong>
              <span className="block text-xs text-zinc-500">{t('profile.idcheck.done').split('(')[0]} — demo only</span>
            </span>
          </label>
        )}
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-bold tracking-tight">🌐 {t('projects.title')}</h3>
          {dev.projects.length === 0 ? (
            <p className="text-sm text-zinc-500">{t('projects.empty')}</p>
          ) : (
            <ul className="space-y-2.5">
              {dev.projects.map((p, i) => (
                <li key={i} className="flex items-center gap-2.5 rounded-xl border border-zinc-200/60 bg-zinc-50/60 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full shadow ${p.live ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50'}`} />
                  <span className="truncate font-medium">{p.name}</span>
                  <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 ${p.live ? 'bg-green-500/15 text-green-700 ring-green-500/30 dark:text-green-300' : 'bg-red-500/15 text-red-700 ring-red-500/30 dark:text-red-300'}`}>
                    {p.live ? t('projects.live') : t('projects.down')}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/github" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-accent-600 transition hover:gap-2 hover:text-accent-500 dark:text-accent-300">
            {t('github.title')} →
          </Link>
        </Card>
        <Card>
          <h3 className="mb-4 font-bold tracking-tight">📇 {t('profile.contact')}</h3>
          {mine ? (
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">✉️ <span className="font-medium">{dev.email}</span></li>
              <li className="flex items-center gap-2">📞 <span className="font-medium">{dev.phone}</span></li>
              <li className="flex items-center gap-2">💻 <span className="break-all font-medium text-accent-700 dark:text-accent-200">{dev.links.github}</span></li>
              <li className="flex items-center gap-2">🌐 <span className="break-all font-medium text-accent-700 dark:text-accent-200">{dev.links.portfolio}</span></li>
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
