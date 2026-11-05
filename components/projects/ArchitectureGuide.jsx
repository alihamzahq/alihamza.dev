// Renders a project's optional `guide` (see lib/data.js): a short, general educational
// section made of paragraphs, bullet lists, side-by-side lists, and one comparison table.
// Server component: plain semantic HTML, no client-side JavaScript.

import Inline from '@/components/ui/RichText';
import ComparisonTable from '@/components/ui/ComparisonTable';

const bodyText = 'text-gray-600 dark:text-gray-300 leading-relaxed';

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
