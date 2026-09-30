# KromiumContextMenuParams

```kotlin
data class KromiumContextMenuParams(
    val x: Int,
    val y: Int,
    val linkUrl: String? = null,
    val unfilteredLinkUrl: String? = null,
    val sourceUrl: String? = null,
    val hasImage: Boolean = false,
    val pageUrl: String? = null,
    val frameUrl: String? = null,
    val selectionText: String? = null,
    val misspelledWord: String? = null,
    val isEditable: Boolean = false,
    val isSpellCheckEnabled: Boolean = false
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.ui`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`x`** | `Int` | Horizontal coordinate relative to the browser viewport. |
| **`y`** | `Int` | Vertical coordinate relative to the browser viewport. |
| **`linkUrl`** | `String?` | The target URL if right-click occurred on a hyperlink. |
| **`unfilteredLinkUrl`** | `String?` | The unfiltered target URL if on a hyperlink. |
| **`sourceUrl`** | `String?` | The source URL if right-click occurred on media. |
| **`hasImage`** | `Boolean` | True if the clicked element has image contents. |
| **`pageUrl`** | `String?` | URL of the top-level page. |
| **`frameUrl`** | `String?` | URL of the specific subframe. |
| **`selectionText`** | `String?` | Any text currently highlighted/selected. |
| **`misspelledWord`** | `String?` | The misspelled word under cursor if spellcheck is active. |
| **`isEditable`** | `Boolean` | True if triggered inside an editable field. |
| **`isSpellCheckEnabled`** | `Boolean` | True if spell checking is enabled. |

## Methods

### `hasSelection()`

```kotlin
fun hasSelection(): Boolean
```

True if text is currently highlighted or selected.


### `isLink()`

```kotlin
fun isLink(): Boolean
```

True if the click was on a hyperlink.


### `hasMedia()`

```kotlin
fun hasMedia(): Boolean
```

True if the click was on media or an image element.


