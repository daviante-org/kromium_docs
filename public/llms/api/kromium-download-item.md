# KromiumDownloadItem

```kotlin
data class KromiumDownloadItem(
    val id: Int,
    val url: String,
    val suggestedFileName: String,
    val totalBytes: Long,
    val receivedBytes: Long,
    val percentComplete: Int,
    val speed: Long,
    val isInProgress: Boolean,
    val isComplete: Boolean,
    val isCanceled: Boolean,
    val isPaused: Boolean = false,
    val fullPath: String = ""
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.download`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`id`** | `Int` | Unique identifier of the download. |
| **`url`** | `String` | Source URL of the download. |
| **`suggestedFileName`** | `String` | Suggested filename for the download item. |
| **`totalBytes`** | `Long` | Total size of the file in bytes, or -1 if unknown. |
| **`receivedBytes`** | `Long` | Number of bytes received so far. |
| **`percentComplete`** | `Int` | Download completion percentage (0-100), or -1 if indeterminate. |
| **`speed`** | `Long` | Estimated transfer speed in bytes per second. |
| **`isInProgress`** | `Boolean` | Whether the download is currently in progress. |
| **`isComplete`** | `Boolean` | Whether the download has finished successfully. |
| **`isCanceled`** | `Boolean` | Whether the download was canceled. |
| **`isPaused`** | `Boolean` | Whether the download is paused. |
| **`fullPath`** | `String` | Destination file path on disk. |

