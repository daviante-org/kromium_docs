# KromiumProxy

```kotlin
sealed class KromiumProxy
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.proxy`
- **Category:** Network & Security
- **Since Version:** v1.0.0.150-b11

## Description

Defines the proxy strategy for the Kromium browser engine and client sessions. Supports Operating System Default, Direct bypass, WPAD Auto-Discovery, PAC script URLs, HTTP/HTTPS secure tunnels, SOCKS5 (with remote DNS resolution), and Multi-Protocol routing.

### When to Use

Configure in KromiumBrowserConfig, KromiumClientConfig, or dynamically at runtime via client.updateProxy(proxy) or browser.proxyManager.updateProxy(proxy).

## States & Variants

| Variant | Declaration | Description |
| :--- | :--- | :--- |
| **`KromiumProxy.System`** | `data object System : KromiumProxy()` | Uses operating system default proxy configuration. |
| **`KromiumProxy.Direct`** | `data object Direct : KromiumProxy()` | Bypasses all proxies and connects directly to destination hosts. |
| **`KromiumProxy.AutoDetect`** | `data object AutoDetect : KromiumProxy()` | Automatically discovers proxy settings using Web Proxy Auto-Discovery (WPAD) via DHCP/DNS queries. |
| **`KromiumProxy.Pac`** | `data class Pac(val pacUrl: String) : KromiumProxy()` | Connects using a Proxy Auto-Configuration (PAC) script URL (e.g. http://pac.corp.internal/wpad.dat). |
| **`KromiumProxy.Http`** | `data class Http @JvmOverloads constructor(val host: String, val port: Int, val username: String? = null, val password: String? = null, val isSecure: Boolean = false, val bypassList: List<String> = emptyList()) : KromiumProxy()` | Connects via an HTTP or HTTPS forward proxy with optional credentials and bypass list. |
| **`KromiumProxy.Socks5`** | `data class Socks5 @JvmOverloads constructor(val host: String, val port: Int, val username: String? = null, val password: String? = null, val remoteDns: Boolean = true, val bypassList: List<String> = emptyList()) : KromiumProxy()` | Connects via a SOCKS5 (or SOCKS4) proxy with remote DNS resolution to prevent DNS leaks. |
| **`KromiumProxy.MultiProtocol`** | `data class MultiProtocol @JvmOverloads constructor(val http: String? = null, val https: String? = null, val ftp: String? = null, val socks: String? = null, val bypassList: List<String> = emptyList()) : KromiumProxy()` | Connects using separate, dedicated proxies for different network protocols (HTTP vs HTTPS vs SOCKS). |

## Methods

### `toCommandLineArgs()`

```kotlin
abstract fun toCommandLineArgs(): List<String>
```

Generates Chromium command-line switches (e.g. --proxy-server, --proxy-bypass-list) for process initialization.

- **Returns:** `List<String>`

### `toPreferenceMap()`

```kotlin
abstract fun toPreferenceMap(): Map<String, Any>
```

Generates the CEF preference dictionary required for dynamic runtime proxy reconfiguration.

- **Returns:** `Map<String, Any>`

### `validate()`

```kotlin
open fun validate()
```

Validates proxy parameters and throws KromiumException.InvalidConfig if blank or out of range.

- **Returns:** `Unit`
- **Throws:** `KromiumException.InvalidConfig`

### `getCredentials()`

```kotlin
open fun getCredentials(host: String?, port: Int? = null): Pair<String, String>?
```

Returns authentication credentials (username to password) configured for this proxy if the requested target matches.

- **Returns:** `Pair<String, String>?`

### `system()`

```kotlin
@JvmStatic fun system(): KromiumProxy
```

Factory method returning the System singleton proxy.

- **Returns:** `KromiumProxy`

### `direct()`

```kotlin
@JvmStatic fun direct(): KromiumProxy
```

Factory method returning the Direct singleton proxy.

- **Returns:** `KromiumProxy`

### `autoDetect()`

```kotlin
@JvmStatic fun autoDetect(): KromiumProxy
```

Factory method returning the AutoDetect WPAD singleton proxy.

- **Returns:** `KromiumProxy`

### `pac()`

```kotlin
@JvmStatic fun pac(pacUrl: String): KromiumProxy
```

Factory method creating a PAC script proxy.

- **Returns:** `KromiumProxy`

### `http()`

```kotlin
@JvmStatic @JvmOverloads fun http(host: String, port: Int, username: String? = null, password: String? = null, isSecure: Boolean = false, bypassList: List<String> = emptyList()): KromiumProxy
```

Factory method creating an authenticated or unauthenticated HTTP forward proxy.

- **Returns:** `KromiumProxy`

### `https()`

```kotlin
@JvmStatic @JvmOverloads fun https(host: String, port: Int, username: String? = null, password: String? = null, bypassList: List<String> = emptyList()): KromiumProxy
```

Factory method creating an authenticated secure HTTPS tunnel forward proxy.

- **Returns:** `KromiumProxy`

### `socks5()`

```kotlin
@JvmStatic @JvmOverloads fun socks5(host: String, port: Int, username: String? = null, password: String? = null, remoteDns: Boolean = true, bypassList: List<String> = emptyList()): KromiumProxy
```

Factory method creating a SOCKS5 proxy with remote DNS leak prevention.

- **Returns:** `KromiumProxy`

### `multiProtocol()`

```kotlin
@JvmStatic @JvmOverloads fun multiProtocol(http: String? = null, https: String? = null, ftp: String? = null, socks: String? = null, bypassList: List<String> = emptyList()): KromiumProxy
```

Factory method creating a MultiProtocol proxy router.

- **Returns:** `KromiumProxy`

## Exceptions

| Exception | When Thrown |
| :--- | :--- |
| **`KromiumException.InvalidConfig`** |  |

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.proxy.KromiumProxy
import org.daviante.kromium.api.core.KromiumBrowser

fun applyProxy(browser: KromiumBrowser) {
    val proxy = KromiumProxy.http("127.0.0.1", 8080)
    browser.proxyManager.updateProxy(proxy)
}
```

### Pure Java (java)

```java
import org.daviante.kromium.api.proxy.KromiumProxy;
import org.daviante.kromium.api.core.KromiumBrowser;

public class ProxySetup {
    public static void configure(KromiumBrowser browser) {
        KromiumProxy proxy = KromiumProxy.socks5("127.0.0.1", 1080);
        browser.getProxyManager().updateProxy(proxy);
    }
}
```

