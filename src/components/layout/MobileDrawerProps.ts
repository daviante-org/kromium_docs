import { NavNode } from '../../types/NavNode';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavNode[];
  activePath: string;
  onSelectPath: (path: string) => void;
}
