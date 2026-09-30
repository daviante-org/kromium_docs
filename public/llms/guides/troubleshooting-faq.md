# Troubleshooting & FAQ

> Solutions for JVM module access errors, GPU rasterization failures, VM/Docker environments, and platform-specific native dependencies.

- **Category:** Getting Started
- **Read Time:** 7 min
- **Last Updated:** 2026-10-01

## Java 9+ JVM Module Access (--add-opens)

On Java 9 and newer, Java Strong Encapsulation restricts reflection into internal `sun.awt` and `sun.java2d` packages. Kromium includes `KromiumJvmModuleOpener` which attempts to open these modules dynamically at runtime. However, if your application runs under strict modularity or custom security managers, add the following JVM flags to your Gradle build or startup scripts:

```bash
--add-opens=java.desktop/sun.awt=ALL-UNNAMED
--add-opens=java.desktop/sun.java2d=ALL-UNNAMED
--add-opens=java.desktop/sun.awt.windows=ALL-UNNAMED # Windows only
--add-opens=java.desktop/sun.lwawt=ALL-UNNAMED      # macOS only
--add-opens=java.desktop/sun.awt.X11=ALL-UNNAMED    # Linux only
```

In Gradle `build.gradle.kts`:
```kotlin
application {
    applicationDefaultJvmArgs = listOf(
        "--add-opens=java.desktop/sun.awt=ALL-UNNAMED",
        "--add-opens=java.desktop/sun.java2d=ALL-UNNAMED"
    )
}
```

## GPU Device Loss, VM & CI Rendering Failures

If you encounter Direct3D device reset errors (`DXGI_ERROR_DEVICE_REMOVED`, `0x887a0005`) on Windows or are running in virtual machines, Docker containers, or headless CI runners without physical GPUs, configure `KromiumGpuMode.SOFTWARE` or `KromiumGpuMode.ANGLE_WARP` in `KromiumHardwareConfig`.

```kotlin
val config = KromiumConfig.builder()
    .hardwareConfig { hw ->
        // On Windows with overclocked/unstable drivers:
        // hw.gpuMode(KromiumGpuMode.ANGLE_WARP)

        // In headless CI or VMs without GPU drivers:
        hw.gpuMode(KromiumGpuMode.SOFTWARE)
    }
    .build()
```

## Linux Native Library Requirements

Chromium Embedded Framework (CEF) requires native shared libraries on Linux. If the engine fails to initialize on Debian/Ubuntu, install the required packages:

```bash
sudo apt-get update && sudo apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0
```

## Process Model & Compose Desktop Compatibility

Always keep `KromiumProcessModel.AUTO` (the default) when embedding in Jetpack Compose, Swing, or JavaFX. In `AUTO` mode, Kromium executes the browser host inside the JVM while spawning `jcef_helper` subprocesses for GPU rasterization and web page sandboxing. Avoid `OUT_OF_PROCESS` unless you implement a custom `CefNativeRenderHandler`.

## Capturing Chromium Diagnostic Logs

To diagnose native crashes, network handshakes, or certificate errors, enable verbose logging and specify a dedicated log file path.

```kotlin
import org.daviante.kromium.api.config.KromiumLogSeverity
import java.io.File

val config = KromiumConfig.builder()
    .loggingConfig { log ->
        log.severity(KromiumLogSeverity.VERBOSE)
        log.logFile(File("./logs/chromium-debug.log"))
    }
    .build()
```

## Related APIs

- [KromiumGpuMode](/llms/api/kromium-gpu-mode.md)
- [KromiumProcessModel](/llms/api/kromium-process-model.md)
- [KromiumLoggingConfig](/llms/api/kromium-logging-config.md)
- [KromiumException](/llms/api/kromium-exception.md)

