// "On this page" navigation for long articles. Plain anchor links and a native <details>
// disclosure (no client JavaScript); each heading has a matching id and a scroll margin that
// clears the fixed site header.
//
// Small screens get a collapsed disclosure so a long list does not push the article down;
// from the `sm` breakpoint up the list is always open. Only one of the two is displayed at a
// time (the other is display:none), so assistive technology sees a single navigation landmark.
const boxClass =
  'rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50';
const labelClass =
  'text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400';

function TocList({ items }) {
  return (
    <ol className="list-decimal pl-5 marker:text-gray-400 dark:marker:text-gray-500">
      {items.map((item) => (
        <li key={item.id} className="pl-1">
          <a
            href={`#${item.id}`}
            className="block py-1.5 text-[0.95rem] leading-snug font-medium text-indigo-700 dark:text-indigo-300 hover:underline underline-offset-4"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function ArticleToc({ items }) {
  return (
    <>
      {/* Phones: collapsed by default */}
      <nav aria-label="On this page" className="mb-10 sm:hidden">
        <details className={`group ${boxClass}`}>
          <summary
            className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 [&::-webkit-details-marker]:hidden ${labelClass}`}
          >
            On this page
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4 transition-transform group-open:rotate-180"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <div className="px-5 pb-4">
            <TocList items={items} />
          </div>
        </details>
      </nav>

      {/* Tablet and up: always open */}
      <nav aria-labelledby="toc-heading" className={`mb-12 hidden p-6 sm:block ${boxClass}`}>
        <p id="toc-heading" className={`mb-3 ${labelClass}`}>
          On this page
        </p>
        <TocList items={items} />
      </nav>
    </>
  );
}
