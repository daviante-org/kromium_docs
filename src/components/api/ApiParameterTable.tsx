import { ApiParameterTableProps } from './ApiParameterTableProps';

export function ApiParameterTable({ parameters }: ApiParameterTableProps) {
  if (!parameters || parameters.length === 0) return null;

  return (
    <div className="my-4">
      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
        Parameters
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            <tr>
              <th className="py-2.5 px-3.5 w-1/4">Name</th>
              <th className="py-2.5 px-3.5 w-1/4">Type</th>
              <th className="py-2.5 px-3.5 w-1/2">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 bg-white dark:bg-slate-950">
            {parameters.map((param) => (
              <tr key={param.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                <td className="py-2.5 px-3.5 font-mono font-semibold text-slate-900 dark:text-slate-100">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>{param.name}</span>
                    {param.optional && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-sans">
                        Optional
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2.5 px-3.5 font-mono text-brand-600 dark:text-brand-400 break-words">
                  {param.type}
                </td>
                <td className="py-2.5 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                  <div>{param.description}</div>
                  {param.defaultValue && (
                    <div className="mt-1 text-[11px] text-slate-400">
                      Default: <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-700 dark:text-slate-300">{param.defaultValue}</code>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
