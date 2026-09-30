import { ShieldCheck, Monitor, Terminal, Globe } from 'lucide-react';
import { HomeFeaturesProps } from './HomeFeaturesProps';

export function HomeFeatures({ onNavigate }: HomeFeaturesProps) {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Zero Built-In Telemetry',
      description:
        'All Chromium metrics, crash reports, Omaha updates, and Google services are strictly suppressed. Cache and user profiles are completely quarantined without Windows Registry pollution.',
      linkPath: '/guides/security-sandboxing',
      badge: 'Privacy & Security',
    },
    {
      icon: Monitor,
      title: 'Compose & Universal Java',
      description:
        'First-class dual ergonomics: Compose-native KromiumView paired with 100% pure Java2D lightweight OSR (zero JOGL/OpenGL) for Swing, AWT, SWT, and JavaFX.',
      linkPath: '/guides/ui-frameworks',
      badge: 'Universal Desktop',
    },
    {
      icon: Terminal,
      title: 'Web Automation DSL & Emulation',
      description:
        'High-level DOM automation (waitForSelector, fill, click), in-V8 MutationObserver zero-polling waiting, and auto-waiting network idle sync without external Selenium or Playwright drivers.',
      linkPath: '/guides/automation',
      badge: 'in-V8 Observers',
    },
    {
      icon: Globe,
      title: 'Enterprise Networking & Schemes',
      description:
        'Virtual custom schemes (app://) for local SPAs, dynamic runtime proxy switching without engine restart, integrated Windows authentication (NTLM/Kerberos SPNEGO SSO), and WebRTC IP leak defense.',
      linkPath: '/guides/proxy-configuration',
      badge: '7-Tier Proxy',
    },
  ];

  return (
    <section className="py-10 sm:py-12 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Why Kromium
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Engineered from the ground up for desktop developers requiring modern browser rendering without native overhead.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={() => onNavigate(feat.linkPath)}
                className="group relative p-5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950/70 shadow-xs hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-sm transition-all cursor-pointer backdrop-blur-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-8 h-8 rounded-md bg-brand-50 dark:bg-brand-950/80 border border-brand-200/60 dark:border-brand-800 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-mono">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-normal">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-medium text-brand-600 dark:text-brand-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Learn more</span>
                  <span className="ml-1">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
