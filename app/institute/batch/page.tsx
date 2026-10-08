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

      <Card className="mb-4 border-accent-500/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-accent-600 dark:text-accent-300">🏫 {batch.institute}</p>
            <h2 className="mt-1 text-2xl font-extrabold">{batch.name}</h2>
            <p className="mt-1 text-xs text-zinc-500">Started {batch.started} · {batch.students.length} {t('inst.students')}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-accent-600 dark:text-accent-300">{verified.length}</p>
            <p className="text-xs text-zinc-500">{t('inst.verified.count')}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-zinc-50 p-3 dark:bg-white/5">
          <span className="text-xs font-bold text-zinc-500">{t('batch.link')}:</span>
          <code className="break-all text-xs text-accent-700 dark:text-accent-300">{mockLink}</code>
          <button onClick={copy} className="ml-auto rounded-lg bg-accent-600 px-3 py-1.5 text-xs font-bold text-white">
            {copied ? `✓ ${t('common.copied')}` : `📋 ${t('common.copy')}`}
          </button>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {batch.students.map((s) => (
          <Card key={s.name} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-lg font-extrabold text-accent-700 dark:text-accent-300">
              {s.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold">{s.name}</p>
                {studentVerified(s) && <VerifiedBadge size="sm" />}
              </div>
              <p className="text-xs text-zinc-500">{s.stack} · {t('inst.table.score')}: {s.testScore != null ? `${s.testScore}/100` : '—'}</p>
              <div className="mt-1.5 flex items-center gap-2">
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
