'use client';

import { useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'theme';

export function useTheme() {
  const [theme, setThemeState] = useState('system');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = useCallback(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((newTheme) => {
    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme;

    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setResolvedTheme(resolved);
  }, [getSystemTheme]);

  // Set theme and persist to localStorage
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'system';
    setThemeState(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);
  }, [applyTheme]);

  // Listen for system preference changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      applyTheme('system');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  return {
    theme,
    setTheme,
    resolvedTheme,
    mounted,
  };
}
