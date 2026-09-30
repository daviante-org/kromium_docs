# KromiumPermissionRequest

```kotlin
data class KromiumPermissionRequest(
    val url: String,
    val origin: String,
    val requestedTypes: Set<KromiumPermissionType>,
    val rawFlags: Int
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.permission`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`url`** | `String` | Full URL of the frame initiating the permission request. |
| **`origin`** | `String` | Extracted web origin. |
| **`requestedTypes`** | `Set<KromiumPermissionType>` | The set of permission types being requested. |
| **`rawFlags`** | `Int` | The raw Chromium media permission bitmask. |

## Methods

### `hasAudio()`

```kotlin
fun hasAudio(): Boolean
```

True if the request seeks microphone access.


### `hasVideo()`

```kotlin
fun hasVideo(): Boolean
```

True if the request seeks camera / webcam video capture access.


### `hasScreenShare()`

```kotlin
fun hasScreenShare(): Boolean
```

True if the request seeks screen sharing / desktop video capture access.


### `hasDesktopAudio()`

```kotlin
fun hasDesktopAudio(): Boolean
```

True if the request seeks system audio capture access.


### `contains()`

```kotlin
fun contains(type: KromiumPermissionType): Boolean
```

True if the request includes the specified permission type.


