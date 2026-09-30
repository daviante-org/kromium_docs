# KromiumBrowserConfig

```kotlin
@ConsistentCopyVisibility data class KromiumBrowserConfig internal constructor(val cachePath: String?, val isHeadless: Boolean, val remoteDebuggingPort: Int, val commandLineArgs: List<String>, val customSchemes: List<KromiumCustomScheme>, val schemeRegistrations: List<KromiumSchemeRegistration> = emptyList(), val proxy: KromiumProxy? = null)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.config`
- **Category:** Configuration
- **Since Version:** v1.0.0.150-b11

## Description

General browser behavior and storage configuration for the Kromium engine. Controls disk cache directories, headless rendering mode, remote CDP debugging port, command-line arguments, custom URL scheme definitions, and default proxy rules.

### When to Use

Configure within KromiumConfig.builder().browserConfig { ... } to define engine-wide caching, debugging ports, and startup flags.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`cachePath`** | `String?` | Filesystem path where persistent cache and storage are kept, or null for in-memory incognito cache. |
| **`isHeadless`** | `Boolean` | Whether the engine operates in headless mode without desktop window handles. |
| **`remoteDebuggingPort`** | `Int` | Port for Chromium Remote Debugging Protocol (0 disables remote debugging). |
| **`commandLineArgs`** | `List<String>` | Additional native Chromium command-line switches passed during process initialization. |
| **`customSchemes`** | `List<KromiumCustomScheme>` | Custom URL schemes (e.g. app, res) registered with Chromium prior to engine startup. |
| **`schemeRegistrations`** | `List<KromiumSchemeRegistration>` | Initial custom scheme handler registrations binding asset handlers to scheme and domain names. |
| **`proxy`** | `KromiumProxy?` | Default proxy strategy applied to the engine and all client sessions. |

## Methods

### `builder()`

```kotlin
@JvmStatic fun builder(): Builder
```

Returns a new builder for KromiumBrowserConfig.

- **Returns:** `Builder`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.config.KromiumBrowserConfig
import org.daviante.kromium.api.proxy.KromiumProxy

val browserConfig = KromiumBrowserConfig.builder()
    .cachePath("/tmp/kromium-cache")
    .remoteDebuggingPort(9222)
    .proxy(KromiumProxy.system())
    .addArgs("--disable-gpu-shader-disk-cache", "--autoplay-policy=no-user-gesture-required")
    .build()
```

### Pure Java (java)

```java
import org.daviante.kromium.api.config.KromiumBrowserConfig;

public class BrowserConfigSetup {
    public static KromiumBrowserConfig create() {
        return KromiumBrowserConfig.builder()
            .isHeadless(false)
            .remoteDebuggingPort(9222)
            .build();
    }
}
```

