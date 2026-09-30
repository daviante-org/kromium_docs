# KromiumPdfSettings

```kotlin
data class KromiumPdfSettings @JvmOverloads constructor(
    val landscape: Boolean = false,
    val printBackground: Boolean = false,
    val scale: Double = 1.0,
    val paperSize: KromiumPaperSize = KromiumPaperSize.A4,
    val preferCssPageSize: Boolean = false,
    val margins: KromiumPdfMargins = KromiumPdfMargins.Default,
    val pageRanges: String = "",
    val displayHeaderFooter: Boolean = false,
    val headerTemplate: String = "",
    val footerTemplate: String = "",
    val createDirectories: Boolean = false,
    val generateTaggedPdf: Boolean = false,
    val generateDocumentOutline: Boolean = false
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.print`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`landscape`** | `Boolean` | True for landscape orientation, false for portrait. |
| **`printBackground`** | `Boolean` | True to print CSS background graphics, gradients, and colors. |
| **`scale`** | `Double` | Scaling of webpage rendering (1.0 = 100%). |
| **`paperSize`** | `KromiumPaperSize` | Dimensions of output paper. |
| **`preferCssPageSize`** | `Boolean` | True to prefer page size defined by CSS @page rule. |
| **`margins`** | `KromiumPdfMargins` | Margin specifications for the page. |
| **`pageRanges`** | `String` | Page ranges to print (e.g. '1-5, 8, 11-13'). Empty prints all pages. |
| **`displayHeaderFooter`** | `Boolean` | True to display HTML header and footer. |
| **`headerTemplate`** | `String` | HTML template for print header. |
| **`footerTemplate`** | `String` | HTML template for print footer. |
| **`createDirectories`** | `Boolean` | True to automatically create missing parent directories for target file. |
| **`generateTaggedPdf`** | `Boolean` | True to generate tagged (accessible) PDF. |
| **`generateDocumentOutline`** | `Boolean` | True to generate document outline (bookmarks) from headers. |

