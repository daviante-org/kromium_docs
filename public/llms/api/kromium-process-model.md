# KromiumProcessModel

```kotlin
enum class KromiumProcessModel
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.config`
- **Category:** Configuration
- **Since Version:** v1.0.0.150-b11

## Description

Defines the process isolation model used by Kromium and Chromium Embedded Framework. Controls whether the browser engine runs in-process within the host JVM, in a dedicated multi-process architecture via jcef_helper subprocesses, or as an external RPC server daemon.

### When to Use

Configure via KromiumConfig.builder().browserConfig { b -> b.processModel(...) }. Use AUTO (default) for desktop UI applications. Use IN_PROCESS when explicit single-process control is needed. Avoid OUT_OF_PROCESS for standard desktop apps as it requires custom CefNativeRenderHandler.

## States & Variants

| Variant | Declaration | Description |
| :--- | :--- | :--- |
| **`AUTO`** | `AUTO` | Automatically chooses the best process model for the platform. Uses multi-process Chromium architecture where the browser host runs embedded in the host JVM while GPU acceleration, WebGL rasterization, and web renderers run in dedicated jcef_helper subprocesses with their own OS Process IDs (PIDs) via --browser-subprocess-path. Provides 100% compatibility with Compose Desktop (SwingPanel), Swing, JavaFX, and SWT in both Windowed and Off-Screen Rendering (OSR) modes. |
| **`OUT_OF_PROCESS`** | `OUT_OF_PROCESS` | Executes the Chromium browser engine in an external RPC server daemon (cef_server). In JetBrains JCEF, cef_server RPC mode requires a custom CefNativeRenderHandler (shared memory rasterization) and does not support standard Windowed (CefRendering.DEFAULT) or standard OSR rendering. Use AUTO or IN_PROCESS for desktop UI applications. |
| **`IN_PROCESS`** | `IN_PROCESS` | Executes the Chromium browser engine directly inside the host JVM process. When running in this mode, Kromium applies defensive GPU flags (such as --disable-direct-composition and --disable-gpu-watchdog on Windows) to prevent swapchain hijacking and Direct3D collisions with the host UI toolkit. |

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.config.KromiumConfig
import org.daviante.kromium.api.config.KromiumProcessModel

val config = KromiumConfig.builder()
    .browserConfig { b ->
        b.processModel(KromiumProcessModel.AUTO)
    }
    .build()
```

### Pure Java (java)

```java
import org.daviante.kromium.api.config.KromiumConfig;
import org.daviante.kromium.api.config.KromiumProcessModel;

KromiumConfig config = KromiumConfig.builder()
    .browserConfig(b -> b.processModel(KromiumProcessModel.IN_PROCESS))
    .build();
```

