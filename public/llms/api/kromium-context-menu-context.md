# KromiumContextMenuContext

```kotlin
class KromiumContextMenuContext(
    val browser: KromiumBrowser?,
    val params: KromiumContextMenuParams
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.ui`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`browser`** | `KromiumBrowser?` | High-level KromiumBrowser instance, if resolved. |
| **`params`** | `KromiumContextMenuParams` | Contextual parameters of the right-click event. |

## Methods

### `copyToClipboard()`

```kotlin
fun copyToClipboard(text: String)
```

Copies the given text to the system clipboard.


### `inspectElement()`

```kotlin
fun inspectElement()
```

Opens Chromium DevTools targeting the clicked element coordinates.


### `startDownload()`

```kotlin
fun startDownload(url: String)
```

Initiates a download for the given URL using Chromium's download pipeline.


### `searchWeb()`

```kotlin
fun searchWeb(query: String = params.selectionText ?: "", engineUrl: String = "https://www.google.com/search?q=%s", openInSystemBrowser: Boolean = true)
```

Performs a web search using the provided query and template.


