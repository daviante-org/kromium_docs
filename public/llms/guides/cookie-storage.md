# Cookie & Storage Management

> Read, set, and delete cookies, clear browser cache, and manage Local Storage via KromiumCookieManager and KromiumStorage facades.

- **Category:** Core API
- **Read Time:** 6 min
- **Last Updated:** 2026-10-01

## Global Cookie Manager

The engine-level `KromiumCookieManager` provides full cookie CRUD operations across all domains. Access it via `engine.cookieManager`.

| Method | Description |
| :--- | :--- |
| `getCookies(url)` | Retrieves all cookies for a URL as key-value map (suspend) |
| `getCookie(url, name)` | Retrieves a specific cookie by name (suspend) |
| `getAllCookies()` | Retrieves all cookies across all domains (suspend) |
| `setCookie(url, name, value, ...)` | Sets a cookie with domain, path, secure, httpOnly, expiry |
| `deleteCookie(url, name)` | Deletes a specific cookie |
| `clearCookies()` | Deletes all cookies from the store |
| `flush()` | Flushes the cookie store to disk for persistence |

```kotlin
// Read all cookies for a URL
val cookies = engine.cookieManager.getCookies("https://example.com")
println("Session: ${cookies["session_id"]}")

// Set a secure, HTTP-only cookie with expiry
engine.cookieManager.setCookie(
    url = "https://example.com",
    name = "auth_token",
    value = "jwt_value_here",
    domain = ".example.com",
    path = "/",
    isSecure = true,
    isHttpOnly = true,
    expires = Date(System.currentTimeMillis() + 86_400_000L)
)

// Delete and flush
engine.cookieManager.deleteCookie("https://example.com", "auth_token")
engine.cookieManager.flush()
```

## Browser-Level Storage Facade

Each browser instance also exposes a `KromiumStorage` facade (`browser.storage`) for per-page cookie and web storage operations including clearing Local Storage, Session Storage, and browsing data.

```kotlin
// Set a cookie from browser context
browser.storage.setCookie(
    name = "theme",
    value = "dark",
    domain = ".myapp.com"
)

// Clear all web storage (Local Storage + Session Storage)
browser.storage.clearWebStorageAsync().thenAccept { success ->
    println("Web storage cleared: $success")
}

// Clear all browsing data at once
browser.storage.clearBrowsingDataAsync(
    clearCookies = true,
    clearStorage = true
)
```

## Java CompletableFuture Interop

All suspend cookie methods have `*Async` counterparts returning Java `CompletableFuture` for seamless Java interop.

```java
// Java: Read cookies asynchronously
engine.getCookieManager().getCookiesAsync("https://example.com")
    .thenAccept(cookies -> {
        System.out.println("Found " + cookies.size() + " cookies");
    });

// Java: Get all cookies across all domains
engine.getCookieManager().getAllCookiesAsync()
    .thenAccept(allCookies -> {
        for (KromiumCookie cookie : allCookies) {
            System.out.println(cookie.getName() + " = " + cookie.getValue());
        }
    });
```

## Related APIs

- [KromiumCookieManager](/llms/api/kromium-cookie-manager.md)
- [KromiumCookie](/llms/api/kromium-cookie.md)
- [KromiumStorage](/llms/api/kromium-storage.md)

