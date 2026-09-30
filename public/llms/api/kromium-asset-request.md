# KromiumAssetRequest

```kotlin
data class KromiumAssetRequest @JvmOverloads constructor(
    val url: String,
    val method: String = "GET",
    val scheme: String = "",
    val domain: String = "",
    val path: String = "/",
    val queryString: String? = null,
    val queryParameters: Map<String, String> = emptyMap(),
    val headers: Map<String, String> = emptyMap()
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.scheme`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`url`** | `String` | The full URL string of the intercepted request. |
| **`method`** | `String` | The HTTP method (e.g. 'GET', 'POST'). |
| **`scheme`** | `String` | The protocol scheme. |
| **`domain`** | `String` | The host or authority domain component. |
| **`path`** | `String` | The absolute request path without query strings. |
| **`queryString`** | `String?` | The raw URL query string, or null. |
| **`queryParameters`** | `Map<String, String>` | Parsed query parameters map. |
| **`headers`** | `Map<String, String>` | Request headers map. |

## Methods

### `getHeader()`

```kotlin
fun getHeader(name: String): String?
```

Retrieves the value of a specific HTTP header in a case-insensitive manner.


### `getQueryParam()`

```kotlin
fun getQueryParam(key: String): String?
```

Retrieves a query parameter by key.


