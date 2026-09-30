import { BookOpen, Box, Terminal, FileCode, ChevronRight } from 'lucide-react';
import { SearchResultsListProps } from './SearchResultsListProps';
import { SearchResult } from '../../types/SearchResult';
import { ENTITY_KIND_CONFIGS } from '../../constants/ENTITY_KIND_CONFIGS';

export function SearchResultsList({
  results,
  selectedIndex,
  onSelect,
}: SearchResultsListProps) {
  if (results.length === 0) return null;

  const getResultIcon = (result: SearchResult) => {
    if (result.type === 'guide') {
      return <BookOpen className="w-4 h-4 text-brand-500" />;
    }
    if (result.type === 'module') {
      return <Box className="w-4 h-4 text-indigo-500" />;
    }
    if (result.type === 'method') {
      return <Terminal className="w-4 h-4 text-emerald-500" />;
    }
    if (result.type === 'property') {
      return <FileCode className="w-4 h-4 text-blue-500" />;
    }
    if (result.entityKind && ENTITY_KIND_CONFIGS[result.entityKind]) {
      const cfg = ENTITY_KIND_CONFIGS[result.entityKind];
      return (
        <span className={`w-4 h-4 rounded text-[10px] font-mono font-bold flex items-center justify-center border ${cfg.badgeClass}`}>
          {cfg.shortLabel}
        </span>
      );
    }
    return <FileCode className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="py-2 overflow-y-auto max-h-[60vh] divide-y divide-slate-100 dark:divide-slate-800/60">
      {results.map((item, idx) => {
        const isSelected = idx === selectedIndex;
        return (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className={`flex items-start gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
              isSelected
                ? 'bg-brand-50/80 dark:bg-brand-950/60 text-brand-900 dark:text-brand-100'
                : 'hover:bg-slate-50 dark:hover:bg-slate-900/60 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">{getResultIcon(item)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 font-mono">
                  {item.title}
                </span>
                {item.module && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                    {item.module}
                  </span>
                )}
                {item.type && (
                  <span className="text-[10px] capitalize text-slate-400">
                    {item.type}
                  </span>
                )}
              </div>
              {item.summary && (
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {item.summary}
                </p>
              )}
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 self-center opacity-0 group-hover:opacity-100" />
          </div>
        );
      })}
    </div>
  );
}
