import { useState } from 'react';
import { CodeTabsProps } from './CodeTabsProps';
import { CodeBlock } from './CodeBlock';
import { cn } from '../../utils/cn';

export function CodeTabs({
  tabs,
  defaultTabId,
  className,
}: CodeTabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || (tabs && tabs.length > 0 ? tabs[0].id : '')
  );

  if (!tabs || tabs.length === 0) return null;

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const title =
    activeTab.label.toLowerCase() === (activeTab.language || '').toLowerCase()
      ? activeTab.label
      : `${activeTab.label} (${activeTab.language})`;

  return (
    <div className={cn('my-4', className)}>
      {/* Framework / Language Tab Bar matching API Reference page design */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          marginBottom: '1rem',
          borderBottom: '1px solid var(--ms-border)',
          paddingBottom: '0.35rem',
        }}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTabId(tab.id)}
              className={cn('ms-nav-tab', isActive && 'active')}
              style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.82rem',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Code Block matching standard Microsoft Learn design */}
      <CodeBlock
        code={activeTab.code}
        language={activeTab.language}
        title={title}
      />
    </div>
  );
}

