# KromiumAssetFilter

```kotlin
data class KromiumAssetFilter(
    val blockedExtensions: Set<String> = emptySet(),
    val blockedUrlPatterns: Set<String> = emptySet(),
    val blockedResourceTypes: Set<KromiumResourceType> = emptySet(),
    val blockFilter: ((request: KromiumWebResourceRequest) -> Boolean)? = null,
    val allowedExtensions: Set<String> = emptySet(),
    val allowedUrlPatterns: Set<String> = emptySet(),
    val allowedResourceTypes: Set<KromiumResourceType> = emptySet(),
    val allowFilter: ((request: KromiumWebResourceRequest) -> Boolean)? = null,
    val allowMainFrame: Boolean = true,
    val mode: AssetFilterMode = AssetFilterMode.BLOCKLIST
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.network`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`blockedExtensions`** | `Set<String>` | File extensions to block. |
| **`blockedUrlPatterns`** | `Set<String>` | Substrings or URL patterns to block. |
| **`blockedResourceTypes`** | `Set<KromiumResourceType>` | Resource types to block. |
| **`blockFilter`** | `((request: KromiumWebResourceRequest) -> Boolean)?` | Custom functional predicate to determine if a request should be blocked. |
| **`allowedExtensions`** | `Set<String>` | File extensions to explicitly allow/whitelist. |
| **`allowedUrlPatterns`** | `Set<String>` | Substrings or URL patterns to explicitly allow. |
| **`allowedResourceTypes`** | `Set<KromiumResourceType>` | Resource types to explicitly allow. |
| **`allowFilter`** | `((request: KromiumWebResourceRequest) -> Boolean)?` | Custom functional predicate to determine if a request should be allowed. |
| **`allowMainFrame`** | `Boolean` | Whether to exempt the top-level main frame navigation from filtering. |
| **`mode`** | `AssetFilterMode` | Operating mode (BLOCKLIST or ALLOWLIST). |
| **`isEnabled`** | `Boolean` | Whether any filtering rules or allowlist mode are active. |

## Methods

### `shouldBlock()`

```kotlin
fun shouldBlock(request: KromiumWebResourceRequest): Boolean
```

Determines whether a given request should be blocked based on configured filter rules and mode.


