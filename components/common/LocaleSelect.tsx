import { LOCALES } from '@/constants';
import { useLocalization } from '@/contexts/LocalizationContext';

export const LocaleSelect = () => {
  const { locale, setLocale } = useLocalization();

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
      <span className="hidden sm:inline">🌐</span>
      <span className="sr-only sm:not-sr-only">Language</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 transition-colors hover:border-poke-blue focus:outline-none focus:ring-2 focus:ring-poke-blue/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
      >
        {Object.entries(LOCALES).map(([key, value]) => (
          <option key={key} value={key}>
            {value.name}
          </option>
        ))}
      </select>
    </label>
  );
};
