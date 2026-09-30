import { NavNode } from '../../types/NavNode';

export interface NavTreeListProps {
  items: NavNode[];
  activePath: string;
  onSelect: (path: string) => void;
  filterText: string;
}
