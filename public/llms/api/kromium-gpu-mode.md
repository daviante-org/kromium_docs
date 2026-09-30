# KromiumGpuMode

```kotlin
enum class KromiumGpuMode
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.config`
- **Category:** Configuration
- **Since Version:** v1.0.0.150-b11

## Description

Controls GPU hardware acceleration and graphics rendering strategy. Determines how the Chromium engine interacts with host GPU drivers, which is critical for VM environments, CI pipelines, and machines with unstable or overclocked graphics hardware.

### When to Use

Set via KromiumHardwareConfig when running in virtual machines, Docker containers, or CI environments where GPU drivers may not be available. Use SOFTWARE for bulletproof CPU rendering, or ANGLE_WARP on Windows to avoid D3D device removal errors.

## States & Variants

| Variant | Declaration | Description |
| :--- | :--- | :--- |
| **`HARDWARE`** | `HARDWARE` | Full hardware acceleration using native OS graphics APIs (DirectX/Direct3D on Windows, Metal on macOS, Vulkan/OpenGL on Linux). |
| **`SOFTWARE`** | `SOFTWARE` | Pure software rendering (CPU-based). Forces --disable-gpu, --use-gl=angle, and --use-angle=swiftshader. Completely eliminates any direct interaction with GPU drivers or hardware Direct3D devices. Recommended as a bulletproof fallback when running in virtual machines or on machines with unstable/overclocked graphics drivers. |
| **`COMPOSITING_DISABLED`** | `COMPOSITING_DISABLED` | Hardware-accelerated GPU rasterization with CPU compositing. Applies --disable-gpu-compositing. |
| **`ANGLE_WARP`** | `ANGLE_WARP` | Direct3D 11 WARP (Windows Advanced Rasterization Platform). Uses Microsoft's high-speed software Direct3D rasterizer. Bypasses vendor hardware drivers and avoids physical GPU device reset/removal errors (0x887a0005) while maintaining DirectX pipeline compatibility on Windows. |

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.config.KromiumConfig
import org.daviante.kromium.api.config.KromiumGpuMode

val config = KromiumConfig.builder()
    .hardwareConfig { hw ->
        hw.gpuMode(KromiumGpuMode.SOFTWARE) // CPU-only rendering for CI
    }
    .build()
```

### Pure Java (java)

```java
import org.daviante.kromium.api.config.KromiumConfig;
import org.daviante.kromium.api.config.KromiumGpuMode;

KromiumConfig config = KromiumConfig.builder()
    .hardwareConfig(hw -> hw.gpuMode(KromiumGpuMode.ANGLE_WARP))
    .build();
```

