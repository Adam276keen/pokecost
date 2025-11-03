import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span aria-hidden>{isDarkMode ? '🌙' : '☀️'}</span>
      <span className="hidden sm:inline">{isDarkMode ? 'Dark' : 'Light'}</span>
    </button>
  );
};
