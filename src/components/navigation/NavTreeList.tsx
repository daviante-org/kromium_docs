import { useMemo, useState } from 'react';
import { NavNode } from '../../types/NavNode';
import { NavTreeListProps } from './NavTreeListProps';
import { NavTreeNode } from './NavTreeNode';

export function NavTreeList({
  items,
  activePath,
  onSelect,
  filterText,
}: NavTreeListProps) {
  // Find which top-level node contains or matches the active path
  const activeTopNodeId = useMemo(() => {
    for (const item of items) {
      if (item.path === activePath) return item.id;
      if (item.children && item.children.length > 0) {
        const containsActive = item.children.some(
          (c) => c.path === activePath || (c.children && c.children.some((cc) => cc.path === activePath))
        );
        if (containsActive) return item.id;
      }
    }
    return null;
  }, [items, activePath]);

  // Keep only the active package/option open, all non-active collapsed
  const [expandedId, setExpandedId] = useState<string | null>(activeTopNodeId);
  const [prevActivePath, setPrevActivePath] = useState(activePath);

  if (prevActivePath !== activePath) {
    setPrevActivePath(activePath);
    if (activeTopNodeId) {
      setExpandedId(activeTopNodeId);
    } else if (
      activePath === '/api' ||
      activePath === '/api/overview' ||
      activePath === '/api/kromium-api' ||
      activePath === '/' ||
      activePath === '/home'
    ) {
      // On overview or home, no individual package is active, so collapse all
      setExpandedId(null);
    }
  }

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredItems = useMemo(() => {
    if (!filterText?.trim()) return items;

    const lower = filterText.toLowerCase();

    const filterNode = (node: NavNode): NavNode | null => {
      const titleMatch = node.title.toLowerCase().includes(lower);
      const descMatch = node.description?.toLowerCase().includes(lower);

      let matchedChildren: NavNode[] = [];
      if (node.children && node.children.length > 0) {
        matchedChildren = node.children
          .map(filterNode)
          .filter((n): n is NavNode => n !== null);
      }

      if (titleMatch || descMatch || matchedChildren.length > 0) {
        return {
          ...node,
          children: matchedChildren.length > 0 ? matchedChildren : node.children,
        };
      }

      return null;
    };

    return items
      .map(filterNode)
      .filter((n): n is NavNode => n !== null);
  }, [items, filterText]);

  if (filteredItems.length === 0) {
    return (
      <div className="py-6 px-4 text-center text-xs text-[var(--ms-text-subtle)]">
        No topics found matching &quot;{filterText}&quot;
      </div>
    );
  }

  return (
    <>
      {filteredItems.map((item) => {
        // If searching with filterText, expand all matches; otherwise, only keep active option open
        const isItemExpanded = Boolean(filterText?.trim()) || expandedId === item.id;

        return (
          <NavTreeNode
            key={item.id}
            node={item}
            activePath={activePath}
            onSelect={onSelect}
            filterText={filterText}
            depth={0}
            isExpanded={isItemExpanded}
            onToggle={() => handleToggle(item.id)}
          />
        );
      })}
    </>
  );
}
