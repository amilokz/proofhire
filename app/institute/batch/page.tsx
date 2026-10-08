'use client';

import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../../components/AppProvider';
import { Card, PageHead, ProgressBar, SimulatedLabel, VerifiedBadge } from '../../../components/ui';
import { BATCHES, studentVerified } from '../../../data/batches';
import { getJSON } from '../../../lib/storage';

export default function BatchPage() {
  const { t } = useApp();
  const [batchId, setBatchId] = useState<string>(BATCHES[0].id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setBatchId(getJSON<string>('proofhire-share-batch', BATCHES[0].id));
  }, []);

  const batch = useMemo(() => BATCHES.find((b) => b.id === batchId) ?? BATCHES[0], [batchId]);
  const verified = batch.students.filter(studentVerified);
  const mockLink = `https://proofhire.demo/institute/batch/${batch.id}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(mockLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div>
      <PageHead title={t('batch.title')} sub={t('batch.sub')} />
      <div className="mb-4"><SimulatedLabel /></div>

      <Card className="hero-mesh mb-5 !border-accent-500/30">
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-accent-700 dark:text-accent-200">🏫 {batch.institute}</p>
            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight">{batch.name}</h2>
            <p className="mt-1.5 text-xs text-zinc-500">Started {batch.started} · {batch.students.length} {t('inst.students')}</p>
          </div>
          <div className="text-center">
            <p className="gradient-text text-4xl font-extrabold">{verified.length}</p>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-zinc-500">{t('inst.verified.count')}</p>
          </div>
        </div>
        <div className="relative mt-5 flex flex-wrap items-center gap-2 rounded-2xl border border-zinc-200/60 bg-zinc-50/70 p-3.5 dark:border-white/10 dark:bg-white/[0.04]">
          <span className="text-xs font-bold text-zinc-500">{t('batch.link')}:</span>
          <code className="break-all text-xs font-semibold text-accent-700 dark:text-accent-200">{mockLink}</code>
          <button onClick={copy} className="btn-primary btn-sm ml-auto">
            {copied ? `✓ ${t('common.copied')}` : `📋 ${t('common.copy')}`}
          </button>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {batch.students.map((s) => (
          <Card lift key={s.name} className="flex items-center gap-4 !p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-violet-600 text-lg font-extrabold text-white shadow-glow">
              {s.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold">{s.name}</p>
                {studentVerified(s) && <VerifiedBadge size="sm" />}
              </div>
              <p className="mt-0.5 text-xs text-zinc-500">{s.stack} · {t('inst.table.score')}: {s.testScore != null ? `${s.testScore}/100` : '—'}</p>
              <div className="mt-2 flex items-center gap-2">
                <ProgressBar value={s.completion} className="flex-1" />
                <span className="text-[11px] font-bold">{s.completion}%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
