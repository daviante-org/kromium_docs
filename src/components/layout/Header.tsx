import { Menu, Search } from 'lucide-react';
import { HeaderProps } from './HeaderProps';
import { ThemeToggle } from '../common/ThemeToggle';
import { GithubIcon } from '../common/GithubIcon';
import { useVersion } from '../../hooks/useVersion';
import { cn } from '../../utils/cn';

export function Header({
  onOpenSearch,
  onToggleMobileMenu,
  activePath = '',
  onNavigate,
}: HeaderProps) {
  const { currentVersion } = useVersion();
  const isHome = activePath === '/' || activePath === '/home';
  const isDocs = activePath.startsWith('/guides/');
  const isApi = activePath.startsWith('/api/');

  return (
    <header className="ms-header" role="banner">
      <div className="ms-header-inner">
        <div className="ms-header-left">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="ms-icon-button ms-header-menu-btn"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-4.5 h-4.5" />
          </button>

          <div
            onClick={() => onNavigate && onNavigate('/home')}
            className="ms-brand"
            role="button"
            tabIndex={0}
            aria-label="Kromium Home"
          >
            <img
              src="/assets/logo.svg"
              alt="Kromium Logo"
              className="ms-brand-logo"
            />
            <span className="ms-brand-title">Kromium</span>
            <span className="ms-brand-separator">|</span>
            <span className="ms-brand-subtitle">Learn</span>
            <span
              className="ms-brand-badge cursor-pointer"
              title="View Release & Version History"
            >
              <span className="ms-brand-badge-dot" aria-hidden="true" />
              {currentVersion}
            </span>
          </div>
        </div>

        {/* Main top navigation tabs (Centered on desktop) */}
        <nav className="ms-nav-tabs" role="navigation" aria-label="Main Navigation">
          <button
            id="nav-home-btn"
            type="button"
            onClick={() => onNavigate && onNavigate('/home')}
            className={cn("ms-nav-tab", isHome && "active")}
          >
            Home
          </button>
          <button
            id="nav-docs-btn"
            type="button"
            onClick={() => onNavigate && onNavigate('/guides/quickstart')}
            className={cn("ms-nav-tab", isDocs && "active")}
          >
            Documentation
          </button>
          <button
            id="nav-api-btn"
            type="button"
            onClick={() => onNavigate && onNavigate('/api/kromium-api')}
            className={cn("ms-nav-tab", isApi && "active")}
          >
            API Reference
          </button>
        </nav>

        <div className="ms-header-actions">
          {/* Desktop Search Trigger */}
          <button
            id="nav-search-btn"
            type="button"
            onClick={onOpenSearch}
            className="ms-search-trigger ms-search-desktop"
            aria-label="Search documentation (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 opacity-60" />
            <span>Search</span>
            <kbd className="ms-search-kbd">Ctrl+K</kbd>
          </button>

          {/* Mobile Search Trigger */}
          <button
            id="nav-search-mobile-btn"
            type="button"
            onClick={onOpenSearch}
            className="ms-icon-button ms-search-mobile-btn"
            aria-label="Search documentation"
            title="Search documentation (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          <a
            id="nav-llms-link"
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono font-medium rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            title="LLM-friendly documentation index (/llms.txt)"
          >
            <span>llms.txt</span>
          </a>

          <ThemeToggle />

          <a
            id="nav-github-link"
            href="https://github.com/daviante-org/kromium"
            target="_blank"
            rel="noopener noreferrer"
            className="ms-icon-button"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
