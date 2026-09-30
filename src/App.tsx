import { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import { VersionProvider } from './context/VersionProvider';
import { useVersion } from './hooks/useVersion';
import { useActiveHeading } from './hooks/useActiveHeading';
import { apiDataService } from './services/apiDataService';
import { AppLayout } from './components/layout/AppLayout';
import { GuideView } from './components/guide/GuideView';
import { ApiClassView } from './components/api/ApiClassView';
import { ApiOverviewView } from './components/api/ApiOverviewView';
import { ApiModuleView } from './components/api/ApiModuleView';
import { NavNode } from './types/NavNode';
import { Guide } from './types/Guide';
import { ApiModule } from './types/ApiModule';
import { ApiEntity } from './types/ApiEntity';
import { ApiSymbol } from './types/ApiSymbol';
import { TocHeading } from './components/layout/TocHeading';
import { HomeView } from './components/home/HomeView';
import { useSeo } from './hooks/useSeo';

function PortalContent() {
  const { currentVersion } = useVersion();
  const [navItems, setNavItems] = useState<NavNode[]>([]);
  const [activePath, setActivePath] = useState<string>(() => {
    const p = window.location.pathname;
    return p !== '' && p !== '/' ? p : '/home';
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentGuide, setCurrentGuide] = useState<Guide | null>(null);
  const [currentSymbol, setCurrentSymbol] = useState<ApiSymbol | null>(null);
  const [currentModule, setCurrentModule] = useState<ApiModule | null>(null);
  const [currentEntity, setCurrentEntity] = useState<ApiEntity | null>(null);
  const [allSymbols, setAllSymbols] = useState<ApiSymbol[]>([]);

  // Load Table of Contents for the active version
  useEffect(() => {
    let isCancelled = false;
    apiDataService
      .getTableOfContents(currentVersion)
      .then((data) => {
        if (!isCancelled) {
          setNavItems(data.items);
        }
      })
      .catch((err) => console.error('Failed to load navigation TOC:', err));

    apiDataService
      .getApiSymbols(currentVersion)
      .then((symbols) => {
        if (!isCancelled) {
          setAllSymbols(symbols);
        }
      })
      .catch((err) => console.error('Failed to load API symbols list:', err));

    return () => {
      isCancelled = true;
    };
  }, [currentVersion]);

  const cleanPath = activePath.split('#')[0];
  const isOverview =
    cleanPath === '/api' ||
    cleanPath === '/api/overview' ||
    cleanPath === '/api/kromium-api';

  const [prevActiveKey, setPrevActiveKey] = useState<string>(() => `${currentVersion}:${cleanPath}`);
  const activeKey = `${currentVersion}:${cleanPath}`;
  if (prevActiveKey !== activeKey) {
    setPrevActiveKey(activeKey);
    if (cleanPath !== '/' && cleanPath !== '/home') {
      setIsLoading(true);
    }
  }

  // Load active document when activePath or currentVersion changes
  useEffect(() => {
    let isCancelled = false;

    const loadContent = async () => {
      try {
        const [targetPath] = activePath.split('#');

        if (targetPath === '/' || targetPath === '/home') {
          if (!isCancelled) {
            setCurrentGuide(null);
            setCurrentSymbol(null);
            setCurrentModule(null);
            setCurrentEntity(null);
          }
          return;
        }

        if (
          targetPath === '/documentation' ||
          targetPath === '/docs' ||
          targetPath === '/guides'
        ) {
          setActivePath('/guides/quickstart');
          window.history.replaceState({}, '', '/guides/quickstart');
          return;
        }

        if (targetPath.startsWith('/guides/')) {
          const guideId = targetPath.replace('/guides/', '');
          const guide = await apiDataService.getGuide(currentVersion, guideId);
          if (!isCancelled) {
            setCurrentGuide(guide);
            setCurrentSymbol(null);
            setCurrentModule(null);
            setCurrentEntity(null);
          }
        } else if (targetPath.startsWith('/api')) {
          if (
            targetPath === '/api' ||
            targetPath === '/api/overview' ||
            targetPath === '/api/kromium-api'
          ) {
            if (!isCancelled) {
              setCurrentSymbol(null);
              setCurrentGuide(null);
              setCurrentModule(null);
              setCurrentEntity(null);
            }
          } else {
            const parts = targetPath.replace('/api/', '').split('/');
            const symbolId = parts[parts.length - 1];
            const sym = await apiDataService.getApiSymbol(currentVersion, symbolId);

            if (!isCancelled) {
              if (sym) {
                setCurrentSymbol(sym);
                setCurrentGuide(null);
                setCurrentModule(null);
                setCurrentEntity(null);
              } else if (parts.length > 1) {
                // Fallback to legacy module entity
                const entity = await apiDataService.getEntity(currentVersion, parts[0], parts[1]);
                setCurrentEntity(entity);
                setCurrentSymbol(null);
                setCurrentGuide(null);
                setCurrentModule(null);
              } else {
                const mod = await apiDataService.getModule(currentVersion, parts[0]);
                setCurrentModule(mod);
                setCurrentSymbol(null);
                setCurrentEntity(null);
                setCurrentGuide(null);
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load document:', err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      isCancelled = true;
    };
  }, [activePath, currentVersion]);

  // Compute on-page table of contents headings
  const headings: TocHeading[] = useMemo(() => {
    if (currentGuide) {
      return currentGuide.sections.map((s) => ({
        id: s.id,
        title: s.title,
        depth: 2,
      }));
    }

    if (isOverview) {
      const apiGroup = navItems.find((item) => item.id === 'api-reference-group');
      if (apiGroup && apiGroup.children) {
        return apiGroup.children
          .filter((pkg) => pkg.type === 'package' && pkg.children && pkg.children.length > 0)
          .map((pkg) => ({
            id: pkg.id,
            title: pkg.title,
            depth: 2,
          }));
      }
      return [];
    }

    if (currentSymbol) {
      const list: TocHeading[] = [
        { id: 'definition', title: 'Definition', depth: 2 },
      ];

      if (currentSymbol.whenToUse) {
        list.push({ id: 'when-to-use', title: 'When to Use', depth: 2 });
      }

      if (currentSymbol.options && currentSymbol.options.length > 0) {
        list.push({ id: 'configuration-options', title: 'Configuration Options', depth: 2 });
      }

      if (currentSymbol.properties && currentSymbol.properties.length > 0) {
        list.push({ id: 'properties', title: 'Properties', depth: 2 });
      }

      if (currentSymbol.methods && currentSymbol.methods.length > 0) {
        list.push({ id: 'methods', title: 'Methods', depth: 2 });
      }

      if (currentSymbol.exceptions && currentSymbol.exceptions.length > 0) {
        list.push({ id: 'exceptions', title: 'Exceptions', depth: 2 });
      }

      if (currentSymbol.variants && currentSymbol.variants.length > 0) {
        list.push({ id: 'states-and-variants', title: 'States & Variants', depth: 2 });
      }

      if (currentSymbol.frameworkExamples && currentSymbol.frameworkExamples.length > 0) {
        list.push({ id: 'examples', title: 'Examples', depth: 2 });
      }

      if (currentSymbol.versionHistory && currentSymbol.versionHistory.length > 0) {
        list.push({ id: 'version-history', title: 'Version History', depth: 2 });
      }

      return list;
    }

    return [];
  }, [currentGuide, isOverview, currentSymbol, navItems]);

  const headingIds = useMemo(() => headings.map((h) => h.id), [headings]);
  const activeHeadingId = useActiveHeading(headingIds);

  // Flatten guides for previous/next pagination
  const guideList = useMemo(() => {
    const list: { title: string; path: string }[] = [];
    const traverse = (nodes: NavNode[]) => {
      for (const node of nodes) {
        if (node.type === 'guide' && node.path) {
          list.push({ title: node.title, path: node.path });
        }
        if (node.children) {
          traverse(node.children);
        }
      }
    };
    traverse(navItems);
    return list;
  }, [navItems]);

  const { previousGuide, nextGuide } = useMemo(() => {
    if (!currentGuide) return { previousGuide: null, nextGuide: null };
    const currentIndex = guideList.findIndex((g) => g.path === cleanPath);
    if (currentIndex === -1) return { previousGuide: null, nextGuide: null };
    return {
      previousGuide: currentIndex > 0 ? guideList[currentIndex - 1] : null,
      nextGuide: currentIndex < guideList.length - 1 ? guideList[currentIndex + 1] : null,
    };
  }, [guideList, currentGuide, cleanPath]);

  // Previous / next for API symbols
  const { previousSymbol, nextSymbol } = useMemo(() => {
    if (!currentSymbol || allSymbols.length === 0) {
      return { previousSymbol: null, nextSymbol: null };
    }
    const idx = allSymbols.findIndex((s) => s.id === currentSymbol.id);
    if (idx === -1) return { previousSymbol: null, nextSymbol: null };
    return {
      previousSymbol: idx > 0 ? { name: allSymbols[idx - 1].name, id: allSymbols[idx - 1].id } : null,
      nextSymbol:
        idx < allSymbols.length - 1 ? { name: allSymbols[idx + 1].name, id: allSymbols[idx + 1].id } : null,
    };
  }, [currentSymbol, allSymbols]);

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setActivePath(p !== '' && p !== '/' ? p : '/home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const targetHash = window.location.hash.replace('#', '') || activePath.split('#')[1];
    if (targetHash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return () => clearTimeout(timer);
    } else {
      const resetScroll = () => {
        const docSlot = document.querySelector('.ms-doc-main-slot');
        if (docSlot) docSlot.scrollTop = 0;
        const homeSlot = document.querySelector('main.overflow-y-auto');
        if (homeSlot) homeSlot.scrollTop = 0;
        window.scrollTo(0, 0);
      };
      resetScroll();
      const raf = requestAnimationFrame(resetScroll);
      return () => cancelAnimationFrame(raf);
    }
  }, [activePath]);

  const handleSelectPath = (path: string) => {
    setActivePath(path);
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    const targetHash = path.split('#')[1];
    if (targetHash) {
      setTimeout(() => {
        const el = document.getElementById(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const docSlot = document.querySelector('.ms-doc-main-slot');
      if (docSlot) docSlot.scrollTop = 0;
      const homeSlot = document.querySelector('main.overflow-y-auto');
      if (homeSlot) homeSlot.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  };

  const currentSourceUrl =
    currentSymbol?.sourceUrl ||
    currentEntity?.sourceUrl ||
    (currentSymbol?.package && currentSymbol?.name
      ? `https://github.com/daviante-org/kromium/blob/stable/kromium-api/src/main/kotlin/${currentSymbol.package.replace(/\./g, '/')}/${currentSymbol.name}.kt`
      : undefined);

  const rawMarkdownUrl = useMemo(() => {
    if (currentGuide) {
      return `/llms/guides/${currentGuide.id}.md`;
    }
    if (currentSymbol) {
      return `/llms/api/${currentSymbol.id}.md`;
    }
    return undefined;
  }, [currentGuide, currentSymbol]);

  const seoConfig = useMemo(() => {
    if (cleanPath === '/' || cleanPath === '/home') {
      return {
        title: 'High-Performance Chromium Engine for Compose & Java Desktop',
        description:
          'Kromium is an ultra-performant, multiplatform Chromium Embedded Framework (CEF) desktop browser integration for Jetpack Compose, Java Swing, JavaFX, Eclipse SWT, and Pure AWT.',
        path: '/',
        type: 'website' as const,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Kromium',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Windows, macOS, Linux',
          description:
            'High-performance Chromium engine for Jetpack Compose, Swing, JavaFX, SWT, and AWT desktop applications.',
          url: 'https://kromium.daviante.org',
        },
      };
    }

    if (isOverview) {
      return {
        title: 'API Reference & Overview',
        description:
          'Browse complete API documentation, classes, interfaces, enums, and facades provided by the Kromium library.',
        path: '/api/overview',
        type: 'website' as const,
      };
    }

    if (currentGuide) {
      return {
        title: currentGuide.title,
        description: currentGuide.summary || `Read the ${currentGuide.title} guide for Kromium.`,
        path: `/guides/${currentGuide.id}`,
        type: 'article' as const,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: currentGuide.title,
          description: currentGuide.summary,
          dateModified: currentGuide.lastUpdated || '2026-10-01',
          articleSection: currentGuide.category,
          author: {
            '@type': 'Organization',
            name: 'Daviante Group',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Daviante Group',
            url: 'https://github.com/daviante-org',
          },
        },
      };
    }

    if (currentSymbol) {
      return {
        title: `${currentSymbol.name} API Reference`,
        description:
          currentSymbol.description ||
          `API documentation and examples for ${currentSymbol.name} in package ${currentSymbol.package || 'org.daviante.kromium'}.`,
        path: `/api/${currentSymbol.id}`,
        type: 'article' as const,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: currentSymbol.name,
          programmingLanguage: ['Kotlin', 'Java'],
          description: currentSymbol.description,
          codeRepository: 'https://github.com/daviante-org/kromium',
        },
      };
    }

    return {
      title: 'Documentation',
      description: 'Kromium Documentation and API Reference.',
      path: cleanPath,
      type: 'website' as const,
    };
  }, [cleanPath, isOverview, currentGuide, currentSymbol]);

  useSeo(seoConfig);

  return (
    <AppLayout
      navItems={navItems}
      activePath={activePath}
      onSelectPath={handleSelectPath}
      headings={headings}
      activeHeadingId={activeHeadingId}
      sourceUrl={currentSourceUrl}
      rawMarkdownUrl={rawMarkdownUrl}
    >
      {isLoading ? (
        <div className="py-24 text-center text-xs text-slate-400">
          Loading document content...
        </div>
      ) : activePath === '/' || activePath === '/home' ? (
        <HomeView onNavigate={handleSelectPath} version={currentVersion} />
      ) : isOverview ? (
        <ApiOverviewView onNavigate={handleSelectPath} navItems={navItems} />
      ) : currentSymbol ? (
        <ApiClassView
          symbol={currentSymbol}
          previousSymbol={previousSymbol}
          nextSymbol={nextSymbol}
          onNavigate={handleSelectPath}
        />
      ) : currentGuide ? (
        <GuideView
          guide={currentGuide}
          previous={previousGuide}
          next={nextGuide}
          onNavigate={handleSelectPath}
        />
      ) : currentEntity ? (
        <ApiClassView
          symbol={{
            id: currentEntity.id,
            name: currentEntity.name,
            module: currentEntity.module,
            category: 'API Reference',
            description: currentEntity.description,
            declaration: currentEntity.signature,
            since: currentEntity.sinceVersion,
            whenToUse: currentEntity.summary,
          }}
          onNavigate={handleSelectPath}
        />
      ) : currentModule ? (
        <ApiModuleView module={currentModule} onNavigate={handleSelectPath} />
      ) : (
        <div className="py-24 text-center text-xs text-slate-400">
          Document not found. Please select an article from the left navigation tree.
        </div>
      )}
    </AppLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <VersionProvider>
        <PortalContent />
      </VersionProvider>
    </ThemeProvider>
  );
}
