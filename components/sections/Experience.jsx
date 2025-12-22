import SectionWrapper, { SectionHeading } from '@/components/ui/SectionWrapper';
import { ExperienceCard } from '@/components/ui/Card';
import { experience, education } from '@/lib/data';

function AcademicCapIcon({ className }) {
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
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
      />
    </svg>
  );
}

export default function Experience() {
  return (
    <SectionWrapper id="experience" alternate>
      <SectionHeading
        title="Professional Experience"
        subtitle="My journey building products and leading teams"
      />

      <div className="max-w-4xl mx-auto">
        {/* Experience Timeline */}
        <div className="mb-16">
          {experience.map((exp) => (
            <ExperienceCard key={`${exp.company}-${exp.period}`} {...exp} />
          ))}
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <AcademicCapIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            Education
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {edu.degree}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                  {edu.institution}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
