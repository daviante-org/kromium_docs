import { Guide } from '../../types/Guide';

export interface GuideViewProps {
  guide: Guide;
  previous?: { title: string; path: string } | null;
  next?: { title: string; path: string } | null;
  onNavigate?: (path: string) => void;
}
