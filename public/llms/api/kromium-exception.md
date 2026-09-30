# KromiumException

```kotlin
sealed class KromiumException(@JvmField val errorCode: KromiumErrorCode, @JvmField val isRecoverable: Boolean, override val message: String, override val cause: Throwable? = null) : RuntimeException(message, cause)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.error`
- **Category:** Error Handling
- **Since Version:** v1.0.0.150-b11

## Description

Sealed exception hierarchy for all Kromium-specific errors. Provides an errorCode and isRecoverable flag for robust programmatic error handling and recovery.

### When to Use

Catch KromiumException or its typed subclasses when initializing the engine, configuring proxies, running JavaScript evaluations, exporting PDFs, or creating OSR browser canvases.

## States & Variants

| Variant | Declaration | Description |
| :--- | :--- | :--- |
| **`KromiumException.NotInitialized`** | `class NotInitialized : KromiumException(KromiumErrorCode.INITIALIZATION_ERROR, false, "Kromium is not initialized. Call Kromium.initialize() first.")` | Kromium is not initialized. Call Kromium.initialize() first. |
| **`KromiumException.Disposed`** | `class Disposed : KromiumException(KromiumErrorCode.INITIALIZATION_ERROR, false, "Kromium has been disposed and cannot accept new operations.")` | Kromium has been disposed and cannot accept new operations. |
| **`KromiumException.UnsupportedPlatform`** | `class UnsupportedPlatform(@JvmField val os: String?, @JvmField val arch: String?) : KromiumException(KromiumErrorCode.UNSUPPORTED_PLATFORM, false, ...)` | Unsupported platform: os=$os, arch=$arch |
| **`KromiumException.InstallationFailed`** | `class InstallationFailed(@JvmField val directory: String, cause: Throwable? = null) : KromiumException(KromiumErrorCode.INSTALLATION_FAILED, true, ...)` | Failed to prepare installation directory: $directory |
| **`KromiumException.AutoDownloadDisabled`** | `class AutoDownloadDisabled(@JvmField val directory: String) : KromiumException(KromiumErrorCode.DOWNLOAD_DISABLED, false, ...)` | Auto-download is disabled (autoDownload = false), and no valid JCEF engine binaries were found at: $directory |
| **`KromiumException.NoBundleAvailable`** | `class NoBundleAvailable(@JvmField val platform: String, @JvmField val releaseTag: String?) : KromiumException(KromiumErrorCode.NO_BUNDLE_AVAILABLE, false, ...)` | No compatible JCEF bundle found for $platform in release ${releaseTag ?: "latest"} |
| **`KromiumException.DownloadFailed`** | `class DownloadFailed(@JvmField val url: String, cause: Throwable? = null) : KromiumException(KromiumErrorCode.DOWNLOAD_FAILED, true, ...)` | Failed to download engine bundle from: $url |
| **`KromiumException.ChecksumMismatch`** | `class ChecksumMismatch(@JvmField val expected: String, @JvmField val actual: String) : KromiumException(KromiumErrorCode.CHECKSUM_MISMATCH, true, ...)` | Archive checksum mismatch — expected: $expected, actual: $actual. The download may be corrupted or tampered with. |
| **`KromiumException.ExtractionFailed`** | `class ExtractionFailed(@JvmField val archivePath: String, cause: Throwable? = null) : KromiumException(KromiumErrorCode.EXTRACTION_FAILED, true, ...)` | Failed to extract engine bundle from: $archivePath |
| **`KromiumException.MaliciousArchiveEntry`** | `class MaliciousArchiveEntry(@JvmField val entryName: String) : KromiumException(KromiumErrorCode.MALICIOUS_ARCHIVE, false, ...)` | Malicious archive entry detected (directory traversal): $entryName |
| **`KromiumException.BootstrapFailed`** | `class BootstrapFailed(cause: Throwable? = null) : KromiumException(KromiumErrorCode.BOOTSTRAP_FAILED, false, ...)` | CEF native bootstrap failed. |
| **`KromiumException.InstallationCorrupted`** | `class InstallationCorrupted(@JvmField val directory: String) : KromiumException(KromiumErrorCode.INSTALLATION_CORRUPTED, true, ...)` | JCEF installation at $directory appears corrupted — re-download required. |
| **`KromiumException.JsEvaluationTimeout`** | `class JsEvaluationTimeout(@JvmField val timeoutMs: Long) : KromiumException(KromiumErrorCode.JS_TIMEOUT, true, ...)` | JavaScript evaluation timed out after ${timeoutMs}ms |
| **`KromiumException.InvalidConfig`** | `class InvalidConfig(@JvmField val detail: String) : KromiumException(KromiumErrorCode.INVALID_CONFIG, false, ...)` | Invalid Kromium configuration: $detail |
| **`KromiumException.ProxyError`** | `class ProxyError(@JvmField val detail: String) : KromiumException(KromiumErrorCode.PROXY_ERROR, true, ...)` | Proxy error: $detail |
| **`KromiumException.PdfPrintFailed`** | `class PdfPrintFailed(@JvmField val path: String, cause: Throwable? = null) : KromiumException(KromiumErrorCode.PDF_PRINT_FAILED, true, ...)` | Failed to print web page to PDF: $path |
| **`KromiumException.FrameworkRequired`** | `class FrameworkRequired @JvmOverloads constructor(message: String = "UI framework is mandatory for OSR browser creation. No default OSR framework is permitted.") : KromiumException(KromiumErrorCode.FRAMEWORK_REQUIRED, false, message)` | UI framework is mandatory for OSR browser creation. No default OSR framework is permitted. |
| **`KromiumException.CanvasNotAvailable`** | `class CanvasNotAvailable @JvmOverloads constructor(@JvmField val framework: KromiumUiFramework, message: String = ...) : KromiumException(KromiumErrorCode.CANVAS_NOT_AVAILABLE, false, message)` | No OSR canvas factory registered for framework: $framework. Please ensure kromium-${framework.name.lowercase()} is on the classpath. |

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`errorCode`** | `KromiumErrorCode` | Standardized error code classification for programmatic handling and telemetry. |
| **`isRecoverable`** | `Boolean` | Indicates whether the operation can be retried (true) or is a fatal state (false). |
| **`message`** | `String` | Human-readable diagnostic message explaining the cause of the failure. |
| **`cause`** | `Throwable?` | Underlying causal exception if wrapped. |

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.error.KromiumException
import org.daviante.kromium.api.error.KromiumErrorCode

try {
    // engine operations
} catch (e: KromiumException) {
    if (e.isRecoverable) {
        println("Recoverable error [${e.errorCode}]: ${e.message}")
    } else {
        System.err.println("Fatal error [${e.errorCode}]: ${e.message}")
    }
}
```

### Pure Java (java)

```java
import org.daviante.kromium.api.error.KromiumException;

try {
    // engine operations
} catch (KromiumException e) {
    System.err.println("Error code: " + e.errorCode + ", recoverable: " + e.isRecoverable);
}
```

