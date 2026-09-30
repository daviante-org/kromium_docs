import { NavNodeType } from './NavNodeType';
import { EntityKind } from './EntityKind';

export interface NavNode {
  id: string;
  title: string;
  path: string;
  type: NavNodeType;
  entityKind?: EntityKind;
  module?: string;
  badge?: string;
  description?: string;
  children?: NavNode[];
}
