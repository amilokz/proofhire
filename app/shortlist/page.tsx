'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../../components/AppProvider';
import { Card, PageHead, VerifiedBadge } from '../../components/ui';
import { DEVELOPERS } from '../../data/developers';
import { getJSON, setJSON } from '../../lib/storage';
import { setViewedDev } from '../../lib/current';
import { availabilityLabel, DevProfile, fmtPKR, isVerified } from '../../lib/dev';

export default function ShortlistPage() {
  const { t, lang } = useApp();
  const router = useRouter();
  const [tab, setTab] = useState<'short' | 'compare'>('short');
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [compareSel, setCompareSel] = useState<string[]>([]);

  useEffect(() => {
    setShortlist(getJSON<string[]>('proofhire-shortlist', []));
    setCompareSel(getJSON<string[]>('proofhire-compare', []));
  }, []);

  const ur = lang === 'ur';
  const shortDevs = DEVELOPERS.filter((d) => shortlist.includes(d.id));
  const compareDevs = DEVELOPERS.filter((d) => compareSel.includes(d.id));

  const removeShort = (id: string) => {
    const n = shortlist.filter((x) => x !== id);
    setShortlist(n);
    setJSON('proofhire-shortlist', n);
  };

  const removeCompare = (id: string) => {
    const n = compareSel.filter((x) => x !== id);
    setCompareSel(n);
    setJSON('proofhire-compare', n);
  };

  const viewDev = (id: string) => {
    setViewedDev(id);
    router.push('/profile');
  };

  const rows: { label: string; get: (d: DevProfile) => React.ReactNode }[] = [
    { label: '✓', get: (d) => (isVerified(d) ? <VerifiedBadge size="sm" /> : <span className="text-zinc-400">—</span>) },
    { label: t('build.title2'), get: (d) => d.title },
    { label: t('build.city'), get: (d) => d.city },
    { label: t('build.stack'), get: (d) => d.stack },
    { label: t('build.years'), get: (d) => `${d.yearsExp} ${ur ? 'saal' : 'yrs'}` },
    { label: t('build.salary'), get: (d) => `${fmtPKR(d.expectedSalary)}/mo` },
    { label: t('build.avail'), get: (d) => availabilityLabel(d.availability, ur) },
    { label: t('profile.testscore'), get: (d) => (d.testScore != null ? `${d.testScore}/100 (${d.testStack})` : '—') },
    {
      label: `${t('projects.live')} ${t('projects.title').split(' ')[0]}`,
      get: (d) => `${d.projects.filter((p) => p.live).length}/${d.projects.length}`,
    },
    { label: t('build.skills'), get: (d) => d.skills.join(', ') },
  ];

  return (
    <div>
      <PageHead title={t('shortlist.title')} sub="" />

      <div className="mb-6 flex gap-2">
        {(
          [
            ['short', `${t('shortlist.tab.short')} (${shortDevs.length})`],
            ['compare', `${t('shortlist.tab.compare')} (${compareDevs.length}/3)`],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
              tab === v ? 'bg-accent-600 text-white shadow-card' : 'border border-zinc-300 dark:border-white/15'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'short' && (
        <div>
          {shortDevs.length === 0 ? (
            <Card className="text-center">
              <p className="text-zinc-500 dark:text-zinc-400">{t('shortlist.empty')}</p>
              <Link href="/search" className="mt-4 inline-block rounded-xl bg-accent-600 px-6 py-2.5 text-sm font-bold text-white">
                {t('nav.search')} →
              </Link>
            </Card>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {shortDevs.map((d) => (
                <Card key={d.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold">{d.name}</h3>
                        {isVerified(d) && <VerifiedBadge size="sm" />}
                      </div>
                      <p className="text-sm text-accent-600 dark:text-accent-300">{d.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        📍 {d.city} · {d.yearsExp} {ur ? 'saal' : 'yrs'} · {fmtPKR(d.expectedSalary)}/mo
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => viewDev(d.id)} className="rounded-lg bg-accent-600 px-3 py-1.5 text-xs font-bold text-white">
                      {t('common.view')} →
                    </button>
                    <button onClick={() => removeShort(d.id)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-bold text-red-600 dark:border-white/15">
                      {t('shortlist.remove')}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'compare' && (
        <div>
          <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">{t('shortlist.compare.hint')}</p>
          {compareDevs.length < 2 ? (
            <Card className="text-center">
              <p className="text-zinc-500 dark:text-zinc-400">
                {compareDevs.length === 0 ? t('shortlist.empty') : 'Select at least 2 developers to compare.'}
              </p>
              <Link href="/search" className="mt-4 inline-block rounded-xl bg-accent-600 px-6 py-2.5 text-sm font-bold text-white">
                {t('nav.search')} →
              </Link>
            </Card>
          ) : (
            <Card className="overflow-x-auto nice-scroll p-0">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="bg-accent-500/10">
                    <th className="p-4 text-left text-xs uppercase tracking-wide text-zinc-500"></th>
                    {compareDevs.map((d) => (
                      <th key={d.id} className="p-4 text-left">
                        <button onClick={() => viewDev(d.id)} className="font-extrabold text-accent-700 hover:underline dark:text-accent-300">
                          {d.name}
                        </button>
                        <button
                          onClick={() => removeCompare(d.id)}
                          className="ml-2 rounded-md border border-zinc-300 px-1.5 py-0.5 text-[10px] text-red-600 dark:border-white/15"
                          title={t('shortlist.remove')}
                        >
                          ✕
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className={i % 2 ? 'bg-zinc-50 dark:bg-white/[0.03]' : ''}>
                      <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400">{row.label}</td>
                      {compareDevs.map((d) => (
                        <td key={d.id} className="p-4 align-top">{row.get(d)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
