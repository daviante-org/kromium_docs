import { ArrowRight, BookOpen, Layers, Monitor, Terminal, Shield, Code2 } from 'lucide-react';
import { HomeExploreDocsProps } from './HomeExploreDocsProps';

export function HomeExploreDocs({ onNavigate }: HomeExploreDocsProps) {
  const categories = [
    {
      icon: BookOpen,
      title: 'Get Started',
      description: 'System requirements, Gradle dependency setup, and your first Compose or Java desktop browser window.',
      links: [
        { label: '5-Minute Quickstart', path: '/guides/quickstart' },
        { label: 'Cloudflare R2 Repository', path: '/guides/r2-maven-repository' },
        { label: 'Desktop UI Integrations', path: '/guides/ui-frameworks' },
        { label: 'Architecture & Rendering Pipeline', path: '/guides/architecture' },
      ],
    },
    {
      icon: Layers,
      title: 'Compose Multiplatform',
      description: 'Reactive Compose Multiplatform desktop components, state synchronization, and loading overlays.',
      links: [
        { label: 'KromiumView Composable', path: '/api/kromium-view' },
        { label: 'KromiumViewState State Model', path: '/api/kromium-view-state' },
        { label: 'rememberKromiumState Composable', path: '/api/remember-kromium-state' },
        { label: 'Desktop UI Integrations (Compose)', path: '/guides/ui-frameworks' },
      ],
    },
    {
      icon: Monitor,
      title: 'Universal Java Desktop',
      description: 'Embed Kromium in Java Swing, Standard AWT, Eclipse SWT, or JavaFX with pure Java2D OSR.',
      links: [
        { label: 'Java Swing Integration (JPanel)', path: '/guides/ui-frameworks' },
        { label: 'Standard AWT Integration (Canvas)', path: '/guides/ui-frameworks' },
        { label: 'Eclipse SWT Canvas & Bridge', path: '/guides/ui-frameworks' },
        { label: 'JavaFX Embedded Browser (StackPane)', path: '/guides/ui-frameworks' },
      ],
    },
    {
      icon: Terminal,
      title: 'Automation & Capabilities',
      description: 'Fluent web automation DSL, custom schemes (app://), asynchronous vector PDF export, and scripts.',
      links: [
        { label: 'Web Automation & DOM Inspection', path: '/guides/automation' },
        { label: 'JavaScript Bridge & Coroutines', path: '/guides/js-bridge' },
        { label: 'Virtual Custom Schemes (app://)', path: '/guides/custom-schemes' },
        { label: 'Asynchronous PDF Printing', path: '/guides/pdf-printing' },
      ],
    },
    {
      icon: Shield,
      title: 'Architecture & Security',
      description: 'Dynamic runtime proxy switching, request interception, process isolation, and security sandboxing.',
      links: [
        { label: '7-Tier Enterprise Proxy Architecture', path: '/guides/proxy-configuration' },
        { label: 'Security Hardening & Sandboxing', path: '/guides/security-sandboxing' },
        { label: 'Media & WebRTC Permissions', path: '/guides/webrtc-permissions' },
        { label: 'Custom Context Menus', path: '/guides/context-menus' },
      ],
    },
    {
      icon: Code2,
      title: 'API Reference',
      description: 'Complete class catalogues, signatures, property definitions, and version-filtered API specs.',
      links: [
        { label: 'Kromium (Engine Singleton)', path: '/api/kromium' },
        { label: 'KromiumBrowser (Master Client)', path: '/api/kromium-browser' },
        { label: 'KromiumConfig (Engine Builder)', path: '/api/kromium-config' },
        { label: 'View All 45 API Symbols →', path: '/api/kromium-api' },
      ],
    },
  ];

  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Explore Documentation
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Browse guides across getting started, Compose integration, Universal Java, capabilities, and API references.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-7 h-7 rounded-md bg-brand-50 dark:bg-brand-950/80 border border-brand-200/60 dark:border-brand-800 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal mb-3 sm:min-h-[2.5rem]">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                  {cat.links.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => onNavigate(link.path)}
                      className="w-full text-left flex items-center justify-between text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 py-1 font-medium group transition-colors"
                    >
                      <span className="truncate">{link.label}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
