'use client';

import { personalInfo, freelanceProfiles } from '@/lib/constants';

const PPH_ORANGE = '#f57c00';

function TopEndorsedBadge({ className, title }) {
  return (
    <svg
      viewBox="0 0 40 48"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Ribbon tails */}
      <polygon points="10,32 20,48 20,38" fill={PPH_ORANGE} />
      <polygon points="30,32 20,48 20,38" fill={PPH_ORANGE} />
      {/* Badge circle */}
      <circle cx="20" cy="20" r="18" fill="#2d9f93" />
      <circle cx="20" cy="20" r="14" fill="#3bb5a8" />
      {/* 5+ text */}
      <text
        x="20"
        y="24"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        5+
      </text>
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

export default function PphWidget() {
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
            <TopEndorsedBadge className="w-4 h-5 flex-shrink-0 cursor-help" title="Top Endorsed" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight mt-0.5">
            PHP Laravel Developer
          </p>
          <p className="text-xs leading-tight mt-0.5" style={{ color: '#2d9f93' }}>
            Top Endorsed
          </p>
        </div>
      </div>

      {/* CTA button */}
      <div className="px-3 pb-3">
        <a
          href={freelanceProfiles.pph.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2 rounded text-white font-bold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: PPH_ORANGE }}
        >
          Hire me on <span className="font-extrabold">peopleperhour</span>
        </a>
      </div>
    </div>
  );
}
