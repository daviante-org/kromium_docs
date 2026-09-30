import { useState, MouseEvent } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { NavTreeNodeProps } from './NavTreeNodeProps';
import { cn } from '../../utils/cn';

export function NavTreeNode({
  node,
  activePath,
  onSelect,
  filterText = '',
  depth = 0,
  isExpanded: controlledExpanded,
  onToggle,
}: NavTreeNodeProps) {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isActive = activePath === node.path;
  const isDescendantActive = Boolean(
    hasChildren &&
      node.children?.some(
        (c) =>
          c.path === activePath ||
          (c.children && c.children.some((cc) => cc.path === activePath))
      )
  );

  const [userToggledExpanded, setUserToggledExpanded] = useState<boolean | null>(null);
  const [prevActivePath, setPrevActivePath] = useState(activePath);

  if (prevActivePath !== activePath) {
    setPrevActivePath(activePath);
    setUserToggledExpanded(null);
  }

  const isExpanded =
    controlledExpanded !== undefined
      ? controlledExpanded
      : filterText
      ? true
      : userToggledExpanded !== null
      ? userToggledExpanded
      : isDescendantActive;

  const handleGroupClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle();
    } else {
      setUserToggledExpanded(!isExpanded);
    }
  };

  const handleLinkClick = (e: MouseEvent) => {
    e.preventDefault();
    if (node.path) {
      onSelect(node.path);
    }
  };

  // If node has children, render as a tree group
  if (hasChildren) {
    const itemCount = node.children ? node.children.length : 0;
    const paddingLeft = depth > 0 ? `${depth * 1 + 1}rem` : '1rem';

    return (
      <div className="ms-tree-group">
        <button
          type="button"
          onClick={handleGroupClick}
          className="ms-tree-group-header"
          style={{ paddingLeft }}
          aria-expanded={isExpanded}
        >
          <span className="ms-tree-group-title">
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-70" aria-hidden="true" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-70" aria-hidden="true" />
            )}
            <span className="truncate">{node.title}</span>
          </span>
          {itemCount > 0 && (
            <span style={{ fontSize: '0.72rem', color: 'var(--ms-text-subtle)' }}>
              {itemCount}
            </span>
          )}
        </button>

        {isExpanded && (
          <ul className="ms-tree-items">
            {node.children!.map((child) => (
              <li key={child.id}>
                <NavTreeNode
                  node={child}
                  activePath={activePath}
                  onSelect={onSelect}
                  filterText={filterText}
                  depth={depth + 1}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Leaf node: render as a tree link
  const paddingLeft = depth > 1 ? `${(depth - 1) * 0.75 + 1.75}rem` : '1.75rem';

  return (
    <a
      href={node.path || '#'}
      onClick={handleLinkClick}
      style={{ paddingLeft }}
      className={cn('ms-tree-link', isActive && 'active')}
      title={node.title}
    >
      <span className="truncate block">{node.title}</span>
    </a>
  );
}
