import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      id="nav-theme-btn"
      type="button"
      onClick={toggleTheme}
      className="ms-icon-button"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600" aria-hidden="true" />
      )}
    </button>
  );
}
