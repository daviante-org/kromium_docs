# KromiumCookie

```kotlin
data class KromiumCookie(val name: String, val value: String, val domain: String?, val path: String, val isSecure: Boolean, val isHttpOnly: Boolean, val hasExpires: Boolean, val expires: Date?)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.cookie`
- **Category:** Storage & Cookies
- **Since Version:** v1.0.0.150-b11

## Description

Represents a single HTTP cookie in the Kromium engine, capturing name, value, domain, path, security flags (isSecure, isHttpOnly), and expiration date.

### When to Use

Used with KromiumCookieManager to inspect, set, or delete individual HTTP cookies across browser sessions.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`name`** | `String` | The cookie name identifier. |
| **`value`** | `String` | The cookie value string. |
| **`domain`** | `String?` | The domain scope of the cookie (e.g. ".example.com"), or null for origin-only. |
| **`path`** | `String` | The URL path scope of the cookie (e.g. "/"). |
| **`isSecure`** | `Boolean` | Whether the cookie is restricted to secure HTTPS connections. |
| **`isHttpOnly`** | `Boolean` | Whether the cookie is hidden from document.cookie JavaScript access. |
| **`hasExpires`** | `Boolean` | Whether the cookie specifies a fixed expiration date. |
| **`expires`** | `Date?` | The expiration timestamp, or null for session cookies. |

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.cookie.KromiumCookie
import java.util.Date

val cookie = KromiumCookie(
    name = "session_id",
    value = "xyz123",
    domain = ".example.com",
    path = "/",
    isSecure = true,
    isHttpOnly = true,
    hasExpires = true,
    expires = Date(System.currentTimeMillis() + 86400000L)
)
```

### Pure Java (java)

```java
import org.daviante.kromium.api.cookie.KromiumCookie;
import java.util.Date;

public class CookieFactory {
    public static KromiumCookie createSessionCookie(String name, String value) {
        return new KromiumCookie(
            name,
            value,
            "example.com",
            "/",
            true,
            true,
            false,
            null
        );
    }
}
```

