# PDF Export & Print API

> Export web pages to vector PDF documents with configurable paper size, margins, headers/footers, accessible tagging, and page ranges.

- **Category:** Core API
- **Read Time:** 5 min
- **Last Updated:** 2026-10-01

## Basic PDF Export

Export any loaded web page to a PDF file using `browser.automation` with `KromiumPdfSettings`. The PDF is generated using Chromium's built-in print-to-PDF pipeline, producing high-quality vector output.

```kotlin
import org.daviante.kromium.api.print.KromiumPdfSettings
import org.daviante.kromium.api.print.KromiumPaperSize
import java.io.File

// Wait for page to fully load first
browser.navigation.loadUrl("https://example.com", waitUntil = NavigationStage.LOADED)

// Export with default A4 portrait settings
val settings = KromiumPdfSettings.Default
browser.automation.printToPdf(File("output.pdf"), settings)
```

## Advanced PDF Configuration

Use the fluent `KromiumPdfSettings.builder()` for full control over orientation, background printing, custom paper sizes, margins, page ranges, and accessibility features.

| Setting | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `landscape` | `Boolean` | `false` | Landscape orientation |
| `printBackground` | `Boolean` | `false` | Include CSS backgrounds and gradients |
| `scale` | `Double` | `1.0` | Page scaling (1.0 = 100%) |
| `paperSize` | `KromiumPaperSize` | `A4` | Paper dimensions |
| `margins` | `KromiumPdfMargins` | `Default` | Page margins |
| `pageRanges` | `String` | `""` | Pages to print (e.g. "1-5, 8") |
| `displayHeaderFooter` | `Boolean` | `false` | Show header/footer templates |
| `generateTaggedPdf` | `Boolean` | `false` | Accessible tagged PDF |
| `generateDocumentOutline` | `Boolean` | `false` | Bookmarks from headings |

```kotlin
val settings = KromiumPdfSettings.builder()
    .landscape(true)
    .printBackground(true)
    .paperSize(KromiumPaperSize.LETTER)
    .margins(KromiumPdfMargins(top = 1.0, bottom = 1.0, left = 0.5, right = 0.5))
    .pageRanges("1-3, 5")
    .displayHeaderFooter(true)
    .headerTemplate("<div style='font-size:8px;text-align:center;'>Company Report</div>")
    .footerTemplate("<div style='font-size:8px;text-align:center;'>Page <span class='pageNumber'></span> of <span class='totalPages'></span></div>")
    .generateTaggedPdf(true)
    .generateDocumentOutline(true)
    .createDirectories(true)
    .build()

browser.automation.printToPdf(File("reports/quarterly.pdf"), settings)
```

## Standard Paper Sizes

`KromiumPaperSize` provides constants for standard paper dimensions:
- `KromiumPaperSize.A4` — 210 × 297 mm (ISO standard)
- `KromiumPaperSize.LETTER` — 8.5 × 11 inches (US standard)
- `KromiumPaperSize.LEGAL` — 8.5 × 14 inches
- `KromiumPaperSize.TABLOID` — 11 × 17 inches
- Custom sizes via `KromiumPaperSize(widthInches, heightInches)`

## Related APIs

- [KromiumPdfSettings](/llms/api/kromium-pdf-settings.md)
- [KromiumPaperSize](/llms/api/kromium-paper-size.md)
- [KromiumPdfMargins](/llms/api/kromium-pdf-margins.md)
- [KromiumAutomation](/llms/api/kromium-automation.md)

