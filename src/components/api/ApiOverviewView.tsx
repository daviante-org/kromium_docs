import { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { apiDataService } from '../../services/apiDataService';
import { ApiSymbol } from '../../types/ApiSymbol';
import { NavNode } from '../../types/NavNode';
import { useVersion } from '../../hooks/useVersion';
import { renderInline } from '../../utils/markdown';

interface ApiOverviewViewProps {
  onNavigate: (path: string) => void;
  navItems?: NavNode[];
}

export function ApiOverviewView({ onNavigate, navItems }: ApiOverviewViewProps) {
  const { currentVersion } = useVersion();
  const [symbols, setSymbols] = useState<ApiSymbol[]>([]);
  const [fetchedNavItems, setFetchedNavItems] = useState<NavNode[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  const effectiveNavItems = navItems && navItems.length > 0 ? navItems : fetchedNavItems;

  // Load Table of Contents if not passed or empty
  useEffect(() => {
    if (navItems && navItems.length > 0) return;

    let isCancelled = false;
    apiDataService
      .getTableOfContents(currentVersion)
      .then((data) => {
        if (!isCancelled) {
          setFetchedNavItems(data.items);
        }
      })
      .catch((err) => {
        console.error('Failed to load navigation TOC for overview:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, [currentVersion, navItems]);

  // Load symbols for rich descriptions
  useEffect(() => {
    let isCancelled = false;
    apiDataService
      .getApiSymbols(currentVersion)
      .then((data) => {
        if (!isCancelled) {
          setSymbols(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load API symbols for overview:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, [currentVersion]);

  // Lookup map for fast description and details retrieval
  const symbolMap = useMemo(() => {
    const map = new Map<string, ApiSymbol>();
    for (const sym of symbols) {
      map.set(sym.id.toLowerCase(), sym);
    }
    return map;
  }, [symbols]);

  // Extract API packages from TOC
  const packages = useMemo(() => {
    const apiGroup = effectiveNavItems.find((item) => item.id === 'api-reference-group');
    if (!apiGroup || !apiGroup.children) return [];
    return apiGroup.children.filter((child) => child.type === 'package');
  }, [effectiveNavItems]);

  // Total count of symbols across all packages
  const totalSymbolCount = useMemo(() => {
    let count = 0;
    for (const pkg of packages) {
      count += (pkg.children || []).filter((child) => child.type === 'entity').length;
    }
    return count;
  }, [packages]);

  // Filtered symbols across all packages when search text is entered
  const filteredItems = useMemo(() => {
    const query = filterText.trim().toLowerCase();
    if (!query) return [];

    const results: Array<{
      id: string;
      name: string;
      path: string;
      kind: string;
      description: string;
      packageTitle: string;
    }> = [];

    for (const pkg of packages) {
      const entities = (pkg.children || []).filter((child) => child.type === 'entity');
      for (const entity of entities) {
        const sym = symbolMap.get(entity.id.toLowerCase());
        const name = sym?.name || entity.title;
        const kind = entity.entityKind || sym?.kind || sym?.declaration?.split(' ')[0] || 'class';
        const description = sym?.description || (sym as any)?.summary || entity.description || '';

        if (
          name.toLowerCase().includes(query) ||
          kind.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          pkg.title.toLowerCase().includes(query)
        ) {
          results.push({
            id: entity.id,
            name,
            path: entity.path || `/api/${entity.id}`,
            kind,
            description,
            packageTitle: pkg.title,
          });
        }
      }
    }

    return results;
  }, [filterText, packages, symbolMap]);

  return (
    <article className="ms-article">
      {/* Breadcrumb Navigation */}
      <nav className="ms-breadcrumbs" aria-label="Breadcrumb">
        <button
          type="button"
          onClick={() => onNavigate('/home')}
          title="Go to Home"
        >
          Home
        </button>
        <span className="ms-breadcrumbs-sep">/</span>
        <span className="ms-breadcrumbs-current">API Reference</span>
      </nav>

      {/* Main Title */}
      <h1 className="ms-article-h1">Kromium API Reference</h1>

      {/* Version badge line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', margin: '0.25rem 0 1rem 0' }}>
        <span style={{ fontSize: '0.84rem', color: 'var(--ms-text-secondary)' }}>
          Showing specification for:
        </span>
        <span className="ms-api-meta-badge" style={{ fontWeight: 600, color: 'var(--ms-blue)' }}>
          {currentVersion}
        </span>
        <span style={{ fontSize: '0.84rem', color: 'var(--ms-text-subtle)' }}>
          • {totalSymbolCount || 81} APIs across {packages.length || 16} packages
        </span>
      </div>

      <p className="ms-article-p" style={{ marginBottom: '1.25rem' }}>
        Complete reference documentation for the Kromium SDK Kotlin classes, interfaces, configuration facades, and native Chromium bindings.
      </p>

      {/* Quick Search / Filter Bar */}
      <div className="relative mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-[var(--ms-text-subtle)] pointer-events-none" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter APIs by name, kind, package, or description..."
            className="w-full pl-9 pr-9 py-2 text-xs rounded border border-[var(--ms-border)] bg-[var(--ms-bg)] text-[var(--ms-text)] placeholder:text-[var(--ms-text-subtle)] focus:outline-none focus:border-[var(--ms-blue)] transition-colors"
          />
          {filterText && (
            <button
              type="button"
              onClick={() => setFilterText('')}
              className="absolute right-2.5 p-1 text-[var(--ms-text-subtle)] hover:text-[var(--ms-text)]"
              title="Clear filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filtered Search Results View */}
      {filterText.trim() !== '' ? (
        <div>
          <div className="text-xs text-[var(--ms-text-secondary)] mb-3 font-medium">
            Found {filteredItems.length} {filteredItems.length === 1 ? 'API' : 'APIs'} matching &ldquo;{filterText}&rdquo;
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-[var(--ms-text-subtle)]">
              No API symbols match your filter.
            </div>
          ) : (
            <div className="ms-table-wrapper">
              <table className="ms-table ms-overview-table">
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>Symbol</th>
                    <th style={{ width: '12%' }}>Kind</th>
                    <th style={{ width: '20%' }}>Package</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <a
                          href={item.path}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(item.path);
                          }}
                          style={{
                            fontWeight: 600,
                            color: 'var(--ms-blue)',
                            textDecoration: 'none',
                          }}
                          className="hover:underline"
                        >
                          {item.name}
                        </a>
                      </td>
                      <td>
                        <code className="ms-inline-code">{item.kind}</code>
                      </td>
                      <td style={{ color: 'var(--ms-text-secondary)', fontSize: '0.8rem' }}>
                        {item.packageTitle}
                      </td>
                      <td style={{ color: 'var(--ms-text)' }}>
                        {renderInline(item.description)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Package-grouped Default View */
        <div className="space-y-10">
          {packages.map((pkg) => {
            const entities = (pkg.children || []).filter((child) => child.type === 'entity');
            if (entities.length === 0) return null;

            return (
              <section key={pkg.id} id={pkg.id} className="scroll-mt-20">
                <h2 className="ms-article-h2 flex items-center justify-between">
                  <span>{pkg.title}</span>
                  <span className="text-[11px] font-normal text-[var(--ms-text-subtle)]">
                    {entities.length} {entities.length === 1 ? 'symbol' : 'symbols'}
                  </span>
                </h2>

                <div className="ms-table-wrapper">
                  <table className="ms-table ms-overview-table">
                    <thead>
                      <tr>
                        <th style={{ width: '25%' }}>Symbol</th>
                        <th style={{ width: '15%' }}>Kind</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entities.map((child) => {
                        const sym = symbolMap.get(child.id.toLowerCase());
                        const kind = child.entityKind || sym?.kind || sym?.declaration?.split(' ')[0] || 'class';
                        const description = sym?.description || (sym as any)?.summary || child.description || '';
                        const name = sym?.name || child.title;
                        const targetPath = child.path || `/api/${child.id}`;

                        return (
                          <tr key={child.id}>
                            <td>
                              <a
                                href={targetPath}
                                onClick={(e) => {
                                  e.preventDefault();
                                  onNavigate(targetPath);
                                }}
                                style={{
                                  fontWeight: 600,
                                  color: 'var(--ms-blue)',
                                  textDecoration: 'none',
                                }}
                                className="hover:underline"
                              >
                                {name}
                              </a>
                            </td>
                            <td>
                              <code className="ms-inline-code">{kind}</code>
                            </td>
                            <td style={{ color: 'var(--ms-text)' }}>
                              {renderInline(description)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </article>
  );
}
