import { CodeTabItem } from './CodeTabItem';

export interface CodeTabsProps {
  tabs: CodeTabItem[];
  defaultTabId?: string;
  className?: string;
}
