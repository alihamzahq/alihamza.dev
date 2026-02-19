'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

const PPH_IFRAME_BASE = 'https://www.peopleperhour.com/hire/widget/2785742855/3227504';

export default function PphWidget() {
  const { theme, mounted } = useTheme();
  const [iframeSrc, setIframeSrc] = useState(null);

  useEffect(() => {
    if (!mounted) return;

    const widgetTheme = theme === 'dark' ? 'dark' : 'light';
    const host = encodeURIComponent(window.location.host);
    const src = `${PPH_IFRAME_BASE}?width=245&height=320&orientation=vertical&theme=${widgetTheme}&u=${host}`;
    setIframeSrc(src);
  }, [theme, mounted]);

  if (!mounted || !iframeSrc) {
    // SSR/hydration placeholder matching widget dimensions
    return (
      <div
        className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 animate-pulse"
        style={{ width: '245px', height: '320px' }}
      />
    );
  }

  return (
    <iframe
      key={iframeSrc}
      src={iframeSrc}
      width="245"
      height="320"
      frameBorder="0"
      scrolling="no"
      allowTransparency="true"
      style={{ border: 0, overflow: 'hidden' }}
      title="PeoplePerHour Profile Widget"
    />
  );
}
