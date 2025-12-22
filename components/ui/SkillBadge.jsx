const categoryStyles = {
  backend: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  frontend: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  database: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  devops: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  ai: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
};

export default function SkillBadge({ skill, category = 'default' }) {
  const style = categoryStyles[category] || categoryStyles.default;

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${style}`}
    >
      {skill}
    </span>
  );
}

// Skill Category Component
export function SkillCategory({ title, skills, category }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
