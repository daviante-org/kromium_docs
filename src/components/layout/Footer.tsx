import { Globe } from 'lucide-react';
import { FooterProps } from './FooterProps';

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <footer className="ms-footer" role="contentinfo">
      <div className="ms-footer-inner">
        <div className="ms-footer-locale flex items-center gap-2 text-[var(--ms-text-secondary)]">
          <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>English (United States)</span>
        </div>

        <div className="ms-footer-links">
          <a
            href="/guides/privacy-policy"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/guides/privacy-policy');
            }}
            className="ms-footer-link"
          >
            Privacy
          </a>
          <a
            href="/guides/terms-of-use"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/guides/terms-of-use');
            }}
            className="ms-footer-link"
          >
            Terms of Use
          </a>
          <a
            href="https://github.com/daviante-org/kromium"
            target="_blank"
            rel="noopener noreferrer"
            className="ms-footer-link"
          >
            GitHub
          </a>
          <a
            href="https://www.apache.org/licenses/LICENSE-2.0"
            target="_blank"
            rel="noopener noreferrer"
            className="ms-footer-link"
          >
            Apache 2.0 License
          </a>
          <span style={{ color: 'var(--ms-text-subtle)' }}>
            © 2026 Daviante Group. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
