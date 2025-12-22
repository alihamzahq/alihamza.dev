import SectionWrapper, { SectionHeading } from '@/components/ui/SectionWrapper';
import { aboutContent } from '@/lib/data';
import { personalInfo } from '@/lib/constants';

function CheckIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}

function MapPinIcon({ className }) {
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
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        title="About Me"
        subtitle="Get to know my background and what drives me"
      />

      <div className="max-w-4xl mx-auto">
        {/* Introduction */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {aboutContent.intro}
          </p>
        </div>

        {/* Highlights */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Key Highlights
          </h3>
          <ul className="space-y-3">
            {aboutContent.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Remote Work */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <MapPinIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Open to Remote Opportunities
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {aboutContent.remote}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Based in {personalInfo.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
