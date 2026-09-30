# KromiumClient

```kotlin
interface KromiumClient
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.core`
- **Category:** Browser & Client Components
- **Since Version:** v1.0.0.150-b11

## Description

Represents a client session in the engine. A client groups multiple browsers under a shared context (such as shared cookies, cache, proxy configuration, network request interceptors, and listeners).

### When to Use

Obtain via engine.createClient(config) to group browser instances with custom session interceptors, listeners, proxy rules, and download configurations.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`inFlightRequestCount`** | `Int` | The number of active, in-flight network requests across all browsers in this client. |
| **`downloadListener`** | `KromiumDownloadListener?` | Listener for tracking global download progress. |
| **`downloadDirectory`** | `File` | The default directory where downloads should be saved. |
| **`onBeforeDownloadListener`** | `KromiumBeforeDownloadListener?` | Optional interceptor to dynamically resolve the target path before a download begins. Return null to use default path, or return empty string "" to cancel. |
| **`doNotTrack`** | `Boolean` | Whether to assert Do Not Track (DNT) and Global Privacy Control (Sec-GPC) headers on outbound requests. |
| **`rememberPermissions`** | `Boolean` | Whether permission decisions (e.g. camera, microphone) should be cached for the lifetime of this client session. |
| **`requestInterceptor`** | `KromiumRequestInterceptor?` | Request interceptor for filtering or modifying outgoing HTTP/HTTPS requests. |
| **`navigationInterceptor`** | `KromiumNavigationInterceptor?` | Interceptor for evaluating and potentially overriding top-level navigation. |
| **`authListener`** | `KromiumAuthListener?` | Listener for HTTP authentication challenges. |
| **`popupListener`** | `KromiumPopupListener?` | Listener for popup window requests. |
| **`jsDialogListener`** | `KromiumJsDialogListener?` | Listener for JavaScript dialogs (alert, confirm, prompt). |
| **`enableContextMenus`** | `Boolean` | Globally enables or disables native right-click context menus for this client. Defaults to true. |
| **`contextMenuListener`** | `KromiumContextMenuListener?` | Listener for context menu events and custom menu construction. |
| **`permissionListener`** | `KromiumPermissionListener?` | Listener for media/device permission requests. |
| **`consoleMessageListener`** | `KromiumConsoleMessageListener?` | Listener for browser console messages. |
| **`loadErrorListener`** | `KromiumLoadErrorListener?` | Listener for page load errors. |
| **`currentProxy`** | `KromiumProxy?` | The currently active proxy configuration for this client session, or null if no custom proxy has been set. |

## Methods

### `createBrowser()`

```kotlin
fun createBrowser(url: String, config: KromiumClientConfig = KromiumClientConfig.default()): KromiumBrowser
```

Creates a new browser instance managed by this client.

- **Returns:** `KromiumBrowser`

### `createBrowser()`

```kotlin
fun createBrowser(url: String, framework: KromiumUiFramework): KromiumBrowser
```

Creates a new browser instance managed by this client with an explicit UI framework.

- **Returns:** `KromiumBrowser`

### `hasPendingRequests()`

```kotlin
fun hasPendingRequests(): Boolean
```

Whether there are any pending network requests active on this client.

- **Returns:** `Boolean`

### `timeSinceLastRequestMs()`

```kotlin
fun timeSinceLastRequestMs(): Long
```

The number of milliseconds elapsed since the last network request completed.

- **Returns:** `Long`

### `setContextMenu()`

```kotlin
fun setContextMenu(block: KromiumMenuBuilder.(KromiumContextMenuContext) -> Unit)
```

Configures the right-click context menu using a declarative builder block.

- **Returns:** `Unit`

### `updateProxy()`

```kotlin
fun updateProxy(proxy: KromiumProxy): Boolean
```

Dynamically updates the proxy settings for this client session.

- **Returns:** `Boolean`

### `clearPermissionCache()`

```kotlin
fun clearPermissionCache()
```

Clears all remembered permission decisions from the in-memory session cache.

- **Returns:** `Unit`

### `cancelDownload()`

```kotlin
fun cancelDownload(downloadId: Int): Boolean
```

Cancels an active download by its ID.

- **Returns:** `Boolean`

### `pauseDownload()`

```kotlin
fun pauseDownload(downloadId: Int): Boolean
```

Pauses an active download by its ID.

- **Returns:** `Boolean`

### `resumeDownload()`

```kotlin
fun resumeDownload(downloadId: Int): Boolean
```

Resumes a paused download by its ID.

- **Returns:** `Boolean`

### `isDownloadPaused()`

```kotlin
fun isDownloadPaused(downloadId: Int): Boolean
```

Checks if a download is currently paused.

- **Returns:** `Boolean`

### `dispose()`

```kotlin
fun dispose()
```

Disposes the client and all associated browsers.

- **Returns:** `Unit`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.core.KromiumEngine
import org.daviante.kromium.api.core.KromiumClient
import org.daviante.kromium.api.core.KromiumBrowser
import org.daviante.kromium.api.ui.KromiumUiFramework

fun createClientSession(engine: KromiumEngine): KromiumBrowser {
    val client: KromiumClient = engine.createClient()
    client.enableContextMenus = true
    return client.createBrowser("https://github.com", KromiumUiFramework.COMPOSE)
}
```

### Pure Java (java)

```java
import org.daviante.kromium.api.core.KromiumEngine;
import org.daviante.kromium.api.core.KromiumClient;
import org.daviante.kromium.api.core.KromiumBrowser;
import org.daviante.kromium.api.ui.KromiumUiFramework;

public class ClientSetup {
    public static KromiumBrowser setup(KromiumEngine engine) {
        KromiumClient client = engine.createClient();
        return client.createBrowser("https://example.com", KromiumUiFramework.SWING);
    }
}
```

