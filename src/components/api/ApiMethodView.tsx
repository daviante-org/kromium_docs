import { Hash } from 'lucide-react';
import { ApiMethodViewProps } from './ApiMethodViewProps';
import { ApiSignature } from './ApiSignature';
import { ApiParameterTable } from './ApiParameterTable';
import { ApiThrowsTable } from './ApiThrowsTable';
import { CodeTabs } from '../common/CodeTabs';
import { Badge } from '../common/Badge';

export function ApiMethodView({ method }: ApiMethodViewProps) {
  return (
    <div
      id={method.id}
      className="scroll-mt-20 my-6 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 p-5 md:p-6 shadow-xs backdrop-blur-xs transition-colors hover:border-slate-300 dark:hover:border-slate-700"
    >
      <div className="flex items-center gap-2 group flex-wrap">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
          {method.name}()
        </h3>
        <a
          href={`#${method.id}`}
          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-brand-600 transition-opacity"
          aria-label={`Link to ${method.name}`}
        >
          <Hash className="w-4 h-4" />
        </a>

        {method.isSuspend && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800 font-mono">
            suspend
          </span>
        )}

        {method.isComposable && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/60 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800 font-mono">
            @Composable
          </span>
        )}

        {method.isDeprecated && <Badge variant="deprecated" size="sm" />}
      </div>

      <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {method.summary}
      </p>

      {method.deprecationNotice && (
        <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300">
          <strong className="font-semibold">Notice:</strong> {method.deprecationNotice}
        </div>
      )}

      {/* Syntax Signature */}
      <div className="mt-4">
        <ApiSignature signature={method.signature} />
      </div>

      {/* Parameters */}
      <ApiParameterTable parameters={method.parameters} />

      {/* Return Type */}
      {method.returnType && (
        <div className="my-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 text-[11px]">
            Returns
          </div>
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <code className="font-mono font-semibold px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-200/50 dark:border-brand-800/60">
              {method.returnType.type}
            </code>
            <span className="text-slate-600 dark:text-slate-300">
              {method.returnType.description}
            </span>
          </div>
        </div>
      )}

      {/* Exceptions */}
      {method.exceptions && method.exceptions.length > 0 && (
        <div className="my-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <ApiThrowsTable exceptions={method.exceptions} />
        </div>
      )}

      {/* Code Examples */}
      {method.examples && method.examples.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Example Usage
          </div>
          <CodeTabs
            tabs={method.examples.map((ex, i) => ({
              id: `${method.id}-ex-${i}`,
              label: ex.title || (ex.language === 'kotlin' ? 'Kotlin' : 'Java'),
              language: ex.language,
              code: ex.code,
            }))}
          />
        </div>
      )}
    </div>
  );
}
