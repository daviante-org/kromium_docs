# KromiumCustomScheme

```kotlin
data class KromiumCustomScheme @JvmOverloads constructor(
    val schemeName: String,
    val isStandard: Boolean = true,
    val isLocal: Boolean = true,
    val isDisplayIsolated: Boolean = false,
    val isSecure: Boolean = true,
    val isCorsEnabled: Boolean = true,
    val isCspBypassing: Boolean = false,
    val isFetchEnabled: Boolean = true
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.scheme`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`schemeName`** | `String` | The name of the custom protocol scheme. |
| **`isStandard`** | `Boolean` | If true, treated as a standard scheme with authority/host component. |
| **`isLocal`** | `Boolean` | If true, treated as local, similar to file://. |
| **`isDisplayIsolated`** | `Boolean` | If true, can only be displayed from other origins with the same scheme. |
| **`isSecure`** | `Boolean` | If true, treated as secure (HTTPS-equivalent). |
| **`isCorsEnabled`** | `Boolean` | If true, CORS from/to this scheme are permitted. |
| **`isCspBypassing`** | `Boolean` | If true, CSP enforcements are bypassed. |
| **`isFetchEnabled`** | `Boolean` | If true, Fetch API is allowed for this scheme. |

