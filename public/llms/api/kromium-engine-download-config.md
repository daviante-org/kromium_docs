# KromiumEngineDownloadConfig

```kotlin
data class KromiumEngineDownloadConfig internal constructor(
    val installDir: File?,
    val source: KromiumEngineDownloadSource
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.bootstrap`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`installDir`** | `File?` | Custom directory to install the downloaded engine binaries. |
| **`source`** | `KromiumEngineDownloadSource` | Download source strategy for acquiring binaries. |

