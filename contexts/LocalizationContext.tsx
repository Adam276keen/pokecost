import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LOCALES, TRANSLATIONS } from '@/constants';
import type { Locale, LocaleConfig } from '@/types';

interface LocalizationContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  formatCurrency: (price?: number) => string;
  localeConfig: LocaleConfig;
}

const STORAGE_KEY = 'pokecost-locale';

const LocalizationContext = createContext<LocalizationContextValue | undefined>(undefined);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored in LOCALES) {
      return stored as Locale;
    }

    return 'en';
  });

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const localeConfig = LOCALES[locale];

  const t = useCallback((key: string) => {
    const dictionary = TRANSLATIONS[locale];
    return dictionary?.[key] ?? key;
  }, [locale]);

  const formatCurrency = useCallback((price?: number) => {
    if (typeof price !== 'number') {
      return t('priceNotAvailable');
    }

    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: localeConfig.currency,
    };

    if (localeConfig.currency === 'JPY') {
      options.minimumFractionDigits = 0;
      options.maximumFractionDigits = 0;
    }

    return new Intl.NumberFormat(locale.replace('_', '-'), options).format(price * localeConfig.rate);
  }, [locale, localeConfig, t]);

  const value = useMemo<LocalizationContextValue>(() => ({
    locale,
    setLocale,
    t,
    formatCurrency,
    localeConfig,
  }), [locale, setLocale, t, formatCurrency, localeConfig]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextValue => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }

  return context;
};
