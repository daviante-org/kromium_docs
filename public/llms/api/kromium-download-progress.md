# KromiumDownloadProgress

```kotlin
data class KromiumDownloadProgress(
    val bytesRead: Long,
    val totalBytes: Long?,
    val fraction: Float
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.download`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`bytesRead`** | `Long` | Number of bytes downloaded so far. |
| **`totalBytes`** | `Long?` | Expected total file size in bytes, or null if unknown. |
| **`fraction`** | `Float` | Fraction of download completed from 0.0f to 1.0f. |
| **`percentage`** | `Int` | Calculated percentage (0 to 100). |

