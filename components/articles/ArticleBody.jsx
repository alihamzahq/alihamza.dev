// Renders an article's `content` blocks (see lib/articles.js) as semantic HTML.
// Server component: no client-side JavaScript. Headings get anchor ids so sections can be linked.
import Inline from '@/components/ui/RichText';
import ComparisonTable from '@/components/ui/ComparisonTable';

const prose = 'text-base sm:text-lg leading-8 text-gray-700 dark:text-gray-300';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function Block({ block, index }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          id={slugify(block.text)}
          className="mt-14 mb-1 scroll-mt-24 border-t border-gray-200 dark:border-slate-700 pt-10 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-balance"
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          id={slugify(block.text)}
          className="mt-8 mb-0 scroll-mt-24 text-xl font-bold text-gray-900 dark:text-white text-balance"
        >
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p className={prose}>
          <Inline text={block.text} />
        </p>
      );
    case 'list':
      return (
        <ul
          className={`list-disc space-y-3 pl-6 marker:text-indigo-500 dark:marker:text-indigo-400 ${prose}`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol
          className={`list-decimal space-y-3 pl-6 marker:font-semibold marker:text-indigo-600 dark:marker:text-indigo-400 ${prose}`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              <Inline text={item} />
            </li>
          ))}
        </ol>
      );
    case 'table':
      return block.compact ? (
        <ComparisonTable id={`article-table-${index}`} minWidthClass="min-w-[18rem]" {...block} />
      ) : (
        <ComparisonTable id={`article-table-${index}`} {...block} />
      );
    case 'code': {
      const label = block.label ? `${block.label} (${block.language} example)` : `${block.language} example`;
      return (
        <figure className="my-2">
          {block.label && (
            <figcaption className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {block.label}
            </figcaption>
          )}
          {/* Focusable scroll region so long lines stay reachable by keyboard on small screens */}
          <div
            role="region"
            aria-label={label}
            tabIndex={0}
            className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900 dark:bg-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <pre className="m-0 p-4 text-sm leading-6 text-slate-100">
              <code className={`language-${block.language} font-mono`}>{block.code}</code>
            </pre>
          </div>
        </figure>
      );
    }
    case 'callout':
      return (
        <p className="my-2 rounded-r-xl border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 px-5 py-4 text-lg sm:text-xl font-semibold leading-snug text-indigo-900 dark:text-indigo-100 text-balance">
          <Inline text={block.text} />
        </p>
      );
    case 'note':
      return (
        <p className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-6 text-sm italic leading-relaxed text-gray-500 dark:text-gray-400">
          <Inline text={block.text} />
        </p>
      );
    default:
      return null;
  }
}

export default function ArticleBody({ content }) {
  return (
    <div className="space-y-6 [overflow-wrap:anywhere] sm:[overflow-wrap:normal]">
      {content.map((block, index) => (
        <Block key={index} block={block} index={index} />
      ))}
    </div>
  );
}
