# KromiumCookieManager

```kotlin
interface KromiumCookieManager
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.cookie`
- **Category:** Storage & Cookies
- **Since Version:** v1.0.0.150-b11

## Description

Interface for managing cookies across the browser engine. Provides suspending Kotlin coroutine and Java CompletableFuture APIs to query, set, delete, clear, and flush HTTP cookies to disk.

### When to Use

Obtain via engine.cookieManager to manipulate cookies globally across all browser sessions.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`timeoutMs`** | `Long` | Timeout for cookie retrieval operations in milliseconds. |

## Methods

### `getCookies()`

```kotlin
suspend fun getCookies(url: String, includeHttpOnly: Boolean = true): Map<String, String>
```

Retrieves all cookies for the specified url as a key-value map.

- **Returns:** `Map<String, String>`

### `getCookiesAsync()`

```kotlin
fun getCookiesAsync(url: String, includeHttpOnly: Boolean = true): CompletableFuture<Map<String, String>>
```

Asynchronously retrieves all cookies for url returning a Java CompletableFuture.

- **Returns:** `CompletableFuture<Map<String, String>>`

### `getCookie()`

```kotlin
suspend fun getCookie(url: String, name: String): String?
```

Retrieves the value of a specific cookie by name for url.

- **Returns:** `String?`

### `getCookieAsync()`

```kotlin
fun getCookieAsync(url: String, name: String): CompletableFuture<String?>
```

Asynchronously retrieves a specific cookie by name for url returning a Java CompletableFuture.

- **Returns:** `CompletableFuture<String?>`

### `getAllCookies()`

```kotlin
suspend fun getAllCookies(): List<KromiumCookie>
```

Retrieves all cookies across all domains stored in the engine's global cookie store.

- **Returns:** `List<KromiumCookie>`

### `getAllCookiesAsync()`

```kotlin
fun getAllCookiesAsync(): CompletableFuture<List<KromiumCookie>>
```

Asynchronously retrieves all cookies across all domains stored in the global cookie store returning a Java CompletableFuture.

- **Returns:** `CompletableFuture<List<KromiumCookie>>`

### `setCookie()`

```kotlin
fun setCookie(url: String, name: String, value: String, domain: String? = null, path: String = "/", isSecure: Boolean = false, isHttpOnly: Boolean = false, expires: Date? = null): Boolean
```

Sets a cookie for the specified url.

- **Returns:** `Boolean`

### `deleteCookie()`

```kotlin
fun deleteCookie(url: String, name: String): Boolean
```

Deletes a specific cookie for the specified url.

- **Returns:** `Boolean`

### `clearCookies()`

```kotlin
fun clearCookies(): Boolean
```

Deletes all cookies from the cookie store.

- **Returns:** `Boolean`

### `flush()`

```kotlin
fun flush(): Boolean
```

Flushes the cookie store to disk to ensure session persistence.

- **Returns:** `Boolean`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.core.KromiumEngine

suspend fun manageCookies(engine: KromiumEngine) {
    val cookieManager = engine.cookieManager
    cookieManager.setCookie(
        url = "https://example.com",
        name = "auth_token",
        value = "secret-token-123",
        isSecure = true,
        isHttpOnly = true
    )
    val token = cookieManager.getCookie("https://example.com", "auth_token")
    cookieManager.flush()
}
```

### Pure Java (java)

```java
import org.daviante.kromium.api.core.KromiumEngine;
import org.daviante.kromium.api.cookie.KromiumCookieManager;

public class CookieHandler {
    public static void clearAll(KromiumEngine engine) {
        KromiumCookieManager cm = engine.getCookieManager();
        cm.clearCookies();
        cm.flush();
    }
}
```

