import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArticlePaginationProps } from './ArticlePaginationProps';
import { cn } from '../../utils/cn';

export function ArticlePagination({
  previous,
  next,
  onNavigate,
}: ArticlePaginationProps) {
  if (!previous && !next) return null;

  return (
    <div
      className={cn(
        'ms-pagination',
        !previous && next && 'only-next',
        previous && !next && 'only-prev'
      )}
      aria-label="Article Pagination"
    >
      {previous && (
        <button
          id="docs-prev-btn"
          type="button"
          onClick={() => onNavigate && onNavigate(previous.path)}
          className="ms-pagination-btn ms-pagination-prev"
          title={`Previous: ${previous.title}`}
        >
          <ChevronLeft className="ms-pagination-icon w-4 h-4 shrink-0" aria-hidden="true" />
          <div className="ms-pagination-content">
            <div className="ms-pagination-label">Previous</div>
            <div className="ms-pagination-title">{previous.title}</div>
          </div>
        </button>
      )}

      {next && (
        <button
          id="docs-next-btn"
          type="button"
          onClick={() => onNavigate && onNavigate(next.path)}
          className="ms-pagination-btn ms-pagination-next"
          title={`Next: ${next.title}`}
        >
          <div className="ms-pagination-content ms-pagination-content-right">
            <div className="ms-pagination-label">Next</div>
            <div className="ms-pagination-title">{next.title}</div>
          </div>
          <ChevronRight className="ms-pagination-icon w-4 h-4 shrink-0" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
