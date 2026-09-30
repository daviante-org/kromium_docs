import { ArrowRight, Info, AlertTriangle, Lightbulb, BookOpen } from 'lucide-react';
import { GuideViewProps } from './GuideViewProps';
import { Breadcrumb } from '../common/Breadcrumb';
import { CodeBlock } from '../common/CodeBlock';
import { CodeTabs } from '../common/CodeTabs';
import { MarkdownContent } from '../common/MarkdownContent';
import { renderInline } from '../../utils/markdown';
import { ArticleMetaBar } from './ArticleMetaBar';
import { ArticlePagination } from './ArticlePagination';

export function GuideView({ guide, previous, next, onNavigate }: GuideViewProps) {
  const breadcrumbItems = [
    { label: guide.category || 'Guides', path: '/guides/quickstart' },
    { label: guide.title },
  ];

  return (
    <article className="ms-article">
      <Breadcrumb items={breadcrumbItems} onNavigate={onNavigate} />

      <h1 className="ms-article-h1">
        {guide.title}
      </h1>

      <ArticleMetaBar
        date={guide.lastUpdated}
        readTime={guide.readTime}
        contributors="Daviante Group"
      />

      <div className="ms-article-body">
        {guide.summary && (
          <p className="ms-article-p" style={{ marginBottom: '1.5rem' }}>
            {renderInline(guide.summary)}
          </p>
        )}

        <div className="space-y-8">
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="ms-article-h2">
                {section.title}
              </h2>

              <MarkdownContent content={section.content} />

              {section.callout && (
                <div className={`ms-alert ms-alert-${section.callout.type || 'note'}`}>
                  <div className="ms-alert-icon">
                    {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                    {section.callout.type === 'tip' && <Lightbulb className="w-4 h-4" />}
                    {section.callout.type === 'note' && <BookOpen className="w-4 h-4" />}
                    {(!section.callout.type || section.callout.type === 'info') && <Info className="w-4 h-4" />}
                  </div>
                  <div className="ms-alert-content">
                    {section.callout.title && <div className="ms-alert-title">{section.callout.title}</div>}
                    <div>{section.callout.message}</div>
                  </div>
                </div>
              )}


            {section.codeTabs && section.codeTabs.length > 0 && (
              <CodeTabs tabs={section.codeTabs} />
            )}

            {section.codeSnippet && !section.codeTabs && (
              <CodeBlock
                code={section.codeSnippet.code}
                language={section.codeSnippet.language}
                showLineNumbers
              />
            )}
          </section>
        ))}
      </div>

      {guide.relatedApis && guide.relatedApis.length > 0 && (
        <section className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
            Related API References
          </h3>
          <div className="flex flex-wrap gap-2">
            {guide.relatedApis.map((api) => (
              <button
                key={api.name}
                type="button"
                onClick={() => onNavigate && onNavigate(api.path)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono text-brand-600 dark:text-brand-400 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-950/30 transition-all shadow-xs"
              >
                <span>{api.name}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>
        </section>
      )}

      </div>

      {/* Bottom Article Pagination */}
      <ArticlePagination previous={previous} next={next} onNavigate={onNavigate} />
    </article>
  );
}

