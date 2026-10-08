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
        <Card className="hero-mesh mx-auto max-w-md text-center">
          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-violet-600 text-3xl text-white shadow-glow">
            🔐
          </div>
          <p className="relative text-sm text-zinc-500 dark:text-zinc-400">
            Demo admin area — no real authentication in this demo.
          </p>
          <button
            onClick={login}
            className="btn-primary relative mt-6 w-full py-3.5"
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
      <p className="mb-7 inline-flex items-center gap-2 rounded-full bg-green-500/15 px-4 py-1.5 text-sm font-semibold text-green-700 ring-1 ring-green-500/30 dark:text-green-300">
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" aria-hidden="true" />
        {t('admin.logged')}
      </p>

      <div className="grid grid-cols-3 gap-4">
        {[
          { v: String(DEVELOPERS.length), l: t('admin.stat.profiles') },
          { v: String(BATCHES.length), l: t('admin.stat.batches') },
          { v: String(credits), l: t('admin.stat.credits') },
        ].map((s) => (
          <Card key={s.l} className="text-center">
            <p className="gradient-text text-3xl font-extrabold tracking-tight">{s.v}</p>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{s.l}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-7 !border-red-500/30">
        <h2 className="font-bold tracking-tight text-red-600 dark:text-red-400">⚠️ {t('admin.danger')}</h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{t('admin.reset.warn')}</p>
        <button
          onClick={reset}
          className="btn-sm mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-red-500 to-red-700 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_28px_-8px_rgba(239,68,68,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
        >
          🗑️ {t('common.reset')}
        </button>
        {resetMsg && (
          <p className="mt-3 text-sm font-semibold text-green-600 dark:text-green-300">
            ✓ {t('common.reset.done')}
          </p>
        )}
      </Card>

      <button onClick={logout} className="btn-ghost mt-7">
        {t('nav.logout')}
      </button>
    </div>
  );
}
