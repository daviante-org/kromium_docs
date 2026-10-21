import { useState } from 'react';
import { Search, ChevronDown, Layers } from 'lucide-react';
import { LeftSidebarProps } from './LeftSidebarProps';
import { NavTreeList } from '../navigation/NavTreeList';
import { useVersion } from '../../hooks/useVersion';
import { cn } from '../../utils/cn';

export function LeftSidebar({
  items,
  activePath,
  onSelectPath,
}: LeftSidebarProps) {
  const [filterText, setFilterText] = useState('');
  const { currentVersion, versions = [], setVersion } = useVersion();

  const isApi = activePath.startsWith('/api');

  // Partition items into API vs Guides
  const apiGroup = items.find((i) => i.id === 'api-reference-group');
  const guidesGroup = items.find((i) => i.id === 'guides-group');

  const displayedItems = isApi
    ? apiGroup?.children?.filter((c) => c.id !== 'all-apis-overview') || []
    : guidesGroup?.children || items;

  const isOverviewActive =
    activePath === '/api' ||
    activePath === '/api/overview' ||
    activePath === '/api/kromium-api';

  return (
    <aside className="ms-sidebar" aria-label="Documentation Sidebar">
      {/* Version filter dropdown */}
      <div className="ms-version-filter">
        <div className="ms-version-label">
          <span>Version</span>
          <span className="ms-version-badge">{isApi ? 'API' : 'DOCS'}</span>
        </div>
        <div className="ms-version-select-wrap">
          <select
            id="sidebar-version-select"
            className="ms-version-select"
            aria-label="Select version"
            value={currentVersion}
            onChange={(e) => setVersion && setVersion(e.target.value)}
          >
            {versions.length > 0 ? (
              versions.map((v) => (
                <option key={v.version} value={v.version}>
                  {v.version}{v.isLatest ? ' (Latest)' : v.name && v.name !== v.version ? ` (${v.name})` : ''}
                </option>
              ))
            ) : (
              <option value={currentVersion}>{currentVersion} (Major Release &amp; Latest)</option>
            )}
          </select>
          <ChevronDown className="ms-version-select-chevron w-3.5 h-3.5 pointer-events-none" />
        </div>
      </div>

      {/* Filter by search input */}
      <div className="ms-sidebar-filter">
        <div className="ms-filter-input-wrap">
          <input
            className="ms-filter-input"
            placeholder={isApi ? 'Filter API by name' : 'Filter by title'}
            aria-label={isApi ? 'Filter APIs by name' : 'Filter documentation pages by title'}
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <Search
            className="w-3.5 h-3.5 absolute right-2 opacity-45 pointer-events-none text-[var(--ms-text-subtle)]"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Tree list */}
      <nav className="ms-tree-list" aria-label={isApi ? 'API Table of Contents' : 'Table of Contents'}>
        {isApi && !filterText && (
          <div className="ms-tree-group" style={{ marginBottom: '0.25rem' }}>
            <a
              href="/api/kromium-api"
              onClick={(e) => {
                e.preventDefault();
                onSelectPath('/api/kromium-api');
              }}
              className={cn('ms-tree-link', isOverviewActive && 'active')}
              style={{ paddingLeft: '1rem', fontWeight: 500 }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Layers className="w-3.5 h-3.5 flex-shrink-0" />
                <span>All APIs Overview</span>
              </span>
            </a>
          </div>
        )}

        <NavTreeList
          items={displayedItems}
          activePath={activePath}
          onSelect={onSelectPath}
          filterText={filterText}
        />
      </nav>
    </aside>
  );
}
