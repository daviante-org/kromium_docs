import { ReactNode } from 'react';
import { NavNode } from '../../types/NavNode';
import { TocHeading } from './TocHeading';

export interface AppLayoutProps {
  children: ReactNode;
  navItems: NavNode[];
  activePath: string;
  onSelectPath: (path: string) => void;
  headings?: TocHeading[];
  activeHeadingId?: string;
  sourceUrl?: string;
  rawMarkdownUrl?: string;
}
