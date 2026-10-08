// The visitor's own built profile (localStorage: proofhire-my-profile).
import { getJSON, setJSON } from './storage';
import { Availability, DevProfile } from './dev';

const KEY = 'proofhire-my-profile';

const STACK_META: Record<string, { repos: DevProfile['repos']; languages: Record<string, number> }> = {
  Laravel: {
    repos: [
      { name: 'my-laravel-app', desc: 'Sample CRUD app built during the demo.', stars: 3, language: 'PHP' },
      { name: 'api-starter', desc: 'REST API starter with Sanctum auth.', stars: 1, language: 'PHP' },
    ],
    languages: { PHP: 58, JavaScript: 22, Blade: 12, CSS: 8 },
  },
  React: {
    repos: [
      { name: 'my-react-app', desc: 'Sample SPA built during the demo.', stars: 3, language: 'TypeScript' },
      { name: 'ui-playground', desc: 'Component experiments.', stars: 1, language: 'TypeScript' },
    ],
    languages: { TypeScript: 46, JavaScript: 34, CSS: 14, HTML: 6 },
  },
  'Node.js': {
    repos: [
      { name: 'my-node-api', desc: 'Sample Express API built during the demo.', stars: 3, language: 'JavaScript' },
      { name: 'cli-tool', desc: 'Small CLI utility.', stars: 1, language: 'JavaScript' },
    ],
    languages: { JavaScript: 58, TypeScript: 27, JSON: 9, Shell: 6 },
  },
  Python: {
    repos: [
      { name: 'my-python-tool', desc: 'Sample automation script from the demo.', stars: 3, language: 'Python' },
      { name: 'data-playground', desc: 'Pandas experiments.', stars: 1, language: 'Python' },
    ],
    languages: { Python: 71, 'Jupyter Notebook': 14, SQL: 10, Shell: 5 },
  },
  Flutter: {
    repos: [
      { name: 'my-flutter-app', desc: 'Sample app built during the demo.', stars: 3, language: 'Dart' },
      { name: 'widget-lab', desc: 'Custom widget experiments.', stars: 1, language: 'Dart' },
    ],
    languages: { Dart: 76, Kotlin: 10, Swift: 8, YAML: 6 },
  },
};

export function stackDefaults(stack: string) {
  return (
    STACK_META[stack] ?? {
      repos: [{ name: 'my-project', desc: 'Sample project.', stars: 1, language: 'Code' }],
      languages: { Code: 100 },
    }
  );
}

export interface BuilderFields {
  name: string;
  city: string;
  title: string;
  stack: string;
  skills: string;
  yearsExp: string;
  expectedSalary: string;
  availability: Availability;
  github: string;
  portfolio: string;
  linkedin: string;
  summary: string;
}

export const EMPTY_FIELDS: BuilderFields = {
  name: '', city: '', title: '', stack: 'Laravel', skills: '',
  yearsExp: '', expectedSalary: '', availability: 'available-now',
  github: '', portfolio: '', linkedin: '', summary: '',
};

export function profileFromFields(f: BuilderFields, prev: DevProfile | null): DevProfile {
  const meta = stackDefaults(f.stack);
  const skills = f.skills.split(',').map((s) => s.trim()).filter(Boolean);
  return {
    id: 'me',
    name: f.name || 'Your Name',
    city: f.city || '—',
    title: f.title || `${f.stack} Developer`,
    stack: f.stack,
    skills: skills.length ? skills : [f.stack],
    yearsExp: parseInt(f.yearsExp, 10) || 0,
    expectedSalary: parseInt(f.expectedSalary, 10) || 0,
    availability: f.availability,
    email: 'you@example.com',
    phone: '0300-0000000',
    links: {
      github: f.github || 'https://github.com/your-handle',
      portfolio: f.portfolio || 'https://your-portfolio.example.com',
      linkedin: f.linkedin || 'https://linkedin.com/in/your-handle',
    },
    repos: prev?.repos?.length ? prev.repos : meta.repos,
    languages: meta.languages,
    activitySeed: 4242,
    projects: prev?.projects ?? [],
    testStack: prev?.testStack ?? null,
    testScore: prev?.testScore ?? null,
    idVerified: prev?.idVerified ?? false,
    completion: 0,
    summary: f.summary || 'Demo profile built with the ProofHire builder.',
  };
}

export function computeCompletion(p: DevProfile): number {
  let got = 0;
  const total = 10;
  if (p.name && p.name !== 'Your Name') got++;
  if (p.city && p.city !== '—') got++;
  if (p.title) got++;
  if (p.skills.length >= 3) got++;
  if (p.yearsExp > 0) got++;
  if (p.expectedSalary > 0) got++;
  if (p.links.github.startsWith('http') && !p.links.github.includes('your-handle')) got++;
  if (p.projects.length > 0) got++;
  if (p.testScore != null) got++;
  if (p.idVerified) got++;
  return Math.round((got / total) * 100);
}

export function loadMyProfile(): DevProfile | null {
  const p = getJSON<DevProfile | null>(KEY, null);
  if (p) p.completion = computeCompletion(p);
  return p;
}

export function saveMyProfile(p: DevProfile): void {
  p.completion = computeCompletion(p);
  setJSON(KEY, p);
}
