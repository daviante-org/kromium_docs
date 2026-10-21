import { useState, useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-groovy';
import { ArrowRight, BookOpen, ExternalLink, Check, Copy } from 'lucide-react';
import { HomeHeroProps } from './HomeHeroProps';
import { cn } from '../../utils/cn';

export function HomeHero({ onNavigate, version }: HomeHeroProps) {
  const [activeTabId, setActiveTabId] = useState('compose-tab');
  const [copied, setCopied] = useState(false);

  const heroTabs = [
    {
      id: 'compose-tab',
      label: 'DesktopApp.kt (Compose)',
      shortLabel: 'Compose',
      language: 'kotlin',
      code: `import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import org.daviante.kromium.api.core.Kromium
import org.daviante.kromium.api.config.KromiumConfig
import org.daviante.kromium.compose.KromiumView
import org.daviante.kromium.jcef.provider.JcefProvider

fun main() = application {
    val engine = remember {
        val config = KromiumConfig.builder()
            .browserConfig { it.appName("KromiumApp") }
            .build()
        Kromium.createEngine(config, JcefProvider).also { it.initialize() }
    }
    val browser = remember { engine.createBrowser("https://repo.daviante.org/artifacts") }

    Window(onCloseRequest = ::exitApplication, title = "Kromium Compose Desktop") {
        KromiumView(
            browser = browser,
            modifier = Modifier.fillMaxSize(),
            loadingContent = {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
            }
        )
    }
}`,
    },
    {
      id: 'swing-tab',
      label: 'SwingApp.java (Pure Java)',
      shortLabel: 'Swing (Java)',
      language: 'java',
      code: `import org.daviante.kromium.api.core.Kromium;
import org.daviante.kromium.api.core.KromiumBrowser;
import org.daviante.kromium.api.core.KromiumEngine;
import org.daviante.kromium.api.config.KromiumConfig;
import org.daviante.kromium.jcef.provider.JcefProvider;
import org.daviante.kromium.swing.KromiumSwingCanvas;

import javax.swing.*;
import java.awt.*;

public class SwingApp {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            KromiumConfig config = KromiumConfig.builder()
                .browserConfig(b -> b.appName("SwingApp"))
                .build();

            KromiumEngine engine = Kromium.createEngine(config, JcefProvider.INSTANCE);
            engine.initialize();

            KromiumBrowser browser = engine.createBrowser("https://repo.daviante.org/artifacts");
            KromiumSwingCanvas canvas = new KromiumSwingCanvas(browser);

            JFrame frame = new JFrame("Kromium Swing Browser");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(1280, 800);
            frame.setLayout(new BorderLayout());
            frame.add(canvas, BorderLayout.CENTER);
            frame.setLocationRelativeTo(null);
            frame.setVisible(true);
        });
    }
}`,
    },
    {
      id: 'gradle-tab',
      label: 'build.gradle.kts',
      shortLabel: 'Gradle',
      language: 'kotlin',
      code: `repositories {
    mavenCentral()
    maven("https://repo.daviante.org/artifacts")
}

dependencies {
    val kromiumVersion = "${version.replace(/^v/, '')}"

    // Core API & Native JCEF Provider
    implementation("org.daviante.kromium:kromium-api:$kromiumVersion")
    implementation("org.daviante.kromium:kromium-provider-jcef:$kromiumVersion")

    // Choose your desktop UI framework:
    implementation("org.daviante.kromium:kromium-compose:$kromiumVersion")
    // implementation("org.daviante.kromium:kromium-swing:$kromiumVersion")
    // implementation("org.daviante.kromium:kromium-javafx:$kromiumVersion")
    // implementation("org.daviante.kromium:kromium-swt:$kromiumVersion")
    // implementation("org.daviante.kromium:kromium-awt:$kromiumVersion")
}`,
    },
  ];

  const currentTab = heroTabs.find((t) => t.id === activeTabId) || heroTabs[0];

  const highlightedCode = useMemo(() => {
    const lang = currentTab.language.toLowerCase();
    const grammar = Prism.languages[lang] || Prism.languages.clike;
    if (grammar) {
      try {
        return Prism.highlight(currentTab.code.trim(), grammar, lang);
      } catch {
        return currentTab.code.trim();
      }
    }
    return currentTab.code.trim();
  }, [currentTab]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentTab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Brand Logo & Wordmark (Vertical Column Layout) */}
          <div className="flex flex-col items-center justify-center gap-3 w-full mb-7 group cursor-default">
            <img
              src="/assets/logo.svg"
              alt="Kromium Logo"
              className="w-[84px] h-[84px] object-contain shrink-0 drop-shadow-md transition-transform duration-200 group-hover:scale-105"
            />
            <img
              src="/assets/brand.svg"
              alt="Kromium"
              className="h-[62px] w-auto max-w-[340px] object-contain transition-transform duration-200 group-hover:scale-102 dark:brightness-0 dark:invert"
            />
          </div>

          {/* Badge Row (Two separate pill badges side-by-side) */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-5">
            <button
              type="button"
              onClick={() => onNavigate('/guides/quickstart')}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-2xs"
              title="View Kromium Release & Version Details"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500 shrink-0" />
              <span>
                <strong className="font-semibold font-mono">{version}</strong> (Latest) • Compose Desktop & Universal Java (Swing, AWT, SWT, JavaFX)
              </span>
            </button>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200/80 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 bg-transparent">
              Apache 2.0 Open Source
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight mb-4 max-w-[800px]">
            Embed Modern Web Capabilities in Compose Desktop & Universal Java
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[0.92rem] text-slate-600 dark:text-slate-300 leading-relaxed max-w-[700px] mx-auto mb-6">
            Kromium is an open-source, production-grade embedded Chromium engine designed for
            Compose Desktop and the entire Universal Java ecosystem (Swing, AWT, SWT, JavaFX).
            High-performance multi-process rendering, pure Java2D lightweight OSR, zero telemetry,
            and dual Kotlin/Java ergonomics.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('/guides/quickstart')}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/api/kromium-api')}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs shadow-2xs transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>API Reference</span>
            </button>

            <a
              href="https://github.com/daviante-org/kromium"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs shadow-2xs transition-all"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Hero Interactive Code Showcase */}
        <div className="mt-10 ms-home-code-section w-full max-w-4xl mx-auto">
          <div className="ms-home-code-card">
            <div className="ms-home-code-header">
              <div className="ms-home-code-tabs" role="tablist">
                {heroTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTabId === tab.id}
                    className={cn('ms-home-code-tab', activeTabId === tab.id && 'active')}
                    onClick={() => setActiveTabId(tab.id)}
                  >
                    <span className="ms-tab-full">{tab.label}</span>
                    <span className="ms-tab-short">{tab.shortLabel}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="ms-code-copy-btn"
                title="Copy code snippet"
                aria-label="Copy code snippet"
              >
                {copied ? (
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

            <pre className="ms-home-code-pre">
              <code
                className={`language-${currentTab.language}`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
