import { useState } from 'react';
import { Info, ChevronLeft, ChevronRight, Copy, Check, BookOpen, ArrowRight } from 'lucide-react';
import { ApiClassViewProps } from './ApiClassViewProps';
import { useVersion } from '../../hooks/useVersion';
import { CodeBlock } from '../common/CodeBlock';
import { cn } from '../../utils/cn';

export function ApiClassView({
  symbol,
  previousSymbol,
  nextSymbol,
  onNavigate,
}: ApiClassViewProps) {
  const { currentVersion } = useVersion();
  const [copiedDecl, setCopiedDecl] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<string>(() => {
    return symbol.frameworkExamples && symbol.frameworkExamples.length > 0
      ? symbol.frameworkExamples[0].framework
      : 'Compose Multiplatform';
  });

  const handleCopyDeclaration = async () => {
    try {
      await navigator.clipboard.writeText(symbol.declaration);
      setCopiedDecl(true);
      setTimeout(() => setCopiedDecl(false), 2000);
    } catch (err) {
      console.error('Failed to copy declaration:', err);
    }
  };

  const activeExample =
    symbol.frameworkExamples?.find((ex) => ex.framework === selectedFramework) ||
    symbol.frameworkExamples?.[0];

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
        <button
          type="button"
          onClick={() => onNavigate('/api/kromium-api')}
          title="Go to API Reference"
        >
          API Reference
        </button>
        <span className="ms-breadcrumbs-sep">/</span>
        <button
          type="button"
          onClick={() => onNavigate('/api/kromium-api')}
          title={`Go to ${symbol.category}`}
        >
          {symbol.category}
        </button>
        <span className="ms-breadcrumbs-sep">/</span>
        <span className="ms-breadcrumbs-current">{symbol.name}</span>
      </nav>

      {/* Main Title Header */}
      <h1 className="ms-article-h1">{symbol.name}</h1>

      {/* Metadata Badges Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          margin: '0.25rem 0 1rem 0',
          fontSize: '0.8rem',
          color: 'var(--ms-text-secondary)',
        }}
      >
        <span>
          Package: <code style={{ color: 'var(--ms-text)' }}>{symbol.package || 'dev.daviante'}</code>
        </span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span>
          Module: <code style={{ color: 'var(--ms-text)' }}>{symbol.module}</code>
        </span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span>
          Category: <span style={{ color: 'var(--ms-text)', fontWeight: 500 }}>{symbol.category}</span>
        </span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span>
          Applies to: <code style={{ color: 'var(--ms-blue)', fontWeight: 600 }}>{currentVersion}</code>
        </span>
        {symbol.since && (
          <>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>
              Since: <code style={{ color: 'var(--ms-text)' }}>{symbol.since}</code>
            </span>
          </>
        )}
        {symbol.deprecated && (
          <>
            <span style={{ opacity: 0.4 }}>•</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.1rem 0.4rem',
                borderRadius: '3px',
                background: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--ms-red, #ef4444)',
                fontWeight: 600,
                fontSize: '0.72rem',
              }}
            >
              Deprecated
            </span>
          </>
        )}
      </div>

      {/* Syntax Declaration Box */}
      <div
        id="definition"
        className="ms-api-declaration-box"
        style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}
      >
        <code style={{ flex: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {symbol.declaration}
        </code>
        <button
          type="button"
          onClick={handleCopyDeclaration}
          className="ms-code-copy-btn"
          style={{ flexShrink: 0 }}
          title="Copy declaration syntax"
          aria-label="Copy declaration syntax"
        >
          {copiedDecl ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 opacity-70" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Primary Description */}
      <p className="ms-article-p">{symbol.description}</p>

      {/* When to use Callout Box */}
      {symbol.whenToUse && (
        <div id="when-to-use" className="ms-alert ms-alert-tip">
          <div className="ms-alert-header">
            <Info className="w-4 h-4 text-[var(--ms-tip-icon)]" />
            <span>When to use</span>
          </div>
          <div className="ms-alert-content">{symbol.whenToUse}</div>
        </div>
      )}

      {/* Configuration Options Section */}
      {symbol.options && symbol.options.length > 0 && (
        <>
          <h2 id="configuration-options" className="ms-article-h2">
            Configuration Options
          </h2>
          <div className="ms-table-wrapper">
            <table className="ms-table ms-options-table">
              <thead>
                <tr>
                  <th style={{ width: '18%' }}>Option</th>
                  <th style={{ width: '22%' }}>Type</th>
                  <th style={{ width: '15%' }}>Default</th>
                  <th>Meaning &amp; Usage</th>
                </tr>
              </thead>
              <tbody>
                {symbol.options.map((opt, idx) => (
                  <tr key={`${opt.name}-${idx}`} id={`option-${opt.name}`}>
                    <td>
                      <code>{opt.name}</code>
                    </td>
                    <td>
                      <code>{opt.type}</code>
                    </td>
                    <td>
                      <code>{opt.defaultValue || '—'}</code>
                    </td>
                    <td>
                      <div style={{ color: 'var(--ms-text)' }}>{opt.meaning}</div>
                      {opt.howToUse && (
                        <div
                          style={{
                            marginTop: '0.25rem',
                            fontSize: '0.8rem',
                            color: 'var(--ms-text-secondary)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {opt.howToUse}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Properties Section */}
      {symbol.properties && symbol.properties.length > 0 && (
        <>
          <h2 id="properties" className="ms-article-h2">
            Properties
          </h2>
          <div className="ms-table-wrapper">
            <table className="ms-table ms-properties-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Name</th>
                  <th style={{ width: '25%' }}>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {symbol.properties.map((prop, idx) => (
                  <tr key={`${prop.name}-${idx}`} id={`prop-${prop.name}`}>
                    <td>
                      <code>{prop.name}</code>
                    </td>
                    <td>
                      <code>{prop.type}</code>
                    </td>
                    <td style={{ color: 'var(--ms-text)' }}>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Methods Section */}
      {symbol.methods && symbol.methods.length > 0 && (
        <>
          <h2 id="methods" className="ms-article-h2">
            Methods
          </h2>
          <div className="ms-table-wrapper">
            <table className="ms-table ms-methods-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Method</th>
                  <th style={{ width: '28%' }}>Signature</th>
                  <th style={{ width: '15%' }}>Returns</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {symbol.methods.map((m, idx) => (
                  <tr key={`${m.name}-${idx}`} id={`method-${m.name}-${idx}`}>
                    <td>
                      <code style={{ fontWeight: 600 }}>{m.name}()</code>
                      {m.isSuspend && (
                        <span
                          style={{
                            marginLeft: '0.4rem',
                            fontSize: '0.72rem',
                            color: 'var(--ms-blue)',
                            fontWeight: 600,
                          }}
                        >
                          suspend
                        </span>
                      )}
                    </td>
                    <td>
                      <code>{m.signature}</code>
                    </td>
                    <td>
                      <code>{m.returns || 'Unit'}</code>
                    </td>
                    <td>
                      <div style={{ color: 'var(--ms-text)' }}>{m.description}</div>
                      {m.throws && m.throws.length > 0 && (
                        <div
                          style={{
                            marginTop: '0.35rem',
                            fontSize: '0.78rem',
                            color: 'var(--ms-warning-icon)',
                          }}
                        >
                          Throws:{' '}
                          {m.throws.map((t) => (
                            <code key={t} style={{ marginRight: '0.3rem' }}>
                              {t}
                            </code>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Exceptions Section */}
      {symbol.exceptions && symbol.exceptions.length > 0 && (
        <>
          <h2 id="exceptions" className="ms-article-h2">
            Exceptions
          </h2>
          <div className="ms-table-wrapper">
            <table className="ms-table ms-exceptions-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Exception</th>
                  <th>Condition</th>
                  <th style={{ width: '30%' }}>Recovery</th>
                </tr>
              </thead>
              <tbody>
                {symbol.exceptions.map((ex, idx) => (
                  <tr key={`${ex.name}-${idx}`} id={`exception-${ex.name}`}>
                    <td>
                      <code>{ex.name}</code>
                    </td>
                    <td style={{ color: 'var(--ms-text)' }}>{ex.whenThrown}</td>
                    <td style={{ color: 'var(--ms-text-secondary)' }}>{ex.recovery || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* States & Variants Section */}
      {symbol.variants && symbol.variants.length > 0 && (
        <>
          <h2 id="states-and-variants" className="ms-article-h2">
            States &amp; Variants
          </h2>
          <div className="ms-table-wrapper">
            <table className="ms-table ms-variants-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Variant</th>
                  <th style={{ width: '35%' }}>Declaration</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {symbol.variants.map((v, idx) => (
                  <tr key={`${v.name}-${idx}`} id={`variant-${v.name}`}>
                    <td>
                      <code>{v.name}</code>
                    </td>
                    <td>
                      <code>{v.declaration}</code>
                    </td>
                    <td style={{ color: 'var(--ms-text)' }}>{v.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Examples Section */}
      {symbol.frameworkExamples && symbol.frameworkExamples.length > 0 && (
        <>
          <h2 id="examples" className="ms-article-h2">
            Examples
          </h2>

          {/* Framework Tab Bar */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              marginBottom: '1rem',
              borderBottom: '1px solid var(--ms-border)',
              paddingBottom: '0.35rem',
            }}
          >
            {symbol.frameworkExamples.map((ex) => (
              <button
                key={ex.framework}
                type="button"
                onClick={() => setSelectedFramework(ex.framework)}
                className={cn('ms-nav-tab', selectedFramework === ex.framework && 'active')}
                style={{
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.82rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {ex.framework}
              </button>
            ))}
          </div>

          {activeExample && (
            <CodeBlock
              code={activeExample.code}
              language={activeExample.lang}
              title={`${activeExample.framework} (${activeExample.lang})`}
            />
          )}
        </>
      )}

      {/* Version History Section */}
      {symbol.versionHistory && symbol.versionHistory.length > 0 && (
        <>
          <h2 id="version-history" className="ms-article-h2">
            Version History
          </h2>
          <div className="ms-table-wrapper">
            <table className="ms-table">
              <thead>
                <tr>
                  <th style={{ width: '24%' }}>Version</th>
                  <th style={{ width: '18%' }}>Release Date</th>
                  <th>Changes &amp; Historical Notes</th>
                </tr>
              </thead>
              <tbody>
                {symbol.versionHistory.map((item, idx) => (
                  <tr key={item.version || idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <code>{item.version}</code>
                        {item.version === currentVersion && (
                          <span
                            className="ms-brand-badge"
                            style={{ margin: 0, padding: '0.05rem 0.35rem', fontSize: '0.68rem' }}
                          >
                            current
                          </span>
                        )}
                        {item.breaking && (
                          <span
                            style={{
                              fontSize: '0.68rem',
                              padding: '0.05rem 0.35rem',
                              borderRadius: '2px',
                              background: 'rgba(239, 68, 68, 0.1)',
                              color: 'var(--ms-red, #ef4444)',
                              fontWeight: 600,
                            }}
                          >
                            breaking
                          </span>
                        )}
                        {item.deprecated && (
                          <span
                            style={{
                              fontSize: '0.68rem',
                              padding: '0.05rem 0.35rem',
                              borderRadius: '2px',
                              background: 'rgba(245, 158, 11, 0.1)',
                              color: 'var(--ms-warning-icon, #f59e0b)',
                              fontWeight: 600,
                            }}
                          >
                            deprecated
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: 'var(--ms-text-secondary)' }}>
                        {item.date || '—'}
                      </span>
                    </td>
                    <td>
                      {item.description && (
                        <div style={{ color: 'var(--ms-text)', marginBottom: item.changes && item.changes.length > 0 ? '0.4rem' : 0 }}>
                          {item.description}
                        </div>
                      )}
                      {item.changes && item.changes.length > 0 && (
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--ms-text-secondary)' }}>
                          {item.changes.map((change, cIdx) => (
                            <li key={cIdx}>{change}</li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {/* Related Guides Cross-Links */}
      {(() => {
        const GUIDE_CROSS_LINKS: Record<string, Array<{ title: string; path: string; description: string }>> = {
          'kromium': [{ title: '5-Minute Quickstart', path: '/guides/quickstart', description: 'Create your first browser instance' }],
          'kromium-engine': [{ title: '5-Minute Quickstart', path: '/guides/quickstart', description: 'Engine lifecycle and initialization' }],
          'kromium-browser': [{ title: '5-Minute Quickstart', path: '/guides/quickstart', description: 'Browser creation and navigation' }],
          'kromium-client': [{ title: '5-Minute Quickstart', path: '/guides/quickstart', description: 'Client session management' }],
          'kromium-ui-framework': [
            { title: 'Desktop UI Integrations', path: '/guides/ui-frameworks', description: 'Embed in Compose, Swing, JavaFX, SWT, AWT' },
            { title: 'Sample Applications & Reference Code', path: '/guides/sample-applications', description: 'Explore official desktop sample apps' }
          ],
          'kromium-view': [
            { title: 'Desktop UI Integrations', path: '/guides/ui-frameworks', description: 'Compose KromiumView component' },
            { title: 'Sample Applications & Reference Code', path: '/guides/sample-applications', description: 'Compose desktop sample app' }
          ],
          'kromium-render-surface': [{ title: 'Desktop UI Integrations', path: '/guides/ui-frameworks', description: 'OSR rendering surface' }],
          'kromium-automation': [
            { title: 'Web Automation & DOM API', path: '/guides/automation', description: 'Waiting, form filling, and DOM extraction' },
            { title: 'PDF Export & Print API', path: '/guides/pdf-export', description: 'Export pages to PDF' },
            { title: 'Sample Applications & Reference Code', path: '/guides/sample-applications', description: 'Automation feature samples' }
          ],
          'kromium-js-bridge': [
            { title: 'Web Automation & DOM API', path: '/guides/automation', description: 'JavaScript evaluation and bridging' },
            { title: 'DevTools, Search & JS Bridge', path: '/guides/devtools-search', description: 'Execute JavaScript and extract content' }
          ],
          'kromium-proxy': [{ title: 'Enterprise Networking & Proxies', path: '/guides/proxy-configuration', description: 'HTTP, SOCKS5, PAC proxy configuration' }],
          'kromium-proxy-manager': [{ title: 'Enterprise Networking & Proxies', path: '/guides/proxy-configuration', description: 'Dynamic runtime proxy switching' }],
          'kromium-security': [{ title: 'Downloads & Security API', path: '/guides/security-sandboxing', description: 'SSL policies and host locking' }],
          'ssl-error-policy': [{ title: 'Downloads & Security API', path: '/guides/security-sandboxing', description: 'SSL certificate policies' }],
          'kromium-permission-listener': [{ title: 'Downloads & Security API', path: '/guides/security-sandboxing', description: 'Camera, microphone permissions' }],
          'kromium-downloads': [{ title: 'Downloads & Security API', path: '/guides/security-sandboxing', description: 'File download management' }],
          'kromium-engine-download-config': [{ title: 'Cloudflare R2 Repository', path: '/guides/r2-maven-repository', description: 'Maven repository setup' }],
          'kromium-cookie-manager': [{ title: 'Cookie & Storage Management', path: '/guides/cookie-storage', description: 'Cookie CRUD operations' }],
          'kromium-cookie': [{ title: 'Cookie & Storage Management', path: '/guides/cookie-storage', description: 'Cookie data structure' }],
          'kromium-storage': [{ title: 'Cookie & Storage Management', path: '/guides/cookie-storage', description: 'Browser storage facade' }],
          'kromium-custom-scheme': [{ title: 'Custom Protocol Schemes', path: '/guides/custom-schemes', description: 'Register custom protocols' }],
          'kromium-scheme-handler': [{ title: 'Custom Protocol Schemes', path: '/guides/custom-schemes', description: 'Serve assets from classpath or directory' }],
          'kromium-asset-handler': [{ title: 'Custom Protocol Schemes', path: '/guides/custom-schemes', description: 'Handle intercepted asset requests' }],
          'kromium-asset-request': [{ title: 'Custom Protocol Schemes', path: '/guides/custom-schemes', description: 'Virtual HTTP request' }],
          'kromium-asset-response': [{ title: 'Custom Protocol Schemes', path: '/guides/custom-schemes', description: 'Virtual HTTP response' }],
          'kromium-pdf-settings': [{ title: 'PDF Export & Print API', path: '/guides/pdf-export', description: 'PDF configuration settings' }],
          'kromium-paper-size': [{ title: 'PDF Export & Print API', path: '/guides/pdf-export', description: 'Standard paper dimensions' }],
          'kromium-pdf-margins': [{ title: 'PDF Export & Print API', path: '/guides/pdf-export', description: 'PDF page margins' }],
          'kromium-context-menu-listener': [{ title: 'Context Menu Customization', path: '/guides/context-menus', description: 'Preset and custom menus' }],
          'kromium-menu-builder': [{ title: 'Context Menu Customization', path: '/guides/context-menus', description: 'Declarative menu builder DSL' }],
          'kromium-context-menu-context': [{ title: 'Context Menu Customization', path: '/guides/context-menus', description: 'Click context and helpers' }],
          'kromium-context-menu-params': [{ title: 'Context Menu Customization', path: '/guides/context-menus', description: 'Target URLs, selections, media' }],
          'kromium-exception': [
            { title: 'Error Handling & Debugging', path: '/guides/error-handling', description: 'Sealed exception hierarchy' },
            { title: 'Troubleshooting & FAQ', path: '/guides/troubleshooting-faq', description: 'JVM module, GPU, and platform issues' }
          ],
          'kromium-error-code': [{ title: 'Error Handling & Debugging', path: '/guides/error-handling', description: 'Standardized error codes' }],
          'kromium-console-message': [
            { title: 'Error Handling & Debugging', path: '/guides/error-handling', description: 'Console message monitoring' },
            { title: 'DevTools, Search & JS Bridge', path: '/guides/devtools-search', description: 'Console output inspection' }
          ],
          'kromium-console-message-listener': [{ title: 'Error Handling & Debugging', path: '/guides/error-handling', description: 'Intercept console output' }],
          'kromium-load-error': [{ title: 'Error Handling & Debugging', path: '/guides/error-handling', description: 'Page load error detection' }],
          'kromium-load-error-listener': [{ title: 'Error Handling & Debugging', path: '/guides/error-handling', description: 'Navigation failure handling' }],
          'kromium-dev-tools': [{ title: 'DevTools, Search & JS Bridge', path: '/guides/devtools-search', description: 'Open/close Developer Tools' }],
          'kromium-search': [{ title: 'DevTools, Search & JS Bridge', path: '/guides/devtools-search', description: 'Find text on page' }],
          'kromium-gpu-mode': [
            { title: '5-Minute Quickstart', path: '/guides/quickstart', description: 'GPU rendering configuration' },
            { title: 'Troubleshooting & FAQ', path: '/guides/troubleshooting-faq', description: 'GPU device reset & VM software rendering' }
          ],
          'kromium-process-model': [
            { title: '5-Minute Quickstart', path: '/guides/quickstart', description: 'Process isolation model' },
            { title: 'Troubleshooting & FAQ', path: '/guides/troubleshooting-faq', description: 'Multi-process vs in-process compatibility' }
          ],
          'kromium-log-severity': [
            { title: '5-Minute Quickstart', path: '/guides/quickstart', description: 'Log verbosity configuration' },
            { title: 'Troubleshooting & FAQ', path: '/guides/troubleshooting-faq', description: 'Capturing Chromium diagnostic logs' }
          ],
          'kromium-logging-config': [
            { title: 'Troubleshooting & FAQ', path: '/guides/troubleshooting-faq', description: 'Diagnostic log file configuration' }
          ],
        };
        const relatedGuides = GUIDE_CROSS_LINKS[symbol.id];
        if (!relatedGuides || relatedGuides.length === 0) return null;
        return (
          <section id="related-guides" className="mt-10 pt-6" style={{ borderTop: '1px solid var(--ms-border)' }}>
            <h2 className="ms-article-h2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen className="w-4.5 h-4.5" style={{ color: 'var(--ms-blue)' }} />
              Related Guides
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
              {relatedGuides.map((guide) => (
                <button
                  key={guide.path}
                  type="button"
                  onClick={() => onNavigate(guide.path)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-brand-600 dark:text-brand-400 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-950/30 transition-all shadow-xs"
                  title={guide.description}
                >
                  <span>{guide.title}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          </section>
        );
      })()}

      <nav
        className={cn(
          'ms-pagination',
          !previousSymbol && 'only-next',
          !nextSymbol && 'only-prev'
        )}
      >
        {previousSymbol && (
          <button
            type="button"
            onClick={() => onNavigate(`/api/${previousSymbol.id}`)}
            className="ms-pagination-btn ms-pagination-prev"
            title={`Go to previous API: ${previousSymbol.name}`}
          >
            <ChevronLeft className="ms-pagination-icon w-4 h-4" />
            <div className="ms-pagination-content">
              <div className="ms-pagination-label">Previous API</div>
              <div className="ms-pagination-title">{previousSymbol.name}</div>
            </div>
          </button>
        )}

        {nextSymbol && (
          <button
            type="button"
            onClick={() => onNavigate(`/api/${nextSymbol.id}`)}
            className="ms-pagination-btn ms-pagination-next"
            title={`Go to next API: ${nextSymbol.name}`}
          >
            <div className="ms-pagination-content ms-pagination-content-right">
              <div className="ms-pagination-label">Next API</div>
              <div className="ms-pagination-title">{nextSymbol.name}</div>
            </div>
            <ChevronRight className="ms-pagination-icon w-4 h-4" />
          </button>
        )}
      </nav>
    </article>
  );
}
