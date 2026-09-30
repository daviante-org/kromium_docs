import { NavNode } from '../../types/NavNode';

export interface NavTreeNodeProps {
  node: NavNode;
  activePath: string;
  onSelect: (path: string) => void;
  filterText?: string;
  depth?: number;
  isExpanded?: boolean;
  onToggle?: () => void;
}
