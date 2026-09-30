import { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown>;
}

const BASE_URL = 'https://kromium.daviante.org';
const DEFAULT_TITLE = 'Kromium Documentation & API Reference';
const DEFAULT_DESC =
  'Official documentation and complete API reference for Kromium, the high-performance Chromium engine for Jetpack Compose, Swing, JavaFX, SWT, and AWT desktop applications.';

function setMetaTag(selector: string, attribute: string, value: string) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [attrName, attrVal] = selector.replace(/[[\]'"]/g, '').split('=');
    if (attrName && attrVal) {
      element.setAttribute(attrName, attrVal);
      document.head.appendChild(element);
    }
  }
  element.setAttribute(attribute, value);
}

export function useSeo({
  title,
  description = DEFAULT_DESC,
  path = '/',
  type = 'website',
  schema,
}: SeoProps) {
  useEffect(() => {
    // 1. Title tag
    const fullTitle = title ? `${title} | Kromium` : DEFAULT_TITLE;
    document.title = fullTitle;
    setMetaTag("meta[name='title']", 'content', fullTitle);

    // 2. Meta description
    setMetaTag("meta[name='description']", 'content', description);

    // 3. Open Graph
    const canonicalUrl = `${BASE_URL}${path.split('#')[0]}`;
    setMetaTag("meta[property='og:title']", 'content', fullTitle);
    setMetaTag("meta[property='og:description']", 'content', description);
    setMetaTag("meta[property='og:url']", 'content', canonicalUrl);
    setMetaTag("meta[property='og:type']", 'content', type);

    // 4. Twitter Card
    setMetaTag("meta[name='twitter:title']", 'content', fullTitle);
    setMetaTag("meta[name='twitter:description']", 'content', description);
    setMetaTag("meta[name='twitter:url']", 'content', canonicalUrl);

    // 5. Canonical Link
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.id = 'canonical-url';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // 6. JSON-LD Structured Data
    if (schema) {
      let scriptTag = document.getElementById('seo-json-ld') as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.id = 'seo-json-ld';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema, null, 2);
    }
  }, [title, description, path, type, schema]);
}
