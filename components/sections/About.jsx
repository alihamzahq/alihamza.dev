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

function GlobeIcon({ className }) {
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
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.97.633-3.792 1.708-5.274"
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
        <div className="mb-10">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {aboutContent.intro}
          </p>
        </div>

        {/* Highlights Card */}
        <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 p-8 mb-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Key Highlights
          </h3>
          <ul className="space-y-4">
            {aboutContent.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </span>
                <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Remote Work Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-8 shadow-lg">
          {/* Background pattern */}
          <div className="absolute inset-0 hero-grid opacity-20" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-shrink-0 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <GlobeIcon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                Open to Remote Opportunities
              </h3>
              <p className="text-white/90 mb-3 leading-relaxed">
                {aboutContent.remote}
              </p>
              <div className="flex items-center gap-2 text-white/80">
                <MapPinIcon className="w-4 h-4" />
                <span className="text-sm">Based in {personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
