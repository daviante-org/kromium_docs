import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Layers } from 'lucide-react';
import { useVersion } from '../../hooks/useVersion';

export function VersionPicker() {
  const { currentVersion, setVersion, versions } = useVersion();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeItem = versions.find((v) => v.version === currentVersion) || {
    version: currentVersion,
    name: currentVersion,
    isLatest: true,
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          <Layers className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 flex-shrink-0" />
          <span className="truncate">{activeItem.name}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-40 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Available Versions
          </div>
          {versions.map((ver) => {
            const isSelected = ver.version === currentVersion;
            return (
              <button
                key={ver.version}
                type="button"
                onClick={() => {
                  setVersion(ver.version);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-1.5 text-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-medium'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{ver.name}</span>
                  {ver.isLatest && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 font-mono">
                      latest
                    </span>
                  )}
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
