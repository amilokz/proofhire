'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getJSON, setJSON } from '../lib/storage';
import { Lang, translate } from '../lib/i18n';

interface AppCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  t: (key: string) => string;
}

const Ctx = createContext<AppCtx>({
  lang: 'en',
  setLang: () => {},
  theme: 'dark',
  toggleTheme: () => {},
  t: (k) => k,
});

export function useApp(): AppCtx {
  return useContext(Ctx);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    setLangState(getJSON<Lang>('proofhire-lang', 'en'));
    const th = getJSON<'dark' | 'light'>('proofhire-theme', 'dark');
    setThemeState(th);
    document.documentElement.classList.toggle('dark', th === 'dark');
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setJSON('proofhire-lang', l);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setJSON('proofhire-theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  const value = useMemo(
    () => ({ lang, setLang, theme, toggleTheme, t }),
    [lang, setLang, theme, toggleTheme, t]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
