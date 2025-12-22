export default function SectionWrapper({
  children,
  id,
  className = '',
  containerClassName = '',
  alternate = false,
}) {
  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 ${
        alternate
          ? 'bg-gradient-to-b from-gray-50 via-slate-50 to-white dark:from-slate-800 dark:via-slate-850 dark:to-slate-900'
          : 'bg-white dark:bg-slate-900'
      } ${className}`}
    >
      {/* Subtle top border for alternating sections */}
      {alternate && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-slate-700 to-transparent" />
      )}

      <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>

      {/* Subtle bottom border for alternating sections */}
      {alternate && (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-slate-700 to-transparent" />
      )}
    </section>
  );
}

// Section heading component for consistent styling
export function SectionHeading({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
