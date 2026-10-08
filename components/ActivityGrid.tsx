'use client';

import { activityGrid } from '../lib/dev';
import { useApp } from './AppProvider';

// Mock GitHub-style contribution grid. Levels 0..4, deterministic from seed.
// No API calls — pure seed math.
const COLORS = [
  'bg-zinc-200 dark:bg-white/10',
  'bg-accent-200 dark:bg-accent-900',
  'bg-accent-300 dark:bg-accent-700',
  'bg-accent-500 dark:bg-accent-500',
  'bg-accent-600 dark:bg-accent-400',
];

export default function ActivityGrid({ seed, weeks = 20 }: { seed: number; weeks?: number }) {
  const { t } = useApp();
  const grid = activityGrid(seed, weeks); // 7 rows x `weeks` cols
  return (
    <div>
      <div className="nice-scroll overflow-x-auto pb-1">
        <div
          className="grid gap-[3px]"
          style={{ gridTemplateRows: 'repeat(7, 1fr)', gridAutoFlow: 'column', width: 'max-content' }}
          role="img"
          aria-label={t('github.activity')}
        >
          {grid.flatMap((row, r) =>
            row.map((level, c) => (
              <div
                key={`${r}-${c}`}
                title={`${level}/4`}
                className={`h-3 w-3 rounded-[3px] ${COLORS[level]}`}
              />
            ))
          )}
        </div>
      </div>
      <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
        <span>Less</span>
        {COLORS.map((c, i) => (
          <span key={i} className={`h-3 w-3 rounded-[3px] ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
