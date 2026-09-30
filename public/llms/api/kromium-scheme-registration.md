# KromiumSchemeRegistration

```kotlin
data class KromiumSchemeRegistration(
    val schemeName: String,
    val domainName: String?,
    val handler: KromiumAssetHandler
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.scheme`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`schemeName`** | `String` | The scheme protocol (e.g. 'app', 'https'). |
| **`domainName`** | `String?` | Optional domain/authority (e.g. 'myapp' or null for all domains). |
| **`handler`** | `KromiumAssetHandler` | The KromiumAssetHandler serving virtual responses for this scheme and domain. |

