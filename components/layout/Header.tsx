import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { LocaleSelect } from '@/components/common/LocaleSelect';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useCollection } from '@/contexts/CollectionContext';
import { useLocalization } from '@/contexts/LocalizationContext';

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? 'bg-poke-blue text-white shadow-lg shadow-poke-blue/30'
      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800'
  }`;

export const Header = () => {
  const { t } = useLocalization();
  const { collection } = useCollection();

  const collectionCount = useMemo(
    () => collection.reduce((sum, item) => sum + item.quantity, 0),
    [collection],
  );

  return (
    <header className="bg-white/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3 text-xl font-black text-poke-blue dark:text-poke-yellow">
            <span role="img" aria-hidden className="text-3xl">
              ⚡
            </span>
            POKECOST
          </NavLink>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-2">
          <NavLink to="/" className={navLinkClassName} end>
            {t('home')}
          </NavLink>
          <NavLink to="/collection" className={navLinkClassName}>
            <span className="flex items-center gap-2">
              {t('myCollection')}
              <span className="rounded-full bg-poke-blue/15 px-2 py-0.5 text-xs font-semibold text-poke-blue dark:bg-poke-yellow/20 dark:text-poke-yellow">
                {collectionCount}
              </span>
            </span>
          </NavLink>
        </nav>
        <div className="flex items-center justify-center gap-3">
          <LocaleSelect />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
