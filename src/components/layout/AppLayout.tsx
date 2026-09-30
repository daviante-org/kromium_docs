import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AppLayoutProps } from './AppLayoutProps';
import { Header } from './Header';
import { LeftSidebar } from './LeftSidebar';
import { RightTableOfContents } from './RightTableOfContents';
import { Footer } from './Footer';
import { MobileDrawer } from './MobileDrawer';
import { SearchModal } from '../search/SearchModal';
import { useSearch } from '../../hooks/useSearch';
import { SearchResult } from '../../types/SearchResult';
import { cn } from '../../utils/cn';

export function AppLayout({
  children,
  navItems,
  activePath,
  onSelectPath,
  headings = [],
  activeHeadingId = '',
  sourceUrl,
  rawMarkdownUrl,
}: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    isOpen: isSearchOpen,
    setIsOpen: setIsSearchOpen,
    query: searchQuery,
    setQuery: setSearchQuery,
    results: searchResults,
    isSearching,
    close: closeSearch,
  } = useSearch();

  const handleSearchResultSelect = (result: SearchResult) => {
    closeSearch();
    onSelectPath(result.path);
  };

  const isHome = activePath === '/' || activePath === '/home';

  return (
    <div className="ms-layout-root">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        activePath={activePath}
        onNavigate={onSelectPath}
      />

      {isHome ? (
        <main className="flex-1 w-full min-h-0 overflow-y-auto">
          {children}
        </main>
      ) : (
        <div className="ms-layout-main">
          <div className="ms-doc-layout-wrapper">
            <div className={cn("ms-docs-layout", headings.length === 0 && "no-toc")}>
              <LeftSidebar
                items={navItems}
                activePath={activePath}
                onSelectPath={onSelectPath}
              />

              <main className="ms-doc-main-slot">
                <article className="ms-main-content">
                  {headings.length > 0 && (
                    <details className="ms-mobile-toc-accordion">
                      <summary className="ms-mobile-toc-summary">
                        <span>In this article</span>
                        <ChevronDown className="w-4 h-4 opacity-70" />
                      </summary>
                      <ul className="ms-mobile-toc-list">
                        {headings.map((h) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className={cn(
                                "ms-mobile-toc-link",
                                h.depth === 3 && "level-3"
                              )}
                              onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById(h.id);
                                if (el) {
                                  el.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                            >
                              {h.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                  {children}
                </article>
              </main>

              {headings.length > 0 && (
                <RightTableOfContents
                  headings={headings}
                  activeHeadingId={activeHeadingId}
                  sourceUrl={sourceUrl}
                  rawMarkdownUrl={rawMarkdownUrl}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer onNavigate={onSelectPath} />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navItems}
        activePath={activePath}
        onSelectPath={onSelectPath}
      />

      <SearchModal
        isOpen={isSearchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        results={searchResults}
        isSearching={isSearching}
        onClose={closeSearch}
        onSelect={handleSearchResultSelect}
      />
    </div>
  );
}
