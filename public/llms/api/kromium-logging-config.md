# KromiumLoggingConfig

```kotlin
@ConsistentCopyVisibility data class KromiumLoggingConfig internal constructor(val logSeverity: KromiumLogSeverity)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.config`
- **Category:** Configuration
- **Since Version:** v1.0.0.150-b11

## Description

Logging configuration for the Kromium engine. Controls the verbosity of Chromium's internal native logging subsystem.

### When to Use

Configure within KromiumConfig.builder().loggingConfig { ... } to adjust native console logging or completely silence CEF diagnostic messages.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`logSeverity`** | `KromiumLogSeverity` | Log severity level: DEFAULT, VERBOSE, INFO, WARNING, ERROR, FATAL, or DISABLE. |

## Methods

### `builder()`

```kotlin
@JvmStatic fun builder(): Builder
```

Returns a new builder for KromiumLoggingConfig.

- **Returns:** `Builder`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.config.KromiumLoggingConfig
import org.daviante.kromium.api.config.KromiumLogSeverity

val loggingConfig = KromiumLoggingConfig.builder()
    .logSeverity(KromiumLogSeverity.WARNING)
    .build()
```

### Pure Java (java)

```java
import org.daviante.kromium.api.config.KromiumLoggingConfig;
import org.daviante.kromium.api.config.KromiumLogSeverity;

public class LoggingSetup {
    public static KromiumLoggingConfig create() {
        return KromiumLoggingConfig.builder()
            .logSeverity(KromiumLogSeverity.DISABLE)
            .build();
    }
}
```

