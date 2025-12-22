export default function SectionWrapper({
  children,
  id,
  className = '',
  containerClassName = '',
  background = 'default',
}) {
  const backgroundStyles = {
    default: 'bg-background',
    surface: 'bg-gray-50 dark:bg-slate-800/50',
    accent: 'bg-blue-50 dark:bg-blue-950/20',
  };

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${backgroundStyles[background]} ${className}`}
    >
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}

// Section heading component for consistent styling
export function SectionHeading({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
