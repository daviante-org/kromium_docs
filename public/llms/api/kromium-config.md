# KromiumConfig

```kotlin
@ConsistentCopyVisibility data class KromiumConfig internal constructor(val downloadConfig: KromiumEngineDownloadConfig, val browserConfig: KromiumBrowserConfig, val hardwareConfig: KromiumHardwareConfig, val securityConfig: KromiumSecurityConfig, val loggingConfig: KromiumLoggingConfig)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.config`
- **Category:** Configuration
- **Since Version:** v1.0.0.150-b11

## Description

The master configuration object for the Kromium engine. Composed of specialized domain sub-configurations for engine downloading, general browser parameters, hardware/GPU acceleration, enterprise security, and logging severity.

### When to Use

Instantiate via KromiumConfig.builder() to configure the engine prior to calling Kromium.createEngine(config, provider) or provider.createEngine(config).

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`downloadConfig`** | `KromiumEngineDownloadConfig` | Engine downloading, CDN release channels, and installation path configurations. |
| **`browserConfig`** | `KromiumBrowserConfig` | General browser settings, cache directory, remote debugging port, proxy, and custom schemes. |
| **`hardwareConfig`** | `KromiumHardwareConfig` | Host OS process model and GPU hardware acceleration options. |
| **`securityConfig`** | `KromiumSecurityConfig` | Chromium sandbox controls, telemetry blockers, WebRTC IP policies, and HTTP auth allowlists. |
| **`loggingConfig`** | `KromiumLoggingConfig` | Engine native logging severity level and log destination settings. |

## Methods

### `validate()`

```kotlin
fun validate()
```

Validates this configuration and throws KromiumException.InvalidConfig if any values are invalid (e.g. remoteDebuggingPort outside 0..65535 or path traversal in cachePath).

- **Returns:** `Unit`
- **Throws:** `KromiumException.InvalidConfig`

### `builder()`

```kotlin
@JvmStatic fun builder(): Builder
```

Returns a new builder for KromiumConfig initialized with default values.

- **Returns:** `Builder`

## Exceptions

| Exception | When Thrown |
| :--- | :--- |
| **`KromiumException.InvalidConfig`** |  |

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.config.KromiumConfig
import org.daviante.kromium.api.config.KromiumGpuMode

val config = KromiumConfig.builder()
    .browserConfig { it.remoteDebuggingPort(9222) }
    .hardwareConfig { it.gpuMode(KromiumGpuMode.HARDWARE) }
    .securityConfig { it.sandboxEnabled(true).doNotTrack(true) }
    .build()

config.validate()
```

### Pure Java (java)

```java
import org.daviante.kromium.api.config.KromiumConfig;
import org.daviante.kromium.api.config.KromiumBrowserConfig;

public class ConfigFactory {
    public static KromiumConfig create() {
        KromiumBrowserConfig browserConfig = KromiumBrowserConfig.builder()
            .remoteDebuggingPort(9222)
            .build();

        return KromiumConfig.builder()
            .browserConfig(browserConfig)
            .build();
    }
}
```

