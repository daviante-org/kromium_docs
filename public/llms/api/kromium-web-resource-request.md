# KromiumWebResourceRequest

```kotlin
data class KromiumWebResourceRequest(
    val url: String,
    val method: String,
    val headers: MutableMap<String, String>,
    val isNavigation: Boolean,
    val isDownload: Boolean,
    val resourceType: KromiumResourceType = KromiumResourceType.UNKNOWN,
    val requestInitiator: String? = null
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.network`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`url`** | `String` | The destination URL of the request. |
| **`method`** | `String` | HTTP method (GET, POST, etc.). |
| **`headers`** | `MutableMap<String, String>` | Mutable map of request headers. |
| **`isNavigation`** | `Boolean` | Whether this request represents a top-level or frame navigation. |
| **`isDownload`** | `Boolean` | Whether this request initiates a file download. |
| **`resourceType`** | `KromiumResourceType` | The resource type (e.g., SCRIPT, IMAGE, XHR). |
| **`requestInitiator`** | `String?` | The origin URL that initiated this request, or null. |

