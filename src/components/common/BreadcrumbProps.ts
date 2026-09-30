import { BreadcrumbItem } from './BreadcrumbItem';

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
}
