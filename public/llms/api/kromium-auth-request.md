# KromiumAuthRequest

```kotlin
data class KromiumAuthRequest(
    val isProxy: Boolean,
    val host: String,
    val port: Int,
    val realm: String,
    val scheme: String
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.network`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`isProxy`** | `Boolean` | Whether the challenge was issued by an HTTP/HTTPS proxy. |
| **`host`** | `String` | Hostname requiring authentication. |
| **`port`** | `Int` | Port number requiring authentication. |
| **`realm`** | `String` | Authentication realm specified by the challenge. |
| **`scheme`** | `String` | Authentication scheme (e.g., Basic, Digest, NTLM). |

