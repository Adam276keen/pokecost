import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ThemeContextValue {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const STORAGE_KEY = 'pokecost-theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') {
      return true;
    }

    if (stored === 'light') {
      return false;
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const classList = document.documentElement.classList;
    if (isDarkMode) {
      classList.add('dark');
      window.localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      classList.remove('dark');
      window.localStorage.setItem(STORAGE_KEY, 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((value) => !value);

  const value = useMemo<ThemeContextValue>(() => ({
    isDarkMode,
    toggleDarkMode,
  }), [isDarkMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
