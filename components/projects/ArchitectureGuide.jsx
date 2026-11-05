// Renders a project's optional `guide` (see lib/data.js): a short, general educational
// section made of paragraphs, bullet lists, side-by-side lists, and one comparison table.
// Server component: plain semantic HTML, no client-side JavaScript.

const bodyText = 'text-gray-600 dark:text-gray-300 leading-relaxed';

// Inline markup allowed in any guide text: [label](https://…) for an external link and
// `code` for an identifier. Anything else is plain text. Only https links are rendered.
const inlinePattern = /(\[[^\]]+\]\(https:\/\/[^)\s]+\)|`[^`]+`)/g;

function Inline({ text }) {
  return text.split(inlinePattern).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\((https:\/\/[^)\s]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 dark:text-indigo-400 underline decoration-indigo-300 dark:decoration-indigo-700 underline-offset-4 hover:decoration-current"
        >
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
    return part;
  });
}

function BulletList({ label, items }) {
  return (
    <div>
      {label && (
        <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
      )}
      <ul
        className={`list-disc space-y-1.5 pl-5 marker:text-indigo-500 dark:marker:text-indigo-400 ${bodyText}`}
      >
        {items.map((item, i) => (
          <li key={i}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// A real <table>: caption, column headers, and row headers, so screen readers can announce
// each cell with its row and column. The wrapper scrolls sideways on narrow screens and is
// keyboard-focusable so the overflow stays reachable without a mouse.
function ComparisonTable({ id, caption, columns, rows }) {
  return (
    <div
      role="region"
      aria-labelledby={`${id}-caption`}
      tabIndex={0}
      className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <caption
          id={`${id}-caption`}
          className="bg-gray-50 dark:bg-slate-800 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
        >
          {caption}
        </caption>
        <thead>
          <tr className="border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 py-3 font-semibold text-gray-900 dark:text-white"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([concern, ...cells]) => (
            <tr key={concern} className="border-t border-gray-200 dark:border-slate-700 align-top">
              <th scope="row" className="w-1/4 px-4 py-3 font-semibold text-gray-900 dark:text-white">
                {concern}
              </th>
              {cells.map((cell, i) => (
                <td key={i} className={`px-4 py-3 ${bodyText}`}>
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block, id }) {
  switch (block.type) {
    case 'p':
      return (
        <p className={bodyText}>
          <Inline text={block.text} />
        </p>
      );
    case 'list':
      return <BulletList label={block.label} items={block.items} />;
    case 'columns':
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          {block.lists.map((list) => (
            <BulletList key={list.label} label={list.label} items={list.items} />
          ))}
        </div>
      );
    case 'table':
      return <ComparisonTable id={id} {...block} />;
    default:
      return null;
  }
}

export default function ArchitectureGuide({ guide }) {
  return (
    <div className="space-y-8">
      {guide.intro && (
        <p className={bodyText}>
          <Inline text={guide.intro} />
        </p>
      )}

      {guide.sections.map((section, sectionIndex) => {
        const headingId = `guide-heading-${sectionIndex}`;
        return (
          <section key={section.heading} aria-labelledby={headingId} className="space-y-4">
            <h3 id={headingId} className="text-base font-bold text-gray-900 dark:text-white">
              {section.heading}
            </h3>
            {section.blocks.map((block, blockIndex) => (
              <Block
                key={`${sectionIndex}-${blockIndex}`}
                block={block}
                id={`guide-${sectionIndex}-${blockIndex}`}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}
