'use client';

import { useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'theme';

export function useTheme() {
  const [theme, setThemeState] = useState(null); // null = not yet determined
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = useCallback(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Set theme and persist to localStorage
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme) {
      // User has a saved preference
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      // No saved preference - use system preference
      const systemTheme = getSystemTheme();
      setThemeState(systemTheme);
      applyTheme(systemTheme);
    }

    setMounted(true);
  }, [applyTheme, getSystemTheme]);

  // Listen for system preference changes (only if no saved preference)
  useEffect(() => {
    if (!mounted) return;

    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) return; // User has explicit preference, don't override

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setThemeState(newTheme);
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted, applyTheme]);

  return {
    theme: theme || 'light', // Fallback for SSR
    setTheme,
    mounted,
  };
}
