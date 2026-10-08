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
        <div className="mb-7 rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-sm font-medium text-green-700 shadow-sm dark:text-green-300">
          ✅ {t('pricing.chosen')}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`card-premium relative p-8 transition-all duration-300 hover:-translate-y-1.5 ${
              p.popular
                ? '!border-accent-500/50 hero-mesh shadow-glow-lg'
                : 'hover:shadow-card-lg'
            }`}
          >
            {p.popular && (
              <span className="sheen absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-600 to-violet-600 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-glow">
                {ur ? 'Maqbool' : 'Popular'}
              </span>
            )}
            <h2 className="text-xl font-extrabold tracking-tight">{p.name}</h2>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{p.desc}</p>
            <p className="gradient-text mt-5 text-4xl font-extrabold tracking-tight">{p.price}</p>
            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-[11px] font-bold text-green-600 dark:text-green-300">✓</span>
                  <span className="text-zinc-600 dark:text-zinc-300">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setChosen(p.id)}
              className={`mt-8 w-full ${p.popular ? 'btn-primary' : 'btn-secondary'}`}
            >
              {t('pricing.cta')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
