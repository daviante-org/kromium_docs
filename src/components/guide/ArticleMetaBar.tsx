import { Clock } from 'lucide-react';
import { ArticleMetaBarProps } from './ArticleMetaBarProps';

export function ArticleMetaBar({
  date = '03/07/2026',
  readTime = '3 min to read',
  contributors = 'Daviante Group',
}: ArticleMetaBarProps) {
  return (
    <div className="ms-article-meta">
      {/* Details */}
      <div className="ms-meta-details">
        <span className="ms-meta-item">Article</span>
        <span className="ms-meta-dot">•</span>
        <span className="ms-meta-item">{date}</span>
        <span className="ms-meta-dot">•</span>
        <span className="ms-meta-item">
          <Clock className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
          <span>{readTime}</span>
        </span>
        <span className="ms-meta-dot">•</span>
        <span className="ms-meta-item">Contributors: {contributors}</span>
      </div>
    </div>
  );
}

