import Link from 'next/link';
import { formatArticleDate, getReadingTime } from '@/lib/articles';

function ArrowRightIcon({ className }) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

// One article as a card. Used by the /articles listing and the homepage preview.
// `compact` hides the reading time to keep the homepage preview small.
// `featured` is the larger, more editorial treatment for the newest article on /articles.
export default function ArticleCard({ article, compact = false, featured = false }) {
  const href = `/articles/${article.slug}`;

  return (
    <article className={`group relative flex flex-col rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 shadow-sm transition-shadow duration-300 hover:shadow-xl ${
        featured ? 'border-l-4 border-l-indigo-500 p-6 sm:p-10' : 'p-5 sm:p-7'
      }`}>
      {featured && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Latest article
        </p>
      )}
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-800 dark:border-indigo-800/50 dark:bg-indigo-900/20 dark:text-indigo-200">
          {article.category}
        </span>
        <time dateTime={article.publishedAt} className="text-gray-500 dark:text-gray-400">
          {formatArticleDate(article.publishedAt)}
        </time>
        {!compact && (
          <span className="text-gray-500 dark:text-gray-400">
            {getReadingTime(article)} min read
          </span>
        )}
      </div>

      <h3
        className={`mb-3 font-bold leading-snug text-gray-900 dark:text-white text-balance transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 ${
          featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
        }`}
      >
        <Link href={href} className="hover:underline">
          {article.title}
        </Link>
      </h3>

      <p
        className={`mb-5 leading-relaxed text-gray-600 dark:text-gray-300 ${featured ? 'text-lg' : ''}`}
      >
        {article.description}
      </p>

      <div className="mt-auto">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 link-underline"
        >
          Read Article
          <ArrowRightIcon className="h-4 w-4" />
          <span className="sr-only">: {article.title}</span>
        </Link>
      </div>
    </article>
  );
}
