// Resolves the developer currently being viewed:
// a seed profile chosen from search, or the visitor's own built profile.
import { getJSON, setJSON } from './storage';
import { DevProfile } from './dev';
import { DEVELOPERS } from '../data/developers';
import { loadMyProfile } from './myprofile';

const VIEW_KEY = 'proofhire-view-dev';

export function setViewedDev(id: string | null): void {
  if (id) setJSON(VIEW_KEY, id);
  else {
    try {
      window.localStorage.removeItem('proofhire-' + VIEW_KEY);
    } catch { /* noop */ }
  }
}

export function getViewedId(): string | null {
  return getJSON<string | null>(VIEW_KEY, null);
}

/** Returns the dev to display, plus whether it is the visitor's own profile. */
export function getCurrentDev(): { dev: DevProfile | null; mine: boolean } {
  const id = getViewedId();
  if (id && id !== 'me') {
    const found = DEVELOPERS.find((d) => d.id === id) ?? null;
    return { dev: found, mine: false };
  }
  return { dev: loadMyProfile(), mine: true };
}
