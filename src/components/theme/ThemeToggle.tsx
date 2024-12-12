import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2 p-2 bg-[rgb(var(--color-bg-secondary))] rounded-lg border border-[rgb(var(--color-border))]">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'light'
            ? 'bg-[rgb(var(--color-accent))] text-white'
            : 'hover:bg-[rgb(var(--color-bg-secondary))]'
        }`}
        aria-label="Tema Claro"
      >
        <Sun className="h-5 w-5" />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'dark'
            ? 'bg-[rgb(var(--color-accent))] text-white'
            : 'hover:bg-[rgb(var(--color-bg-secondary))]'
        }`}
        aria-label="Tema Escuro"
      >
        <Moon className="h-5 w-5" />
      </button>
      
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'system'
            ? 'bg-[rgb(var(--color-accent))] text-white'
            : 'hover:bg-[rgb(var(--color-bg-secondary))]'
        }`}
        aria-label="Tema do Sistema"
      >
        <Monitor className="h-5 w-5" />
      </button>
    </div>
  );
}