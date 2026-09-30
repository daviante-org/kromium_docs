import { BreadcrumbProps } from './BreadcrumbProps';

export function Breadcrumb({ items, onNavigate }: BreadcrumbProps) {
  return (
    <nav className="ms-breadcrumbs" aria-label="Breadcrumb">
      <button
        type="button"
        onClick={() => onNavigate && onNavigate('/home')}
        title="Go to Home"
      >
        Home
      </button>

      <span className="ms-breadcrumbs-sep">/</span>

      <button
        type="button"
        onClick={() => onNavigate && onNavigate('/guides/quickstart')}
        title="Go to Documentation Overview"
      >
        Docs
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            <span className="ms-breadcrumbs-sep">/</span>
            {isLast || !item.path ? (
              <span className="ms-breadcrumbs-current">{item.label}</span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate && item.path && onNavigate(item.path)}
                title={`Go to ${item.label}`}
              >
                {item.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}

