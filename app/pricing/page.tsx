'use client';

import { useState } from 'react';
import { useApp } from '../../components/AppProvider';
import { PageHead, SimulatedLabel } from '../../components/ui';

export default function PricingPage() {
  const { t, lang } = useApp();
  const [chosen, setChosen] = useState<string | null>(null);
  const ur = lang === 'ur';

  const plans = [
    {
      id: 'free',
      name: t('pricing.free.t'),
      desc: t('pricing.free.d'),
      price: t('pricing.free.p'),
      cta: true,
      features: ur
        ? ['Unlimited profile', 'Skill test (har stack)', 'GitHub proof section', 'Verified badge']
        : ['Unlimited profile', 'Skill test (every stack)', 'GitHub proof section', 'Verified Developer badge'],
    },
    {
      id: 'pro',
      name: t('pricing.pro.t'),
      desc: t('pricing.pro.d'),
      price: t('pricing.pro.p'),
      cta: true,
      popular: true,
      features: ur
        ? ['Smart natural-language search', 'Match % + wajah', 'Shortlist aur 3-way compare', '50 contact unlocks / mahina', 'Verified-only filter']
        : ['Smart natural-language search', 'Match % + reasons', 'Shortlist & 3-way compare', '50 contact unlocks / month', 'Verified-only filter'],
    },
    {
      id: 'inst',
      name: t('pricing.inst.t'),
      desc: t('pricing.inst.d'),
      price: t('pricing.inst.p'),
      cta: true,
      features: ur
        ? ['Batch dashboard', 'Completion + score tracking', 'Shareable batch report page', 'Unlimited students', 'Priority support (demo)']
        : ['Batch dashboard', 'Completion + score tracking', 'Shareable batch report page', 'Unlimited students', 'Priority support (demo)'],
    },
  ];

  return (
    <div>
      <PageHead title={t('pricing.title')} sub={t('pricing.sub')} />
      <div className="mb-4"><SimulatedLabel /></div>

      {chosen && (
        <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-sm font-medium text-green-700 dark:text-green-300">
          ✅ {t('pricing.chosen')}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`relative rounded-3xl border p-7 ${
              p.popular
                ? 'border-accent-500 bg-gradient-to-b from-accent-500/15 to-transparent shadow-pop'
                : 'border-zinc-200 bg-white dark:border-white/10 dark:bg-white/5'
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-600 px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {ur ? 'Maqbool' : 'Popular'}
              </span>
            )}
            <h2 className="text-xl font-extrabold">{p.name}</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{p.desc}</p>
            <p className="mt-4 text-3xl font-extrabold text-accent-600 dark:text-accent-300">{p.price}</p>
            <ul className="mt-5 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-zinc-600 dark:text-zinc-300">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setChosen(p.id)}
              className={`mt-7 w-full rounded-2xl px-6 py-3 font-bold transition ${
                p.popular
                  ? 'bg-accent-600 text-white shadow-card hover:bg-accent-700'
                  : 'border-2 border-accent-500/40 text-accent-700 hover:bg-accent-500/10 dark:text-accent-300'
              }`}
            >
              {t('pricing.cta')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
