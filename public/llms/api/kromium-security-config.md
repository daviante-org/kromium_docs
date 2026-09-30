# KromiumSecurityConfig

```kotlin
@ConsistentCopyVisibility data class KromiumSecurityConfig internal constructor(val sandboxEnabled: Boolean, val blockRegistryAndTelemetry: Boolean, val doNotTrack: Boolean, val webrtcIpHandlingPolicy: String?, val authServerAllowlist: List<String>, val authNegotiateDelegateAllowlist: List<String>)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.config`
- **Category:** Configuration
- **Since Version:** v1.0.0.150-b11

## Description

Handles security boundaries, privacy headers, WebRTC IP leak prevention, enterprise NTLM/Kerberos authentication allowlists, and background telemetry blocking.

### When to Use

Configure within KromiumConfig.builder().securityConfig { ... } to lock down browser security, protect user privacy, or configure corporate SSO authentication.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`sandboxEnabled`** | `Boolean` | Whether native Chromium sandboxing is enforced. |
| **`blockRegistryAndTelemetry`** | `Boolean` | Whether to block Windows registry touchpoints and outgoing background telemetry (metrics, crash reports). |
| **`doNotTrack`** | `Boolean` | Whether DNT: 1 and Sec-GPC: 1 privacy headers are asserted. |
| **`webrtcIpHandlingPolicy`** | `String?` | WebRTC IP handling policy to prevent local/private IP address leaks (e.g. disable_non_proxied_udp). |
| **`authServerAllowlist`** | `List<String>` | Allowlist of servers permitted for integrated HTTP Windows authentication (NTLM/Kerberos). |
| **`authNegotiateDelegateAllowlist`** | `List<String>` | Allowlist of servers to which Kerberos credentials can be delegated. |

## Methods

### `builder()`

```kotlin
@JvmStatic fun builder(): Builder
```

Returns a new builder for KromiumSecurityConfig.

- **Returns:** `Builder`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.config.KromiumSecurityConfig

val securityConfig = KromiumSecurityConfig.builder()
    .sandboxEnabled(true)
    .blockRegistryAndTelemetry(true)
    .doNotTrack(true)
    .webrtcIpHandlingPolicy("disable_non_proxied_udp")
    .authServerAllowlist(listOf("*.corp.internal"))
    .build()
```

### Pure Java (java)

```java
import org.daviante.kromium.api.config.KromiumSecurityConfig;
import java.util.List;

public class SecuritySetup {
    public static KromiumSecurityConfig create() {
        return KromiumSecurityConfig.builder()
            .sandboxEnabled(true)
            .doNotTrack(true)
            .authServerAllowlist(List.of("*.corp.internal"))
            .build();
    }
}
```

