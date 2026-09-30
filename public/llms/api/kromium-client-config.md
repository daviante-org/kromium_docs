# KromiumClientConfig

```kotlin
data class KromiumClientConfig(val userAgent: String? = null, val emulateDesktopEnvironment: Boolean = false, val doNotTrack: Boolean = true, val isIsolated: Boolean = false, val proxy: KromiumProxy? = null, val onBeforeDownloadListener: KromiumBeforeDownloadListener? = null, val downloadListener: KromiumDownloadListener? = null, val requestInterceptor: KromiumRequestInterceptor? = null, val navigationInterceptor: KromiumNavigationInterceptor? = null, val consoleMessageListener: KromiumConsoleMessageListener? = null, val jsDialogListener: KromiumJsDialogListener? = null, val popupListener: KromiumPopupListener? = null, val authListener: KromiumAuthListener? = null, val contextMenuListener: KromiumContextMenuListener? = null, val permissionListener: KromiumPermissionListener? = null, val loadErrorListener: KromiumLoadErrorListener? = null, val isOffScreenRendered: Boolean = true, val isTransparent: Boolean = false, val framework: KromiumUiFramework? = null, val sslErrorPolicy: SslErrorPolicy = SslErrorPolicy.Strict, val initialWidth: Int = 1280, val initialHeight: Int = 800)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.config`
- **Category:** Configuration
- **Since Version:** v1.0.0.150-b11

## Description

Configuration for a specific browser client session. Determines proxy settings, user agents, transparency, OSR canvas bindings, SSL error policies, initial dimensions, and event listeners for network, downloads, and UI interactions.

### When to Use

Pass into engine.createClient(config) or client.createBrowser(url, config) to configure individual browsing sessions.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`userAgent`** | `String?` | Custom HTTP User-Agent string, or null to use Chromium default. |
| **`emulateDesktopEnvironment`** | `Boolean` | Whether to emulate a standard desktop display environment. |
| **`doNotTrack`** | `Boolean` | Whether to send DNT: 1 and Sec-GPC: 1 privacy headers. |
| **`isIsolated`** | `Boolean` | Whether this client operates in an isolated incognito storage partition. |
| **`proxy`** | `KromiumProxy?` | Session-specific proxy configuration overriding the global engine proxy. |
| **`onBeforeDownloadListener`** | `KromiumBeforeDownloadListener?` | Callback to resolve target paths or cancel file downloads before transfer begins. |
| **`downloadListener`** | `KromiumDownloadListener?` | Callback to monitor file download progress and completion events. |
| **`requestInterceptor`** | `KromiumRequestInterceptor?` | Interceptor for inspecting, modifying, or blocking outgoing HTTP/HTTPS web resource requests. |
| **`navigationInterceptor`** | `KromiumNavigationInterceptor?` | Interceptor for evaluating and overriding top-level frame navigations. |
| **`consoleMessageListener`** | `KromiumConsoleMessageListener?` | Listener for JavaScript console messages (log, info, warn, error). |
| **`jsDialogListener`** | `KromiumJsDialogListener?` | Listener to handle or suppress JavaScript alert, confirm, and prompt dialogs. |
| **`popupListener`** | `KromiumPopupListener?` | Listener for popup window requests (window.open). |
| **`authListener`** | `KromiumAuthListener?` | Listener for HTTP Basic/Digest and proxy authentication challenges. |
| **`contextMenuListener`** | `KromiumContextMenuListener?` | Listener for right-click context menu construction and customization. |
| **`permissionListener`** | `KromiumPermissionListener?` | Listener for camera, microphone, screen share, and media device permission requests. |
| **`loadErrorListener`** | `KromiumLoadErrorListener?` | Listener for frame load failures, DNS resolution errors, and connection dropouts. |
| **`isOffScreenRendered`** | `Boolean` | Whether browsers in this client use off-screen rendering (OSR) into pixel buffers. |
| **`isTransparent`** | `Boolean` | Whether the web view canvas background is transparent. |
| **`framework`** | `KromiumUiFramework?` | Target UI framework (COMPOSE, SWING, JAVAFX, SWT, AWT) for OSR canvas factory resolution. |
| **`sslErrorPolicy`** | `SslErrorPolicy` | SSL certificate verification policy (Strict, IgnoreAll, AllowHostList, Custom). |
| **`initialWidth`** | `Int` | Initial viewport width in pixels. |
| **`initialHeight`** | `Int` | Initial viewport height in pixels. |

## Methods

### `default()`

```kotlin
@JvmStatic fun default(): KromiumClientConfig
```

Returns the default client configuration instance.

- **Returns:** `KromiumClientConfig`

### `builder()`

```kotlin
@JvmStatic fun builder(): Builder
```

Returns a new builder for KromiumClientConfig.

- **Returns:** `Builder`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.config.KromiumClientConfig
import org.daviante.kromium.api.ui.KromiumUiFramework

val clientConfig = KromiumClientConfig.builder()
    .framework(KromiumUiFramework.COMPOSE)
    .doNotTrack(true)
    .initialWidth(1400)
    .initialHeight(900)
    .build()
```

### Pure Java (java)

```java
import org.daviante.kromium.api.config.KromiumClientConfig;
import org.daviante.kromium.api.ui.KromiumUiFramework;

public class ClientConfigFactory {
    public static KromiumClientConfig create() {
        return KromiumClientConfig.builder()
            .framework(KromiumUiFramework.SWING)
            .doNotTrack(true)
            .build();
    }
}
```

