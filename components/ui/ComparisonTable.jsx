import Inline from '@/components/ui/RichText';

const bodyText = 'text-gray-600 dark:text-gray-300 leading-relaxed';

// A real <table>: caption, column headers, and row headers, so screen readers can announce
// each cell with its row and column. The wrapper scrolls sideways on narrow screens and is
// keyboard-focusable so the overflow stays reachable without a mouse.
// `minWidthClass` must be a literal Tailwind class so it is picked up at build time.
export default function ComparisonTable({
  id,
  caption,
  columns,
  rows,
  minWidthClass = 'min-w-[36rem]',
}) {
  return (
    <div
      role="region"
      aria-labelledby={`${id}-caption`}
      tabIndex={0}
      className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      <table className={`w-full ${minWidthClass} border-collapse text-left text-sm`}>
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
