import SectionWrapper, { SectionHeading } from '@/components/ui/SectionWrapper';
import { skills } from '@/lib/data';
import { skillCategories } from '@/lib/constants';

// Icon components for each category
function BackendIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
    </svg>
  );
}

function FrontendIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function DatabaseIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  );
}

function DevOpsIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  );
}

function AIIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

const categoryConfig = {
  backend: {
    icon: BackendIcon,
    gradient: 'from-indigo-500 to-indigo-600',
    shadow: 'shadow-indigo-500/25',
  },
  frontend: {
    icon: FrontendIcon,
    gradient: 'from-cyan-500 to-cyan-600',
    shadow: 'shadow-cyan-500/25',
  },
  database: {
    icon: DatabaseIcon,
    gradient: 'from-emerald-500 to-emerald-600',
    shadow: 'shadow-emerald-500/25',
  },
  devops: {
    icon: DevOpsIcon,
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/25',
  },
  ai: {
    icon: AIIcon,
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/25',
  },
};

function SkillCard({ category, skillList }) {
  const config = categoryConfig[category] || categoryConfig.backend;
  const Icon = config.icon;
  const title = skillCategories[category] || category;

  return (
    <div className="group relative bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg ${config.shadow}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {skillList.map((skill) => (
          <span
            key={skill}
            className={`skill-tag-${category} px-3 py-1.5 rounded-lg text-sm font-medium transition-transform duration-200 hover:scale-105`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills" alternate>
      <SectionHeading
        title="Skills & Technologies"
        subtitle="Technologies I work with to build robust applications"
      />

      <div className="max-w-5xl mx-auto">
        {/* Main skills grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, skillList]) => (
            <SkillCard
              key={category}
              category={category}
              skillList={skillList}
            />
          ))}
        </div>

        {/* Additional context */}
        <div className="mt-14">
          <div className="relative bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 p-8 text-center overflow-hidden">
            {/* Gradient accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              I continuously explore new technologies and leverage AI tools to enhance productivity
              and deliver high-quality solutions faster. My toolkit evolves with the industry while
              maintaining strong fundamentals in software architecture and best practices.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
