import { TocHeading } from './TocHeading';

export interface RightTableOfContentsProps {
  headings: TocHeading[];
  activeHeadingId: string;
  sourceUrl?: string;
  rawMarkdownUrl?: string;
  onNavigateHeading?: (id: string) => void;
}
