export interface HeaderProps {
  onOpenSearch: () => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  activePath?: string;
  onNavigate?: (path: string) => void;
}
