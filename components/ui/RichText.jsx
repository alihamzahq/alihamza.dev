import Link from 'next/link';

// Inline markup allowed in guide and article text:
//   [label](https://…)  external link (opens in a new tab; only https is rendered)
//   [label](/path)      internal link (client-side navigation, same tab)
//   `code`              an identifier or short snippet
//   **bold**            strong emphasis
//   *italic*            a term or light emphasis
// Anything else is plain text. Server component: no client-side JavaScript.
const inlinePattern = /(\[[^\]]+\]\((?:https:\/\/|\/)[^)\s]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;

const linkClass =
  'font-medium text-indigo-600 dark:text-indigo-400 underline decoration-indigo-300 dark:decoration-indigo-700 underline-offset-4 hover:decoration-current';

export default function Inline({ text }) {
  return text.split(inlinePattern).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(((?:https:\/\/|\/)[^)\s]+)\)$/);
    if (link) {
      if (link[2].startsWith('/')) {
        return (
          <Link key={i} href={link[2]} className={linkClass}>
            {link[1]}
          </Link>
        );
      }
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {link[1]}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }
    if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded bg-gray-100 dark:bg-slate-700 px-1 py-0.5 text-[0.85em] text-gray-800 dark:text-gray-100"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-gray-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
