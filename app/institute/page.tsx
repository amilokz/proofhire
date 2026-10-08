'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../components/AppProvider';
import { Card, PageHead, ProgressBar, VerifiedBadge } from '../../components/ui';
import { BATCHES, studentVerified } from '../../data/batches';
import { setJSON } from '../../lib/storage';

export default function InstitutePage() {
  const { t } = useApp();
  const [batchId, setBatchId] = useState(BATCHES[0].id);
  const batch = useMemo(() => BATCHES.find((b) => b.id === batchId)!, [batchId]);

  const avgCompletion = Math.round(batch.students.reduce((a, s) => a + s.completion, 0) / batch.students.length);
  const scored = batch.students.filter((s) => s.testScore != null);
  const avgScore = scored.length ? Math.round(scored.reduce((a, s) => a + (s.testScore ?? 0), 0) / scored.length) : 0;
  const verifiedCount = batch.students.filter(studentVerified).length;

  const share = () => {
    setJSON('proofhire-share-batch', batchId);
  };

  return (
    <div>
      <PageHead title={t('inst.title')} sub={t('inst.sub')} />

      <div className="mb-7 flex flex-wrap items-center gap-3">
        <label className="field-label !mb-0">{t('inst.batch')}:</label>
        <div className="flex flex-wrap gap-2">
          {BATCHES.map((b) => (
            <button
              key={b.id}
              onClick={() => setBatchId(b.id)}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200 ${
                b.id === batchId ? 'bg-gradient-to-br from-accent-500 to-violet-600 text-white shadow-glow' : 'btn-ghost'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { v: String(batch.students.length), l: t('inst.students') },
          { v: `${avgCompletion}%`, l: t('inst.completion') },
          { v: scored.length ? `${avgScore}/100` : '—', l: t('inst.avg.score') },
          { v: String(verifiedCount), l: t('inst.verified.count') },
        ].map((s) => (
          <Card key={s.l} className="text-center">
            <p className="gradient-text text-3xl font-extrabold tracking-tight">{s.v}</p>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{s.l}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-x-auto !p-0 nice-scroll">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-200/80 bg-gradient-to-r from-accent-500/10 to-transparent text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-white/10">
              <th className="p-4">{t('inst.table.name')}</th>
              <th className="p-4">{t('inst.table.completion')}</th>
              <th className="p-4">{t('inst.table.score')}</th>
              <th className="p-4">{t('inst.table.status')}</th>
            </tr>
          </thead>
          <tbody>
            {batch.students.map((s, i) => (
              <tr key={s.name} className={i % 2 ? 'bg-zinc-50 dark:bg-white/[0.03]' : ''}>
                <td className="p-4">
                  <p className="font-bold">{s.name}</p>
                  <p className="text-xs text-zinc-500">{s.stack}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <ProgressBar value={s.completion} className="w-24" />
                    <span className="text-xs font-bold">{s.completion}%</span>
                  </div>
                </td>
                <td className="p-4 font-bold">{s.testScore != null ? `${s.testScore}/100` : '—'}</td>
                <td className="p-4">
                  {studentVerified(s) ? <VerifiedBadge size="sm" /> : <span className="text-xs text-zinc-400">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="mt-7">
        <Link
          href="/institute/batch"
          onClick={share}
          className="btn-primary inline-flex"
        >
          🔗 {t('inst.share')}
        </Link>
      </div>
    </div>
  );
}
