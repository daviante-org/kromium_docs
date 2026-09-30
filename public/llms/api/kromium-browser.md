# KromiumBrowser

```kotlin
interface KromiumBrowser : AutoCloseable
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.core`
- **Category:** Browser & Client Components
- **Since Version:** v1.0.0.150-b11

## Description

Main interface for the Kromium browser instance. Structured into multiple dedicated facades for separation of concerns: navigation, view, search, devTools, jsBridge, clipboard, downloads, automation, storage, proxyManager, security, and assets.

### When to Use

Obtain via client.createBrowser() to render, control, and interact with a Chromium web view instance.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`navigation`** | `KromiumNavigation` | Facade for URL loading, lifecycle waiting (DOMContentLoaded, NetworkIdle), and history traversal. |
| **`view`** | `KromiumView` | Facade for zoom control, audio muting, viewport resizing, and rendering visibility. |
| **`search`** | `KromiumSearch` | Facade for finding text on page, highlighting matches, and navigating find results. |
| **`devTools`** | `KromiumDevTools` | Facade for opening and closing the native Chromium Developer Tools window. |
| **`jsBridge`** | `KromiumJsBridge` | Facade for bidirectional JavaScript interoperability, script execution, and native object binding. |
| **`clipboard`** | `KromiumClipboard` | Facade for clipboard operations (cut, copy, paste, select all, undo, redo). |
| **`downloads`** | `KromiumDownloads` | Facade for managing and controlling file downloads. |
| **`automation`** | `KromiumAutomation` | Facade for headless automation, mouse/keyboard simulation, DOM querying, and PDF export. |
| **`storage`** | `KromiumStorage` | Facade for cache management, local storage inspection, and cookie clearing. |
| **`proxyManager`** | `KromiumProxyManager` | Facade for runtime dynamic proxy reconfiguration. |
| **`security`** | `KromiumSecurity` | Facade for host locking, subresource restrictions, and iframe security. |
| **`assets`** | `KromiumAssets` | Facade for dynamic network asset filtering and content blocking. |

## Methods

### `close()`

```kotlin
override fun close()
```

Closes this browser instance and cleans up underlying resources.

- **Returns:** `Unit`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.core.KromiumBrowser
import org.daviante.kromium.api.core.KromiumClient
import org.daviante.kromium.api.ui.KromiumUiFramework

fun setupBrowser(client: KromiumClient): KromiumBrowser {
    val browser = client.createBrowser("https://github.com", KromiumUiFramework.COMPOSE)
    browser.navigation.loadUrl("https://google.com")
    return browser
}
```

### Pure Java (java)

```java
import org.daviante.kromium.api.core.KromiumBrowser;
import org.daviante.kromium.api.core.KromiumClient;
import org.daviante.kromium.api.ui.KromiumUiFramework;

public class BrowserCreator {
    public static void create(KromiumClient client) {
        try (KromiumBrowser browser = client.createBrowser("https://example.com", KromiumUiFramework.SWING)) {
            browser.getNavigation().loadUrl("https://example.com");
        }
    }
}
```

