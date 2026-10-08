// Fictional institute batches for the demo dashboard.
export interface BatchStudent {
  name: string;
  stack: string;
  completion: number; // %
  testScore: number | null; // null = not taken
  idVerified: boolean;
  hasLiveProject: boolean;
}

export interface Batch {
  id: string;
  institute: string;
  name: string;
  started: string;
  students: BatchStudent[];
}

export const BATCHES: Batch[] = [
  {
    id: 'batch-a',
    institute: 'CodeCraft Institute (demo)',
    name: 'Full-Stack Web — Batch 12',
    started: '2026-08-04',
    students: [
      { name: 'Ahmed Raza', stack: 'Laravel', completion: 96, testScore: 85, idVerified: true, hasLiveProject: true },
      { name: 'Daniyal Khan', stack: 'React', completion: 58, testScore: null, idVerified: false, hasLiveProject: true },
      { name: 'Sana Iqbal', stack: 'Python', completion: 86, testScore: 74, idVerified: false, hasLiveProject: true },
      { name: 'Usman Tariq', stack: 'Laravel', completion: 64, testScore: null, idVerified: false, hasLiveProject: false },
      { name: 'Nimra Khan', stack: 'React', completion: 84, testScore: 66, idVerified: false, hasLiveProject: true },
      { name: 'Waqas Ahmed', stack: 'Python', completion: 78, testScore: null, idVerified: false, hasLiveProject: true },
      { name: 'Mahnoor Fatima', stack: 'Laravel', completion: 91, testScore: 78, idVerified: true, hasLiveProject: true },
      { name: 'Iqra Yousaf', stack: 'Python', completion: 52, testScore: null, idVerified: false, hasLiveProject: false },
    ],
  },
  {
    id: 'batch-b',
    institute: 'AppForge Academy (demo)',
    name: 'Flutter Mobile — Batch 5',
    started: '2026-09-01',
    students: [
      { name: 'Ayesha Malik', stack: 'Flutter', completion: 94, testScore: 81, idVerified: true, hasLiveProject: true },
      { name: 'Maryam Aslam', stack: 'Flutter', completion: 92, testScore: 77, idVerified: true, hasLiveProject: true },
      { name: 'Fahad Mehmood', stack: 'Flutter', completion: 82, testScore: 55, idVerified: true, hasLiveProject: false },
      { name: 'Saba Tariq', stack: 'Flutter', completion: 88, testScore: 79, idVerified: true, hasLiveProject: true },
      { name: 'Talha Javed', stack: 'Flutter', completion: 100, testScore: 93, idVerified: true, hasLiveProject: true },
      { name: 'Bilal Ahmed', stack: 'Node.js', completion: 88, testScore: 62, idVerified: true, hasLiveProject: true },
    ],
  },
];

export function studentVerified(s: BatchStudent): boolean {
  return s.idVerified && (s.testScore ?? 0) >= 70 && s.hasLiveProject;
}
