// Developer profile types, verified-badge logic, and deterministic
// seed-based GitHub activity generator (no API calls — pure math).

export type Availability = 'available-now' | 'in-1-month' | 'freelance-only';

export interface Repo {
  name: string;
  desc: string;
  stars: number;
  language: string;
}

export interface Project {
  name: string;
  url: string;
  live: boolean;
}

export interface DevProfile {
  id: string;
  name: string;
  city: string;
  title: string;
  stack: string; // primary stack
  skills: string[];
  yearsExp: number;
  expectedSalary: number; // PKR / month
  availability: Availability;
  email: string;
  phone: string;
  links: { github: string; portfolio: string; linkedin: string };
  repos: Repo[];
  languages: Record<string, number>; // name -> % share
  activitySeed: number;
  projects: Project[];
  testStack: string | null;
  testScore: number | null; // 0..100
  idVerified: boolean; // demo ID check ticked
  completion: number; // profile completion %
  summary: string;
}

/** "Verified Developer" badge rule:
 *  demo ID check ticked + test score >= 70 + at least one live project. */
export function isVerified(d: DevProfile): boolean {
  const hasLive = d.projects.some((p) => p.live);
  return (
    d.idVerified === true &&
    (d.testScore ?? 0) >= 70 &&
    hasLive
  );
}

export function availabilityLabel(a: Availability, ur: boolean): string {
  if (ur) {
    return a === 'available-now'
      ? 'Abhi available'
      : a === 'in-1-month'
        ? '1 mahine mein'
        : 'Sirf freelance';
  }
  return a === 'available-now'
    ? 'Available now'
    : a === 'in-1-month'
      ? 'In 1 month'
      : 'Freelance only';
}

export function fmtPKR(n: number): string {
  if (n >= 100000) {
    const l = n / 100000;
    return `PKR ${Number(l.toFixed(l >= 10 ? 0 : 1))}L`;
  }
  return `PKR ${(n / 1000).toFixed(0)}k`;
}

// Deterministic PRNG (mulberry32)
function prng(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 7 days x `weeks` contribution levels (0..4), deterministic from seed. */
export function activityGrid(seed: number, weeks = 20): number[][] {
  const rnd = prng(seed);
  const grid: number[][] = [];
  for (let d = 0; d < 7; d++) {
    const col: number[] = [];
    for (let w = 0; w < weeks; w++) {
      const r = rnd();
      col.push(r < 0.35 ? 0 : r < 0.6 ? 1 : r < 0.78 ? 2 : r < 0.92 ? 3 : 4);
    }
    grid.push(col);
  }
  return grid;
}

export function totalContributions(seed: number, weeks = 20): number {
  return activityGrid(seed, weeks)
    .flat()
    .reduce((a, b) => a + b, 0);
}
