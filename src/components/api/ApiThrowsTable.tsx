import { ApiThrowsTableProps } from './ApiThrowsTableProps';

export function ApiThrowsTable({ exceptions }: ApiThrowsTableProps) {
  if (!exceptions || exceptions.length === 0) return null;

  return (
    <div className="my-4">
      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
        Exceptions
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            <tr>
              <th className="py-2.5 px-3.5 w-1/3">Exception</th>
              <th className="py-2.5 px-3.5 w-2/3">Condition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 bg-white dark:bg-slate-950">
            {exceptions.map((ex, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                <td className="py-2.5 px-3.5 font-mono text-rose-600 dark:text-rose-400 font-medium">
                  {ex.type}
                </td>
                <td className="py-2.5 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ex.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
