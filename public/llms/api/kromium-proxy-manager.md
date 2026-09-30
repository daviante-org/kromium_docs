# KromiumProxyManager

```kotlin
interface KromiumProxyManager
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.proxy`
- **Category:** Network & Security
- **Since Version:** v1.0.0.150-b11

## Description

Facade for managing the proxy settings of the browser at runtime without restarting the browser engine or recreating the browser instance.

### When to Use

Access via browser.proxyManager to dynamically update proxy routing for an active browser instance.

## Methods

### `updateProxy()`

```kotlin
fun updateProxy(proxy: KromiumProxy): Boolean
```

Dynamically updates the proxy for this browser session.

- **Returns:** `Boolean`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.core.KromiumBrowser
import org.daviante.kromium.api.proxy.KromiumProxy

fun switchProxy(browser: KromiumBrowser, proxyHost: String, proxyPort: Int) {
    val proxy = KromiumProxy.http(proxyHost, proxyPort)
    val success = browser.proxyManager.updateProxy(proxy)
    println("Proxy switch success: $success")
}
```

### Pure Java (java)

```java
import org.daviante.kromium.api.core.KromiumBrowser;
import org.daviante.kromium.api.proxy.KromiumProxy;

public class ProxySwitcher {
    public static void setDirect(KromiumBrowser browser) {
        browser.getProxyManager().updateProxy(KromiumProxy.direct());
    }
}
```

