'use client';

// CSS-only top-languages chart (horizontal bars, no images).
const LANG_COLORS: Record<string, string> = {
  PHP: '#777bb4',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Dart: '#00b4ab',
  Python: '#3572a5',
  Blade: '#f7523f',
  CSS: '#563d7c',
  HTML: '#e34c26',
  'Jupyter Notebook': '#da5b0b',
  SQL: '#e38c00',
  JSON: '#cbcbcb',
  Shell: '#89e051',
  Kotlin: '#a97bff',
  Swift: '#f05138',
  YAML: '#cb171e',
};

export default function LanguageChart({ languages }: { languages: Record<string, number> }) {
  const entries = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  return (
    <div className="space-y-3">
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {entries.map(([name, pct]) => (
          <div
            key={name}
            title={`${name} ${pct}%`}
            style={{ width: `${pct}%`, background: LANG_COLORS[name] ?? '#8b5cf6' }}
          />
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {entries.map(([name, pct]) => (
          <li key={name} className="flex items-center gap-2 text-sm">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ background: LANG_COLORS[name] ?? '#8b5cf6' }}
            />
            <span className="truncate text-zinc-600 dark:text-zinc-300">{name}</span>
            <span className="ml-auto font-bold text-zinc-800 dark:text-zinc-100">{pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
