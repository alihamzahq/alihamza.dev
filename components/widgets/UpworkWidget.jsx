'use client';

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

function UserIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function UpworkWidget() {
  return (
    <div
      className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 overflow-hidden"
      style={{ width: '245px' }}
    >
      {/* Profile section */}
      <div className="flex items-start gap-3 p-3">
        {/* Avatar placeholder */}
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-7 h-7 text-gray-400 dark:text-slate-500" />
        </div>

        {/* Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-gray-900 dark:text-white truncate">
              {personalInfo.name}
            </span>
            <UpworkLogo className="w-4 h-4 flex-shrink-0" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight mt-0.5">
            {personalInfo.title}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight mt-0.5">
            Available for hire
          </p>
        </div>
      </div>

      {/* CTA button */}
      <div className="px-3 pb-3">
        <a
          href={freelanceProfiles.upwork.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2 rounded text-white font-bold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: UPWORK_GREEN }}
        >
          Hire me on <span className="font-extrabold">upwork</span>
        </a>
      </div>
    </div>
  );
}
