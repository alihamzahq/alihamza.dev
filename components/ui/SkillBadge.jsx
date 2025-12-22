const categoryStyles = {
  backend: 'skill-tag-backend',
  frontend: 'skill-tag-frontend',
  database: 'skill-tag-database',
  devops: 'skill-tag-devops',
  ai: 'skill-tag-ai',
  default: 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
};

export default function SkillBadge({ skill, category = 'default' }) {
  const style = categoryStyles[category] || categoryStyles.default;

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-transform duration-200 hover:scale-105 cursor-default ${style}`}
    >
      {skill}
    </span>
  );
}

// Skill Category Component
export function SkillCategory({ title, skills, category }) {
  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300 card-hover">
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} category={category} />
        ))}
      </div>
    </div>
  );
}
