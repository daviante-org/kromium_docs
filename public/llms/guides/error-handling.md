# Error Handling & Debugging

> Handle Kromium's sealed exception hierarchy, recover from download failures, diagnose GPU errors, and monitor console messages for debugging.

- **Category:** Core API
- **Read Time:** 7 min
- **Last Updated:** 2026-10-01

## KromiumException Sealed Hierarchy

All Kromium errors extend the sealed class `KromiumException` which provides an `errorCode` (enum) and `isRecoverable` flag for programmatic error handling.

| Exception | Error Code | Recoverable | When Thrown |
| :--- | :--- | :---: | :--- |
| `NotInitialized` | `INITIALIZATION_ERROR` | ❌ | Engine used before `initialize()` |
| `Disposed` | `INITIALIZATION_ERROR` | ❌ | Operations attempted after `dispose()` |
| `UnsupportedPlatform` | `UNSUPPORTED_PLATFORM` | ❌ | Unsupported OS/architecture combination |
| `InstallationFailed` | `INSTALLATION_FAILED` | ✅ | Cannot prepare installation directory |
| `AutoDownloadDisabled` | `DOWNLOAD_DISABLED` | ❌ | No binaries and auto-download is off |
| `NoBundleAvailable` | `NO_BUNDLE_AVAILABLE` | ❌ | No compatible JCEF bundle for platform |
| `DownloadFailed` | `DOWNLOAD_FAILED` | ✅ | Network failure downloading engine |
| `ChecksumMismatch` | `CHECKSUM_MISMATCH` | ✅ | Archive hash doesn't match (retry) |
| `ExtractionFailed` | `EXTRACTION_FAILED` | ✅ | Cannot extract engine archive |
| `MaliciousArchiveEntry` | `MALICIOUS_ARCHIVE` | ❌ | Directory traversal in archive |
| `BootstrapFailed` | `BOOTSTRAP_FAILED` | ❌ | CEF native bootstrap failure |
| `InstallationCorrupted` | `INSTALLATION_CORRUPTED` | ✅ | Corrupted binaries (re-download) |
| `JsEvaluationTimeout` | `JS_TIMEOUT` | ✅ | JavaScript evaluation timed out |
| `InvalidConfig` | `INVALID_CONFIG` | ❌ | Invalid configuration parameters |
| `ProxyError` | `PROXY_ERROR` | ✅ | Proxy configuration error |
| `PdfPrintFailed` | `PDF_PRINT_FAILED` | ✅ | PDF export failure |
| `FrameworkRequired` | `FRAMEWORK_REQUIRED` | ❌ | No UI framework specified for OSR |
| `CanvasNotAvailable` | `CANVAS_NOT_AVAILABLE` | ❌ | Missing kromium-swing/compose/etc on classpath |

## Pattern-Matching Error Recovery

Use Kotlin `when` exhaustive matching or Java `instanceof` checks on the sealed hierarchy for type-safe error recovery.

```kotlin
try {
    engine.initialize()
} catch (e: KromiumException) {
    when (e) {
        is KromiumException.DownloadFailed -> {
            println("Download failed from ${e.url}, retrying...")
            engine.initialize() // Retry
        }
        is KromiumException.ChecksumMismatch -> {
            println("Checksum mismatch: expected=${e.expected}, actual=${e.actual}")
            // Delete corrupted file and retry
        }
        is KromiumException.UnsupportedPlatform -> {
            println("Platform not supported: ${e.os} / ${e.arch}")
        }
        is KromiumException.CanvasNotAvailable -> {
            println("Add kromium-${e.framework.name.lowercase()} to your dependencies")
        }
        else -> {
            if (e.isRecoverable) {
                println("Recoverable error [${e.errorCode}]: ${e.message}")
            } else {
                throw e
            }
        }
    }
}
```

## Console Message Monitoring

Intercept browser console output (`console.log`, `console.error`, `console.warn`) via `KromiumConsoleMessageListener` for runtime debugging and error tracking.

```kotlin
client.consoleMessageListener = KromiumConsoleMessageListener { message ->
    val level = message.level // INFO, WARNING, ERROR
    val text = message.message
    val source = message.source
    val line = message.lineNumber
    println("[$level] $source:$line — $text")
}
```

## Page Load Error Handling

Detect navigation failures (DNS errors, timeouts, certificate rejections) with `KromiumLoadErrorListener`.

```kotlin
client.loadErrorListener = KromiumLoadErrorListener { error ->
    println("Load error: ${error.errorCode} — ${error.errorText}")
    println("Failed URL: ${error.failedUrl}")
}
```

## Related APIs

- [KromiumException](/llms/api/kromium-exception.md)
- [KromiumErrorCode](/llms/api/kromium-error-code.md)
- [KromiumConsoleMessage](/llms/api/kromium-console-message.md)
- [KromiumConsoleMessageListener](/llms/api/kromium-console-message-listener.md)
- [KromiumLoadError](/llms/api/kromium-load-error.md)
- [KromiumLoadErrorListener](/llms/api/kromium-load-error-listener.md)

