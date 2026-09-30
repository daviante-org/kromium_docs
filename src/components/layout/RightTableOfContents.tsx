import { RightTableOfContentsProps } from './RightTableOfContentsProps';
import { cn } from '../../utils/cn';
import { ExternalLink, FileText } from 'lucide-react';

export function RightTableOfContents({
  headings,
  activeHeadingId,
  sourceUrl,
  rawMarkdownUrl,
  onNavigateHeading,
}: RightTableOfContentsProps) {
  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    if (onNavigateHeading) {
      onNavigateHeading(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside className="ms-toc-rail" aria-label="Table of contents">
      <div className="ms-toc-header">
        <h4 className="ms-toc-title">In this article</h4>
        <span className="ms-toc-badge">{headings.length}</span>
      </div>

      <div className="ms-toc-scrollable">
        <ul className="ms-toc-list">
          {headings.map((heading) => {
            const isActive = activeHeadingId === heading.id;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(heading.id);
                  }}
                  className={cn(
                    'ms-toc-link',
                    isActive && 'active',
                    heading.depth === 3 && 'level-3'
                  )}
                  title={heading.title}
                >
                  {heading.title}
                </a>
              </li>
            );
          })}
        </ul>

        {(sourceUrl || rawMarkdownUrl) && (
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {rawMarkdownUrl && (
              <a
                href={rawMarkdownUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                title="View pure LLM / agent markdown for this document"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>LLM / Raw Markdown</span>
              </a>
            )}
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                title="View source on GitHub"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Source on GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}


