import { Search } from 'lucide-react';
import { SearchInputProps } from './SearchInputProps';

export function SearchInput({ onClick, className }: SearchInputProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between w-full max-w-sm px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-850 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${className || ''}`}
    >
      <div className="flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <span className="truncate">Search Kromium docs...</span>
      </div>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
