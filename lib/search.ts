// Rule-based natural-language search parser + ranker.
// "AI simulated for demo" — keyword matching only, no external service.
import { DevProfile, fmtPKR, isVerified } from './dev';

export interface ParsedQuery {
  stacks: string[];
  city: string | null;
  minYears: number | null;
  maxBudget: number | null;
  availability: 'available-now' | 'in-1-month' | 'freelance-only' | null;
  raw: string;
}

const STACK_ALIASES: Record<string, string> = {
  laravel: 'Laravel',
  php: 'Laravel',
  react: 'React',
  'reactjs': 'React',
  'react.js': 'React',
  nextjs: 'React',
  'next.js': 'React',
  node: 'Node.js',
  nodejs: 'Node.js',
  'node.js': 'Node.js',
  express: 'Node.js',
  python: 'Python',
  django: 'Python',
  flask: 'Python',
  flutter: 'Flutter',
  dart: 'Flutter',
  vue: 'Vue.js',
  vuejs: 'Vue.js',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  mysql: 'MySQL',
  mongodb: 'MongoDB',
};

const CITIES = [
  'Rawalpindi',
  'Islamabad',
  'Lahore',
  'Karachi',
  'Peshawar',
  'Multan',
  'Faisalabad',
  'Hyderabad',
  'Quetta',
  'Sialkot',
];

export function parseQuery(raw: string): ParsedQuery {
  const q = ` ${raw.toLowerCase()} `;
  const stacks: string[] = [];
  for (const [alias, canon] of Object.entries(STACK_ALIASES)) {
    const re = new RegExp(`(^|[^a-z])${alias.replace('.', '\\.')}([^a-z]|$)`);
    if (re.test(q) && !stacks.includes(canon)) stacks.push(canon);
  }
  let city: string | null = null;
  for (const c of CITIES) {
    if (q.includes(c.toLowerCase())) {
      city = c;
      break;
    }
  }
  let minYears: number | null = null;
  const y = q.match(/(\d+)\s*(?:\+)?\s*(?:years?|yrs?|saal)/);
  if (y) minYears = parseInt(y[1], 10);

  let maxBudget: number | null = null;
  const lakh = q.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac|l)\b/);
  const k = q.match(/(\d+(?:\.\d+)?)\s*k\b/);
  const plain = q.match(/(?:under|below|max|budget)\s*(\d{4,7})\b/);
  if (lakh) maxBudget = Math.round(parseFloat(lakh[1]) * 100000);
  else if (k) maxBudget = Math.round(parseFloat(k[1]) * 1000);
  else if (plain) maxBudget = parseInt(plain[1], 10);

  let availability: ParsedQuery['availability'] = null;
  if (/available now|immediately|asap|foran|abhi/.test(q)) availability = 'available-now';
  else if (/freelance/.test(q)) availability = 'freelance-only';
  else if (/(1|one)\s*month/.test(q)) availability = 'in-1-month';

  return { stacks, city, minYears, maxBudget, availability, raw };
}

export interface RankedDev {
  dev: DevProfile;
  score: number; // 0..100
  reasons: string[];
}

export function rankDevs(
  devs: DevProfile[],
  pq: ParsedQuery,
  ur: boolean,
  t: (k: string) => string
): RankedDev[] {
  const hasCriteria =
    pq.stacks.length > 0 ||
    pq.city ||
    pq.minYears != null ||
    pq.maxBudget != null ||
    pq.availability;

  return devs
    .map((dev) => {
      let score = 0;
      const reasons: string[] = [];

      // stack 40
      if (pq.stacks.length > 0) {
        const hit = pq.stacks.some(
          (s) =>
            dev.stack.toLowerCase() === s.toLowerCase() ||
            dev.skills.some((sk) => sk.toLowerCase() === s.toLowerCase())
        );
        if (hit) {
          score += 40;
          reasons.push(`${dev.stack} ${t('search.reason.stack')}`);
        }
      } else {
        score += 12; // no stack filter: small base credit
      }

      // city 15
      if (pq.city) {
        if (dev.city === pq.city) {
          score += 15;
          reasons.push(`${dev.city} ${t('search.reason.city')}`);
        }
      } else score += 5;

      // years 15
      if (pq.minYears != null) {
        if (dev.yearsExp >= pq.minYears) {
          score += 15;
          reasons.push(
            ur
              ? `${dev.yearsExp} saal — ${t('search.reason.years')}`
              : `${dev.yearsExp} yrs — ${t('search.reason.years')}`
          );
        } else {
          score += Math.max(0, Math.round((dev.yearsExp / pq.minYears) * 10));
        }
      } else score += 5;

      // budget 20
      if (pq.maxBudget != null) {
        if (dev.expectedSalary <= pq.maxBudget) {
          score += 20;
          reasons.push(
            `${fmtPKR(dev.expectedSalary)} ${t('search.reason.budget')}`
          );
        } else {
          const over = dev.expectedSalary / pq.maxBudget;
          score += Math.max(0, Math.round(20 / over) - 4);
        }
      } else score += 8;

      // availability 10
      if (pq.availability) {
        if (dev.availability === pq.availability) {
          score += 10;
          reasons.push(t('search.reason.avail'));
        }
      } else score += 4;

      // verified bonus 5
      if (isVerified(dev)) {
        score += 5;
        reasons.push(t('search.reason.verified'));
      }

      if (!hasCriteria) score = Math.min(100, score + 18);

      return { dev, score: Math.min(100, Math.round(score)), reasons };
    })
    .sort((a, b) => b.score - a.score || (b.dev.testScore ?? 0) - (a.dev.testScore ?? 0));
}
