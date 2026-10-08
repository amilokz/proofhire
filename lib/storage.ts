// localStorage helpers. ALL keys prefixed with "proofhire-".
const PREFIX = 'proofhire-';

function key(name: string): string {
  return name.startsWith(PREFIX) ? name : PREFIX + name;
}

export function getJSON<T>(name: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = window.localStorage.getItem(key(name));
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setJSON(name: string, value: unknown): void {
  try {
    window.localStorage.setItem(key(name), JSON.stringify(value));
  } catch {
    /* storage unavailable — demo keeps working in memory */
  }
}

export function removeKey(name: string): void {
  try {
    window.localStorage.removeItem(key(name));
  } catch {
    /* noop */
  }
}

/** Remove every proofhire-* key. Used by "Reset demo data". */
export function clearAllDemoData(): void {
  try {
    const doomed: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX)) doomed.push(k);
    }
    doomed.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    /* noop */
  }
}
