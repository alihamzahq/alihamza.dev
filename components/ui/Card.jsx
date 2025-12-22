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

// Project Card Component
export function ProjectCard({ title, description, stack, github, demo, problem }) {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex flex-col h-full">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
          {description}
        </p>

        {/* Problem Solved */}
        {problem && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <span className="font-medium">Key value:</span> {problem}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-slate-700">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
              Code
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Experience Card Component
export function ExperienceCard({ company, role, period, location, highlights }) {
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-slate-700 last:pb-0">
      {/* Timeline dot */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-white dark:border-slate-900" />

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {role}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {company}
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>{period}</p>
            {location && <p>{location}</p>}
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-2">
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
              <span>{highlight}</span>
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
      className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm ${
        hoverable ? 'hover:shadow-md transition-shadow duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
