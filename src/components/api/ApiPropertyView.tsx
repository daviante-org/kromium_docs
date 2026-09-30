import { Hash } from 'lucide-react';
import { ApiPropertyViewProps } from './ApiPropertyViewProps';
import { Badge } from '../common/Badge';

export function ApiPropertyView({ property }: ApiPropertyViewProps) {
  const propertyId = property.id || `prop-${property.name}`;

  return (
    <div
      id={propertyId}
      className="scroll-mt-20 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
    >
      <div className="flex items-center gap-2 group flex-wrap">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
          {property.name}
        </h4>
        <a
          href={`#${propertyId}`}
          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-brand-600 transition-opacity"
          aria-label={`Link to property ${property.name}`}
        >
          <Hash className="w-3.5 h-3.5" />
        </a>

        <span className="text-xs font-mono text-brand-600 dark:text-brand-400 font-semibold px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/60 border border-brand-200/50 dark:border-brand-900/50">
          : {property.type}
        </span>

        {property.isReadOnly ? (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-mono font-medium">
            val (read-only)
          </span>
        ) : (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 font-mono font-medium border border-amber-200/50 dark:border-amber-900/50">
            var (read-write)
          </span>
        )}

        {property.isDeprecated && <Badge variant="deprecated" size="sm" />}
      </div>

      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {property.description || property.summary}
      </p>

      {property.defaultValue && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-400">Default:</span>
          <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200 text-[11px]">
            {property.defaultValue}
          </code>
        </div>
      )}
    </div>
  );
}
