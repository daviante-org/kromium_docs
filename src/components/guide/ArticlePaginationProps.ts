import { ArticlePaginationItem } from './ArticlePaginationItem';

export interface ArticlePaginationProps {
  previous?: ArticlePaginationItem | null;
  next?: ArticlePaginationItem | null;
  onNavigate?: (path: string) => void;
}
