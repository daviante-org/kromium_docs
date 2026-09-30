import { Search, X } from 'lucide-react';
import { TocFilterInputProps } from './TocFilterInputProps';

export function TocFilterInput({
  value,
  onChange,
  placeholder = 'Filter by title...',
}: TocFilterInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-3.5 h-3.5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-100/80 dark:bg-slate-900 border border-transparent focus:border-brand-500 dark:focus:border-brand-500 rounded-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-950 transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          title="Clear filter"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
