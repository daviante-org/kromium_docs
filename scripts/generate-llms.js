import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT_DIR, 'public', 'data', 'versions', 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const VERSION = manifest.latestVersion || 'v1.0.0.150-b16';
const DATA_DIR = path.join(ROOT_DIR, 'public', 'data', 'versions', VERSION);
const TOC_PATH = path.join(DATA_DIR, 'toc.json');
const GUIDES_DIR = path.join(DATA_DIR, 'guides');
const SYMBOLS_DIR = path.join(DATA_DIR, 'symbols');

const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const LLMS_OUT_DIR = path.join(PUBLIC_DIR, 'llms');
const LLMS_GUIDES_DIR = path.join(LLMS_OUT_DIR, 'guides');
const LLMS_API_DIR = path.join(LLMS_OUT_DIR, 'api');

// Ensure directories exist
fs.mkdirSync(LLMS_GUIDES_DIR, { recursive: true });
fs.mkdirSync(LLMS_API_DIR, { recursive: true });

const toc = JSON.parse(fs.readFileSync(TOC_PATH, 'utf8'));

// Format a guide object into clean Markdown
function formatGuideMarkdown(guide) {
  let md = `# ${guide.title}\n\n`;
  if (guide.summary) {
    md += `> ${guide.summary}\n\n`;
  }
  md += `- **Category:** ${guide.category || 'Guides'}\n`;
  md += `- **Read Time:** ${guide.readTime || '5 min'}\n`;
  md += `- **Last Updated:** ${guide.lastUpdated || '2026-10-01'}\n\n`;

  if (guide.sections && Array.isArray(guide.sections)) {
    for (const section of guide.sections) {
      md += `## ${section.title}\n\n`;
      if (section.content) {
        md += `${section.content.trim()}\n\n`;
      }

      if (section.codeTabs && section.codeTabs.length > 0) {
        for (const tab of section.codeTabs) {
          md += `### ${tab.name || tab.language || 'Code'}\n\n`;
          md += `\`\`\`${tab.language || 'kotlin'}\n${tab.code.trim()}\n\`\`\`\n\n`;
        }
      } else if (section.codeSnippet) {
        md += `\`\`\`${section.codeSnippet.language || 'kotlin'}\n${section.codeSnippet.code.trim()}\n\`\`\`\n\n`;
      }
    }
  }

  if (guide.relatedApis && guide.relatedApis.length > 0) {
    md += `## Related APIs\n\n`;
    for (const api of guide.relatedApis) {
      const symId = api.path.replace('/api/', '');
      md += `- [${api.name}](/llms/api/${symId}.md)\n`;
    }
    md += `\n`;
  }

  return md;
}

// Format an API symbol object into clean Markdown
function formatSymbolMarkdown(sym) {
  let md = `# ${sym.name}\n\n`;
  md += `\`\`\`kotlin\n${sym.declaration}\n\`\`\`\n\n`;
  md += `- **Module:** \`${sym.module || 'kromium-api'}\`\n`;
  if (sym.package) md += `- **Package:** \`${sym.package}\`\n`;
  if (sym.category) md += `- **Category:** ${sym.category}\n`;
  if (sym.since) md += `- **Since Version:** ${sym.since}\n`;
  md += `\n`;

  if (sym.description) {
    md += `## Description\n\n${sym.description}\n\n`;
  }

  if (sym.whenToUse) {
    md += `### When to Use\n\n${sym.whenToUse}\n\n`;
  }

  if (sym.variants && sym.variants.length > 0) {
    md += `## States & Variants\n\n`;
    md += `| Variant | Declaration | Description |\n`;
    md += `| :--- | :--- | :--- |\n`;
    for (const v of sym.variants) {
      const cleanDesc = (v.description || '').replace(/\n/g, ' ');
      md += `| **\`${v.name}\`** | \`${v.declaration || v.name}\` | ${cleanDesc} |\n`;
    }
    md += `\n`;
  }

  if (sym.options && sym.options.length > 0) {
    md += `## Options\n\n`;
    md += `| Option | Type | Default | Description |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    for (const opt of sym.options) {
      const cleanDesc = (opt.description || '').replace(/\n/g, ' ');
      md += `| **\`${opt.name}\`** | \`${opt.type || ''}\` | \`${opt.default || ''}\` | ${cleanDesc} |\n`;
    }
    md += `\n`;
  }

  if (sym.properties && sym.properties.length > 0) {
    md += `## Properties\n\n`;
    md += `| Property | Type | Description |\n`;
    md += `| :--- | :--- | :--- |\n`;
    for (const p of sym.properties) {
      const cleanDesc = (p.description || '').replace(/\n/g, ' ');
      md += `| **\`${p.name}\`** | \`${p.type || ''}\` | ${cleanDesc} |\n`;
    }
    md += `\n`;
  }

  if (sym.methods && sym.methods.length > 0) {
    md += `## Methods\n\n`;
    for (const m of sym.methods) {
      md += `### \`${m.name}()\`\n\n`;
      md += `\`\`\`kotlin\n${m.signature || m.name}\n\`\`\`\n\n`;
      if (m.description) {
        md += `${m.description}\n\n`;
      }
      if (m.returns) {
        md += `- **Returns:** \`${m.returns}\`\n`;
      }
      if (m.throws && m.throws.length > 0) {
        md += `- **Throws:** ${m.throws.map((t) => `\`${t}\``).join(', ')}\n`;
      }
      md += `\n`;
    }
  }

  if (sym.exceptions && sym.exceptions.length > 0) {
    md += `## Exceptions\n\n`;
    md += `| Exception | When Thrown |\n`;
    md += `| :--- | :--- |\n`;
    for (const e of sym.exceptions) {
      md += `| **\`${e.name}\`** | ${e.description || ''} |\n`;
    }
    md += `\n`;
  }

  if (sym.frameworkExamples && sym.frameworkExamples.length > 0) {
    md += `## Code Examples\n\n`;
    for (const ex of sym.frameworkExamples) {
      md += `### ${ex.framework} (${ex.lang})\n\n`;
      md += `\`\`\`${ex.lang || 'kotlin'}\n${ex.code.trim()}\n\`\`\`\n\n`;
    }
  }

  return md;
}

console.log('Generating LLM markdown files for version:', VERSION);

// 1. Process all guides
const guidesGroup = toc.items.find((i) => i.id === 'guides-group');
const guideItems = guidesGroup ? guidesGroup.children || [] : [];
const generatedGuides = [];

for (const g of guideItems) {
  const guideFilePath = path.join(GUIDES_DIR, `${g.id}.json`);
  if (!fs.existsSync(guideFilePath)) {
    console.warn(`Guide file missing: ${guideFilePath}`);
    continue;
  }
  const guideData = JSON.parse(fs.readFileSync(guideFilePath, 'utf8'));
  const mdContent = formatGuideMarkdown(guideData);
  fs.writeFileSync(path.join(LLMS_GUIDES_DIR, `${g.id}.md`), mdContent, 'utf8');
  generatedGuides.push({ ...guideData, id: g.id });
}
console.log(`Generated ${generatedGuides.length} guide markdown files in public/llms/guides/`);

// 2. Process all symbols
const apiGroup = toc.items.find((i) => i.id === 'api-reference-group');
const packages = apiGroup ? (apiGroup.children || []).filter((c) => c.type === 'package') : [];
const generatedSymbols = [];

for (const pkg of packages) {
  const entities = (pkg.children || []).filter((c) => c.type === 'entity');
  for (const entity of entities) {
    const symbolFilePath = path.join(SYMBOLS_DIR, `${entity.id}.json`);
    if (!fs.existsSync(symbolFilePath)) {
      console.warn(`Symbol file missing: ${symbolFilePath}`);
      continue;
    }
    const symbolData = JSON.parse(fs.readFileSync(symbolFilePath, 'utf8'));
    const mdContent = formatSymbolMarkdown(symbolData);
    fs.writeFileSync(path.join(LLMS_API_DIR, `${entity.id}.md`), mdContent, 'utf8');
    generatedSymbols.push({ ...symbolData, pkgTitle: pkg.title });
  }
}
console.log(`Generated ${generatedSymbols.length} API symbol markdown files in public/llms/api/`);

// 3. Generate public/llms.txt
let llmsTxt = `# Kromium Documentation

> Kromium is an ultra-performant, multiplatform Chromium Embedded Framework (CEF) desktop browser integration for Jetpack Compose, Java Swing, JavaFX, Eclipse SWT, and Pure AWT.

- **Engine:** Chromium Embedded Framework (CEF) + JetBrains JCEF
- **Rendering:** Decoupled Off-Screen Rendering (OSR) with direct BGRA pixel buffer streaming
- **Desktop UI Frameworks:** Jetpack Compose Multiplatform, Java Swing, OpenJFX / JavaFX, Eclipse SWT, Pure Java AWT
- **Supported Platforms:** Windows (x64, ARM64), macOS (Intel x64, Apple Silicon ARM64), Linux (x64, ARM64)
- **Version:** ${VERSION}
- **Maven Group:** \`org.daviante.kromium\`
- **GitHub:** https://github.com/daviante-org/kromium
- **Documentation Portal:** https://kromium.daviante.org

## Consolidated Documentation for LLMs
- [Complete Consolidated Documentation (Single Prompt Ingestion)](/llms-full.txt): Complete manual containing all guides, classes, methods, and code examples in a single markdown file for direct LLM context injection.

## Guides
`;

for (const g of generatedGuides) {
  llmsTxt += `- [${g.title}](/llms/guides/${g.id}.md): ${g.summary || ''}\n`;
}

llmsTxt += `\n## API Reference by Package\n\n`;

for (const pkg of packages) {
  llmsTxt += `### ${pkg.title}\n`;
  const entities = (pkg.children || []).filter((c) => c.type === 'entity');
  for (const entity of entities) {
    const sym = generatedSymbols.find((s) => s.id === entity.id);
    const rawDesc = sym?.description || sym?.summary || entity.description || entity.title;
    const desc = rawDesc.includes('.') ? rawDesc.split('.')[0] + '.' : rawDesc;
    llmsTxt += `- [${entity.title}](/llms/api/${entity.id}.md): ${desc}\n`;
  }
  llmsTxt += `\n`;
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt, 'utf8');
console.log('Generated public/llms.txt');

// 4. Generate public/llms-full.txt
let llmsFullTxt = `# Kromium Library — Complete Documentation Manual
**Version:** ${VERSION}  
**Package:** \`org.daviante.kromium\`  
**Repository:** https://github.com/daviante-org/kromium  

---

# PART 1: CORE GUIDES & WORKFLOWS

`;

for (const g of generatedGuides) {
  llmsFullTxt += `\n---\n\n`;
  llmsFullTxt += formatGuideMarkdown(g);
}

llmsFullTxt += `\n\n# PART 2: COMPLETE API REFERENCE\n\n`;

for (const sym of generatedSymbols) {
  llmsFullTxt += `\n---\n\n`;
  llmsFullTxt += formatSymbolMarkdown(sym);
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt, 'utf8');
console.log(`Generated public/llms-full.txt (${(Buffer.byteLength(llmsFullTxt, 'utf8') / 1024).toFixed(1)} KB)`);

// 5. Generate public/sitemap.xml
const SITE_URL = 'https://kromium.daviante.org';
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Pages -->
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/api/overview</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/llms.txt</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${SITE_URL}/llms-full.txt</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Guides -->
`;

for (const g of generatedGuides) {
  sitemapXml += `  <url>
    <loc>${SITE_URL}/guides/${g.id}</loc>
    <lastmod>${g.lastUpdated || '2026-10-01'}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
}

sitemapXml += `\n  <!-- API Symbols -->\n`;

for (const sym of generatedSymbols) {
  sitemapXml += `  <url>
    <loc>${SITE_URL}/api/${sym.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>\n`;
}

sitemapXml += `</urlset>\n`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`Generated public/sitemap.xml (${generatedGuides.length + generatedSymbols.length + 4} URLs)`);
