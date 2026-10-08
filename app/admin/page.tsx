'use client';

import { useEffect, useState } from 'react';
import { useApp } from '../../components/AppProvider';
import { Card, PageHead } from '../../components/ui';
import { DEVELOPERS } from '../../data/developers';
import { BATCHES } from '../../data/batches';
import { clearAllDemoData, getJSON, setJSON } from '../../lib/storage';

export default function AdminPage() {
  const { t } = useApp();
  const [logged, setLogged] = useState(false);
  const [credits, setCredits] = useState(10);
  const [resetMsg, setResetMsg] = useState(false);

  useEffect(() => {
    setLogged(getJSON<string>('proofhire-admin', '') === '1');
    setCredits(getJSON<number>('proofhire-credits', 10));
  }, []);

  const login = () => {
    setJSON('proofhire-admin', '1');
    setLogged(true);
  };

  const logout = () => {
    try {
      window.localStorage.removeItem('proofhire-admin');
    } catch { /* noop */ }
    setLogged(false);
  };

  const reset = () => {
    clearAllDemoData();
    setCredits(10);
    setResetMsg(true);
    setLogged(false);
    setTimeout(() => setResetMsg(false), 4000);
  };

  if (!logged) {
    return (
      <div>
        <PageHead title={t('admin.title')} sub={t('admin.sub')} />
        <Card className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/15 text-3xl">
            🔐
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Demo admin area — no real authentication in this demo.
          </p>
          <button
            onClick={login}
            className="mt-5 w-full rounded-2xl bg-accent-600 px-6 py-3.5 font-bold text-white shadow-card transition hover:bg-accent-700"
          >
            {t('nav.login')}
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHead title={t('admin.title')} sub={t('admin.sub')} />
      <p className="mb-6 inline-block rounded-full bg-green-500/15 px-4 py-1.5 text-sm font-semibold text-green-700 dark:text-green-300">
        ✓ {t('admin.logged')}
      </p>

      <div className="grid grid-cols-3 gap-4">
        {[
          { v: String(DEVELOPERS.length), l: t('admin.stat.profiles') },
          { v: String(BATCHES.length), l: t('admin.stat.batches') },
          { v: String(credits), l: t('admin.stat.credits') },
        ].map((s) => (
          <Card key={s.l} className="text-center">
            <p className="text-3xl font-extrabold text-accent-600 dark:text-accent-300">{s.v}</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{s.l}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-red-500/30">
        <h2 className="font-bold text-red-600 dark:text-red-400">⚠️ {t('admin.danger')}</h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{t('admin.reset.warn')}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
        >
          🗑️ {t('common.reset')}
        </button>
        {resetMsg && (
          <p className="mt-3 text-sm font-semibold text-green-600 dark:text-green-300">
            ✓ {t('common.reset.done')}
          </p>
        )}
      </Card>

      <button onClick={logout} className="mt-6 text-sm font-bold text-zinc-500 hover:underline">
        {t('nav.logout')}
      </button>
    </div>
  );
}
