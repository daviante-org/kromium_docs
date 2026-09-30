import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { SearchModalProps } from './SearchModalProps';
import { SearchResultsList } from './SearchResultsList';

export function SearchModal({
  isOpen,
  query,
  onQueryChange,
  results,
  isSearching,
  onClose,
  onSelect,
}: SearchModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevResults, setPrevResults] = useState(results);
  const inputRef = useRef<HTMLInputElement>(null);

  if (prevResults !== results) {
    setPrevResults(results);
    setSelectedIndex(0);
  }

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        onSelect(results[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-10">
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search classes, methods, guides (e.g. KromiumBrowser, fill, compose)..."
            className="w-full py-3.5 text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {isSearching && (
            <Loader2 className="w-4 h-4 text-brand-500 animate-spin flex-shrink-0 mr-2" />
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {results.length > 0 ? (
          <SearchResultsList
            results={results}
            selectedIndex={selectedIndex}
            onSelect={onSelect}
          />
        ) : query.trim() ? (
          <div className="py-12 text-center text-xs text-slate-400">
            {!isSearching && `No results found for "${query}"`}
          </div>
        ) : (
          <div className="py-8 px-4 text-xs text-slate-400 dark:text-slate-500 text-center">
            Type a query or press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">ESC</kbd> to exit.
          </div>
        )}

        <div className="flex items-center justify-between px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/50 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">↑</kbd>{' '}
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">↵</kbd> to select
            </span>
          </div>
          <span>Kromium Search</span>
        </div>
      </div>
    </div>
  );
}
