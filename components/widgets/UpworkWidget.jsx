'use client';

import { useTheme } from '@/hooks/useTheme';
import { personalInfo, freelanceProfiles } from '@/lib/constants';

const UPWORK_GREEN = '#14a800';

function UpworkLogo({ className }) {
  return (
    <svg
      viewBox="0 0 56.7 56.7"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M42.4,17.7c-5.3,0-9.3,3.5-10.9,9c-2.5-3.8-4.4-8.4-5.5-12.3h-5.6v15.5c0,2.9-2.4,5.3-5.3,5.3s-5.3-2.4-5.3-5.3V14.4H4.2v15.5c0,6,4.9,10.9,10.9,10.9s10.9-4.9,10.9-10.9v-2.6c1.1,2.2,2.4,4.5,4,6.5l-3.4,16h5.7l2.5-11.7c2.3,1.5,4.9,2.3,7.7,2.3c6.1,0,11.1-5,11.1-11.2C53.5,22.7,48.5,17.7,42.4,17.7z"
        fill={UPWORK_GREEN}
      />
    </svg>
  );
}

export default function UpworkWidget() {
  const { mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className="bg-gray-100 dark:bg-slate-700 rounded-xl animate-pulse"
        style={{ width: '245px', height: '320px' }}
      />
    );
  }

  return (
    <div
      className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col items-center justify-center p-6 shadow-sm"
      style={{ width: '245px', height: '320px' }}
    >
      <UpworkLogo className="w-16 h-16 mb-4" />

      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
        {personalInfo.name}
      </h4>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
        {personalInfo.title}
      </p>

      <a
        href={freelanceProfiles.upwork.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center py-2.5 px-4 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: UPWORK_GREEN }}
      >
        Hire Me on Upwork
      </a>
    </div>
  );
}
