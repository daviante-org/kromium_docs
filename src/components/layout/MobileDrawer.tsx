import { useState } from 'react';
import { X, Search, Home, BookOpen, Code, Sun, Moon, ExternalLink, Layers } from 'lucide-react';
import { MobileDrawerProps } from './MobileDrawerProps';
import { NavTreeList } from '../navigation/NavTreeList';
import { useVersion } from '../../hooks/useVersion';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';

export function MobileDrawer({
  isOpen,
  onClose,
  items,
  activePath,
  onSelectPath,
}: MobileDrawerProps) {
  const [filterText, setFilterText] = useState('');
  const { currentVersion } = useVersion();
  const { resolvedTheme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  const isHome = activePath === '/' || activePath === '/home';
  const isDocs = activePath.startsWith('/guides/');
  const isApi = activePath.startsWith('/api/');

  const handleNav = (path: string) => {
    onSelectPath(path);
    onClose();
  };

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
    <div className="ms-mobile-drawer-portal">
      <div className="ms-drawer-overlay" onClick={onClose} aria-hidden="true" />
      <aside
        className="ms-mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="ms-drawer-header">
          <div className="ms-drawer-brand">
            <img src="/assets/logo.svg" alt="Kromium" className="ms-brand-logo" />
            <span className="ms-brand-title">Kromium</span>
            <span className="ms-brand-badge">{currentVersion}</span>
          </div>
          <button
            type="button"
            className="ms-icon-button"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="ms-drawer-tabs">
          <button
            type="button"
            className={cn('ms-drawer-tab', isHome && 'active')}
            onClick={() => handleNav('/home')}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <button
            type="button"
            className={cn('ms-drawer-tab', isDocs && 'active')}
            onClick={() => handleNav('/guides/quickstart')}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Docs</span>
          </button>
          <button
            type="button"
            className={cn('ms-drawer-tab', isApi && 'active')}
            onClick={() => handleNav('/api/kromium-api')}
          >
            <Code className="w-3.5 h-3.5" />
            <span>API</span>
          </button>
        </div>

        <div className="ms-drawer-body">
          <div className="ms-sidebar-filter" style={{ padding: '0.25rem 0 0.75rem' }}>
            <div className="ms-filter-input-wrap">
              <input
                className="ms-filter-input"
                placeholder={isApi ? 'Filter API by name' : 'Filter documentation'}
                aria-label={isApi ? 'Filter APIs by name' : 'Filter documentation by title'}
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

          <nav className="ms-tree-list" aria-label={isApi ? 'API Table of Contents' : 'Documentation Directory'}>
            {isApi && !filterText && (
              <div className="ms-tree-group" style={{ marginBottom: '0.25rem' }}>
                <a
                  href="/api/kromium-api"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/api/kromium-api');
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
              onSelect={handleNav}
              filterText={filterText}
            />
          </nav>
        </div>

        <div className="ms-drawer-footer">
          <button
            type="button"
            className="ms-btn-secondary"
            style={{ width: '100%', justifyContent: 'center', height: '36px' }}
            onClick={toggleTheme}
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-600" />
            )}
            <span>
              {resolvedTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            </span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              fontSize: '0.78rem',
              color: 'var(--ms-text-secondary)',
              paddingTop: '0.5rem',
            }}
          >
            <a
              href="https://github.com/daviante-org/kromium"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--ms-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                textDecoration: 'none',
              }}
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <span>Apache 2.0</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
