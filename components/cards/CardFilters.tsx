import { useState } from 'react';
import type { CatalogFilters } from '@/hooks/usePokemonCatalog';
import { useLocalization } from '@/contexts/LocalizationContext';

interface CardFiltersProps {
  filters: CatalogFilters;
  availableSets: { id: string; name: string }[];
  rarities: string[];
  types: string[];
  onFiltersChange: (filters: Partial<CatalogFilters>) => void;
  onReset: () => void;
  isLoading: boolean;
}

export const CardFilters = ({
  filters,
  availableSets,
  rarities,
  types,
  onFiltersChange,
  onReset,
  isLoading,
}: CardFiltersProps) => {
  const { t } = useLocalization();
  const [searchValue, setSearchValue] = useState(filters.searchTerm);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFiltersChange({ searchTerm: searchValue });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">{t('search')}</span>
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder={t('searchByName')}
            className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-poke-blue/60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-poke-blue px-4 py-2 text-sm font-semibold text-white shadow shadow-poke-blue/30 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-poke-blue/60 dark:bg-poke-yellow dark:text-gray-900"
        >
          {t('search')}
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchValue('');
            onReset();
          }}
          className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {t('clearFilters')}
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {t('filterBySet')}
          <select
            value={filters.setId}
            onChange={(event) => onFiltersChange({ setId: event.target.value })}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-poke-blue/60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            disabled={isLoading}
          >
            <option value="">{t('allSets')}</option>
            {availableSets.map((set) => (
              <option key={set.id} value={set.id}>
                {set.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {t('filterByRarity')}
          <select
            value={filters.rarity}
            onChange={(event) => onFiltersChange({ rarity: event.target.value })}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-poke-blue/60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            disabled={isLoading}
          >
            <option value="">{t('allRarities')}</option>
            {rarities.map((rarity) => (
              <option key={rarity} value={rarity}>
                {rarity}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {t('filterByType')}
          <select
            value={filters.type}
            onChange={(event) => onFiltersChange({ type: event.target.value })}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-poke-blue/60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            disabled={isLoading}
          >
            <option value="">{t('allTypes')}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  );
};
