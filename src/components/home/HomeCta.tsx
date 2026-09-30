import { ArrowRight, BookOpen } from 'lucide-react';
import { HomeCtaProps } from './HomeCtaProps';

export function HomeCta({ onNavigate }: HomeCtaProps) {
  return (
    <section className="py-10 sm:py-12 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Ready to build your desktop browser experience?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Read the 5-minute quickstart guide and render your first web page in under 3 minutes with Compose Multiplatform or Java.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/guides/quickstart')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            <span>Build First Browser</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/api/kromium-api')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs shadow-2xs transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Browse API Reference</span>
          </button>
        </div>
      </div>
    </section>
  );
}
