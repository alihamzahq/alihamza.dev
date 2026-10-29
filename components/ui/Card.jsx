import Image from 'next/image';
import Link from 'next/link';
import { projectLinkTypes, projectKinds } from '@/lib/constants';

function GitHubIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Cards list the first few technologies; the detail page shows the full stack.
const MAX_CARD_TAGS = 8;

const kindStyles = {
  commercial:
    'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:border-amber-800/50',
  personal:
    'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-800/50',
};

// Project Card Component
export function ProjectCard({
  slug,
  title,
  summary,
  stack,
  links = [],
  problem,
  coverImage,
  kind,
  featured = false,
  facts,
}) {
  const href = `/projects/${slug}`;
  const visibleStack = featured ? stack : stack.slice(0, MAX_CARD_TAGS);
  const hiddenCount = stack.length - visibleStack.length;

  return (
    <div
      className={`group relative flex flex-col bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden card-glow ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Cover Image (decorative: the title link below carries the name) */}
      {coverImage && (
        <Link href={href} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
          <div className="relative h-36 sm:h-44 md:h-48">
            <Image
              src={coverImage}
              alt=""
              fill
              sizes="(min-width: 768px) 512px, 100vw"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      )}

      <div
        className={`relative flex-1 p-4 sm:p-6 ${
          featured ? 'md:grid md:grid-cols-2 md:gap-x-10 md:p-8' : 'flex flex-col'
        }`}
      >
        <div>
          {/* Public-source vs private-source label */}
          <span
            className={`inline-flex items-center px-2.5 py-1 mb-3 text-xs font-semibold rounded-full border ${kindStyles[kind] || kindStyles.personal}`}
          >
            {projectKinds[kind] || projectKinds.personal}
          </span>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <Link href={href} className="hover:underline">
              {title}
            </Link>
          </h3>

          {/* Summary */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 sm:mb-4 leading-relaxed">
            {summary}
          </p>

          {/* Engineering evidence at a glance (featured card only) */}
          {featured && facts?.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-4 md:mb-0" aria-label="Engineering evidence">
              {facts.map((fact) => (
                <li
                  key={fact}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-800/50"
                >
                  <CheckIcon className="w-3.5 h-3.5" />
                  {fact}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={`flex flex-col ${featured ? '' : 'flex-1'}`}>
          {/* Problem Solved */}
          {problem && (
            <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                <span className="font-semibold">Key value:</span> {problem}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <ul className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5" aria-label="Technologies">
            {visibleStack.map((tech) => (
              <li
                key={tech}
                className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-slate-700/80 text-gray-600 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-slate-600"
              >
                {tech}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li className="px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                +{hiddenCount} more
              </li>
            )}
          </ul>

          {/* Links */}
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-gray-100 dark:border-slate-700/50">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors link-underline"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              View Details
              <span className="sr-only"> of {title}</span>
            </Link>
            {links.map((link) => {
              const Icon = projectLinkTypes[link.type].icon === 'github' ? GitHubIcon : ExternalLinkIcon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors link-underline"
                >
                  <Icon className="w-4 h-4" />
                  {projectLinkTypes[link.type].shortLabel}
                  <span className="sr-only"> for {title} (opens in a new tab)</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Experience Card Component
export function ExperienceCard({ company, role, period, location, highlights }) {
  return (
    <div className="relative pl-8 pb-10 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 timeline-gradient rounded-full" />

      {/* Timeline dot with glow */}
      <div className="absolute left-[-7px] top-1 w-4 h-4 bg-indigo-600 dark:bg-indigo-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg shadow-indigo-500/30" />

      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {role}
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
              {company}
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-right">
            <p className="font-medium">{period}</p>
            {location && <p>{location}</p>}
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-3">
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
            >
              <span className="text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0">
                <CheckIcon className="w-4 h-4" />
              </span>
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Generic Card Component
export default function Card({ children, className = '', hoverable = true }) {
  return (
    <div
      className={`bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm ${
        hoverable ? 'hover:shadow-lg transition-all duration-300 card-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
