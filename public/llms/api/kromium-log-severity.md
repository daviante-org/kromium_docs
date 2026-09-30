# KromiumLogSeverity

```kotlin
enum class KromiumLogSeverity
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.config`
- **Category:** Configuration
- **Since Version:** v1.0.0.150-b11

## Description

Log severity levels for the Chromium engine. Controls the verbosity of native CEF log output written to the Kromium log file.

### When to Use

Set via KromiumLoggingConfig when building KromiumConfig to control native log verbosity. Use DISABLE in production to suppress all native logging, or VERBOSE during debugging to capture full Chromium internals.

## States & Variants

| Variant | Declaration | Description |
| :--- | :--- | :--- |
| **`DEFAULT`** | `DEFAULT` | Default Chromium log severity. Equivalent to INFO in most configurations. |
| **`VERBOSE`** | `VERBOSE` | Most verbose logging level. Captures all internal Chromium diagnostic output. |
| **`INFO`** | `INFO` | Informational messages about normal engine operation. |
| **`WARNING`** | `WARNING` | Warnings about potential issues that do not prevent operation. |
| **`ERROR`** | `ERROR` | Error conditions that may affect engine functionality. |
| **`FATAL`** | `FATAL` | Fatal errors that cause immediate engine termination. |
| **`DISABLE`** | `DISABLE` | Disables all native Chromium log output. Recommended for production deployments. |

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.config.KromiumConfig
import org.daviante.kromium.api.config.KromiumLogSeverity

val config = KromiumConfig.builder()
    .loggingConfig { log ->
        log.severity(KromiumLogSeverity.DISABLE)
    }
    .build()
```

### Pure Java (java)

```java
import org.daviante.kromium.api.config.KromiumConfig;
import org.daviante.kromium.api.config.KromiumLogSeverity;

KromiumConfig config = KromiumConfig.builder()
    .loggingConfig(log -> log.severity(KromiumLogSeverity.WARNING))
    .build();
```

