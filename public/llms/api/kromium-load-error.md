# KromiumLoadError

```kotlin
data class KromiumLoadError(
    val errorCode: Int,
    val errorText: String,
    val failedUrl: String
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.navigation`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`errorCode`** | `Int` | Numeric error code indicating the cause of the failure. |
| **`errorText`** | `String` | Human-readable description of the error. |
| **`failedUrl`** | `String` | The URL that failed to load. |

