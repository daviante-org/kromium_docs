# KromiumBeforeDownloadListener

```kotlin
fun interface KromiumBeforeDownloadListener
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.download`
- **Since Version:** v1.0.0.150-b11

## Methods

### `onBeforeDownload()`

```kotlin
fun onBeforeDownload(item: KromiumDownloadItem, suggestedFileName: String): String?
```

Intercepts a download request before it starts. Returns the absolute path where the file should be saved, null to use the default path, or an empty string "" to cancel the download.


