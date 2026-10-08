'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../components/AppProvider';
import { Card, PageHead, ProgressBar } from '../../components/ui';
import { STACKS } from '../../data/questions';
import { Availability } from '../../lib/dev';
import {
  BuilderFields, EMPTY_FIELDS, loadMyProfile, profileFromFields, saveMyProfile,
} from '../../lib/myprofile';

const CITIES = ['Rawalpindi', 'Islamabad', 'Lahore', 'Karachi', 'Peshawar', 'Multan', 'Faisalabad', 'Hyderabad', 'Quetta', 'Remote'];

export default function BuildPage() {
  const { t } = useApp();
  const [fields, setFields] = useState<BuilderFields>(EMPTY_FIELDS);
  const [saved, setSaved] = useState(false);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const p = loadMyProfile();
    if (p) {
      setFields({
        name: p.name === 'Your Name' ? '' : p.name,
        city: p.city === '—' ? '' : p.city,
        title: p.title,
        stack: p.stack,
        skills: p.skills.join(', '),
        yearsExp: p.yearsExp ? String(p.yearsExp) : '',
        expectedSalary: p.expectedSalary ? String(p.expectedSalary) : '',
        availability: p.availability,
        github: p.links.github.includes('your-handle') ? '' : p.links.github,
        portfolio: p.links.portfolio.includes('your-portfolio') ? '' : p.links.portfolio,
        linkedin: p.links.linkedin.includes('your-handle') ? '' : p.links.linkedin,
        summary: p.summary.includes('Demo profile built') ? '' : p.summary,
      });
      setCompletion(p.completion);
    }
  }, []);

  const set = (k: keyof BuilderFields, v: string) =>
    setFields((f) => ({ ...f, [k]: v }));

  const inputCls = 'field';
  const labelCls = 'field-label';

  const save = () => {
    const prev = loadMyProfile();
    const profile = profileFromFields(fields, prev);
    saveMyProfile(profile);
    setCompletion(profile.completion);
    setSaved(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <PageHead title={t('build.title')} sub={t('build.sub')} />

      {saved && (
        <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-sm font-medium text-green-700 shadow-sm dark:text-green-300">
          ✅ {t('build.saved')}
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/github" className="btn-primary btn-sm">{t('build.next.github')}</Link>
            <Link href="/projects" className="btn-primary btn-sm">{t('build.next.projects')}</Link>
            <Link href="/test" className="btn-primary btn-sm">{t('build.next.test')}</Link>
          </div>
        </div>
      )}

      <Card className="hero-mesh">
        <div className="relative mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold">{t('build.completion')}</span>
            <span className="gradient-text text-lg font-extrabold">{completion}%</span>
          </div>
          <ProgressBar value={completion} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="f-name">{t('build.name')} *</label>
            <input id="f-name" className={inputCls} value={fields.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Ahmed Raza" />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-city">{t('build.city')} *</label>
            <select id="f-city" className={inputCls} value={fields.city} onChange={(e) => set('city', e.target.value)}>
              <option value="">—</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="f-title">{t('build.title2')} *</label>
            <input id="f-title" className={inputCls} value={fields.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Full-Stack Laravel Developer" />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-stack">{t('build.stack')} *</label>
            <select id="f-stack" className={inputCls} value={fields.stack} onChange={(e) => set('stack', e.target.value)}>
              {STACKS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="f-skills">{t('build.skills')}</label>
            <input id="f-skills" className={inputCls} value={fields.skills} onChange={(e) => set('skills', e.target.value)} placeholder="Laravel, PHP, MySQL" />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-years">{t('build.years')}</label>
            <input id="f-years" type="number" min="0" max="30" className={inputCls} value={fields.yearsExp} onChange={(e) => set('yearsExp', e.target.value)} placeholder="3" />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-salary">{t('build.salary')}</label>
            <input id="f-salary" type="number" min="0" step="5000" className={inputCls} value={fields.expectedSalary} onChange={(e) => set('expectedSalary', e.target.value)} placeholder="120000" />
          </div>
          <div className="sm:col-span-2">
            <span className={labelCls}>{t('build.avail')}</span>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('build.avail')}>
              {(
                [
                  ['available-now', t('build.avail.now')],
                  ['in-1-month', t('build.avail.month')],
                  ['freelance-only', t('build.avail.free')],
                ] as [Availability, string][]
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={fields.availability === v}
                  onClick={() => setFields((f) => ({ ...f, availability: v }))}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    fields.availability === v
                      ? 'border-accent-500 bg-accent-500/15 text-accent-700 shadow-glow dark:text-accent-200'
                      : 'border-zinc-300 text-zinc-500 hover:border-accent-300 dark:border-white/15 dark:text-zinc-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <span className={labelCls}>{t('build.links')}</span>
            <div className="grid gap-3 sm:grid-cols-3">
              <input className={inputCls} value={fields.github} onChange={(e) => set('github', e.target.value)} placeholder={t('build.github')} aria-label={t('build.github')} />
              <input className={inputCls} value={fields.portfolio} onChange={(e) => set('portfolio', e.target.value)} placeholder={t('build.portfolio')} aria-label={t('build.portfolio')} />
              <input className={inputCls} value={fields.linkedin} onChange={(e) => set('linkedin', e.target.value)} placeholder={t('build.linkedin')} aria-label={t('build.linkedin')} />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="f-summary">Summary</label>
            <textarea id="f-summary" rows={3} className={inputCls} value={fields.summary} onChange={(e) => set('summary', e.target.value)} placeholder="One line about what you build…" />
          </div>
        </div>

        <button
          onClick={save}
          className="btn-primary mt-6 w-full px-10 py-3.5 text-base sm:w-auto"
        >
          💾 {t('build.save')}
        </button>
      </Card>
    </div>
  );
}
