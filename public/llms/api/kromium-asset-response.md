# KromiumAssetResponse

```kotlin
class KromiumAssetResponse @JvmOverloads constructor(
    val statusCode: Int = 200,
    val statusText: String = "OK",
    val mimeType: String = "application/octet-stream",
    val contentLength: Long? = null,
    val headers: Map<String, String> = emptyMap(),
    val openStream: () -> InputStream
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.scheme`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`statusCode`** | `Int` | HTTP response status code. |
| **`statusText`** | `String` | HTTP status line description. |
| **`mimeType`** | `String` | MIME Content-Type of payload. |
| **`contentLength`** | `Long?` | Total content length in bytes if known. |
| **`headers`** | `Map<String, String>` | HTTP response headers. |
| **`openStream`** | `() -> InputStream` | Lambda returning an InputStream to stream response data. |

## Methods

### `withHeader()`

```kotlin
fun withHeader(name: String, value: String): KromiumAssetResponse
```

Returns a new copy with the specified header added or replaced.


### `withHeaders()`

```kotlin
fun withHeaders(newHeaders: Map<String, String>): KromiumAssetResponse
```

Returns a new copy with multiple headers appended.


### `withCors()`

```kotlin
fun withCors(allowedOrigins: String = "*"): KromiumAssetResponse
```

Appends permissive CORS headers.


### `withCacheControl()`

```kotlin
fun withCacheControl(maxAgeSeconds: Int): KromiumAssetResponse
```

Sets standard Cache-Control header with max-age in seconds.


### `withNoCache()`

```kotlin
fun withNoCache(): KromiumAssetResponse
```

Sets Cache-Control: no-cache, no-store, must-revalidate.


