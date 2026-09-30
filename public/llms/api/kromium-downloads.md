# KromiumDownloads

```kotlin
interface KromiumDownloads
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.download`
- **Since Version:** v1.0.0.150-b11

## Methods

### `startDownload()`

```kotlin
fun startDownload(url: String)
```

Starts a download of the given URL.


### `cancelDownload()`

```kotlin
fun cancelDownload(downloadId: Int): Boolean
```

Cancels an active download by its ID.


### `pauseDownload()`

```kotlin
fun pauseDownload(downloadId: Int): Boolean
```

Pauses an active download by its ID.


### `resumeDownload()`

```kotlin
fun resumeDownload(downloadId: Int): Boolean
```

Resumes a paused download by its ID.


### `isDownloadPaused()`

```kotlin
fun isDownloadPaused(downloadId: Int): Boolean
```

Checks if a download is currently paused.


