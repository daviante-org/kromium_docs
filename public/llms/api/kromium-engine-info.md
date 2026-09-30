# KromiumEngineInfo

```kotlin
data class KromiumEngineInfo(
    val installDir: File,
    val isInstalled: Boolean,
    val engineVersion: String,
    val browserVersion: String,
    val providerMetadata: Map<String, String> = emptyMap()
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.core`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`installDir`** | `File` | Directory where the Kromium engine binaries are installed. |
| **`isInstalled`** | `Boolean` | Whether the engine is currently installed. |
| **`engineVersion`** | `String` | Version string of the engine. |
| **`browserVersion`** | `String` | Version string of the underlying browser. |
| **`providerMetadata`** | `Map<String, String>` | Additional metadata provided by the engine provider. |

