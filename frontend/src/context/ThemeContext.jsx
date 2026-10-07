import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  NIGHT: 'night',
  SYSTEM: 'system',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('creovate_theme') || THEMES.DARK;
  });

  const [resolvedTheme, setResolvedTheme] = useState('dark');

  useEffect(() => {
    localStorage.setItem('creovate_theme', theme);

    const applyTheme = () => {
      let active = theme;
      if (theme === THEMES.SYSTEM) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        active = prefersDark ? 'dark' : 'light';
      }

      setResolvedTheme(active);

      // Remove previous theme classes
      document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-night', 'dark', 'light');
      document.body.classList.remove('theme-light', 'theme-dark', 'theme-night', 'dark', 'light');

      document.documentElement.setAttribute('data-theme', active);
      document.body.setAttribute('data-theme', active);

      // Add appropriate class
      if (active === 'light') {
        document.documentElement.classList.add('theme-light', 'light');
        document.body.classList.add('theme-light', 'light');
      } else if (active === 'night') {
        document.documentElement.classList.add('theme-night', 'dark');
        document.body.classList.add('theme-night', 'dark');
      } else {
        document.documentElement.classList.add('theme-dark', 'dark');
        document.body.classList.add('theme-dark', 'dark');
      }
    };

    applyTheme();

    // Listen for system preference change if in system mode
    if (theme === THEMES.SYSTEM) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
