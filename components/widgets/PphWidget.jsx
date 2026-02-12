'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { freelanceProfiles } from '@/lib/constants';

const { certId, userId, width, height } = freelanceProfiles.pph;

export default function PphWidget() {
  const containerRef = useRef(null);
  const { theme, mounted } = useTheme();

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;

    // Clear any previous widget content
    container.innerHTML = '';

    // Create the pph-hireme div that the PPH script targets
    const pphDiv = document.createElement('div');
    pphDiv.id = 'pph-hireme';
    container.appendChild(pphDiv);

    // Create and inject the PPH script with current theme
    const script = document.createElement('script');
    const themeParam = theme === 'dark' ? 'dark' : 'light';
    script.src = `https://www.peopleperhour.com/hire/${certId}/${userId}.js?width=${width}&height=${height}&orientation=vertical&theme=${themeParam}&rnd=${parseInt(Math.random() * 10000, 10)}`;
    script.type = 'text/javascript';
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div
        className="bg-gray-100 dark:bg-slate-700 rounded-xl animate-pulse"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    );
  }

  return <div ref={containerRef} className="flex justify-center" />;
}
