import { NavNode } from '../../types/NavNode';

export interface LeftSidebarProps {
  items: NavNode[];
  activePath: string;
  onSelectPath: (path: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}
