import SectionWrapper, { SectionHeading } from '@/components/ui/SectionWrapper';
import { SkillCategory } from '@/components/ui/SkillBadge';
import { skills } from '@/lib/data';
import { skillCategories } from '@/lib/constants';

export default function Skills() {
  return (
    <SectionWrapper id="skills" alternate>
      <SectionHeading
        title="Skills & Technologies"
        subtitle="Technologies I work with to build robust applications"
      />

      <div className="max-w-4xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, skillList]) => (
            <div
              key={category}
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6"
            >
              <SkillCategory
                title={skillCategories[category] || category}
                skills={skillList}
                category={category}
              />
            </div>
          ))}
        </div>

        {/* Additional context */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I continuously explore new technologies and leverage AI tools to enhance productivity
            and deliver high-quality solutions faster. My toolkit evolves with the industry while
            maintaining strong fundamentals in software architecture and best practices.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
