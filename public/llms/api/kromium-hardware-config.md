# KromiumHardwareConfig

```kotlin
@ConsistentCopyVisibility data class KromiumHardwareConfig internal constructor(val processModel: KromiumProcessModel, val gpuMode: KromiumGpuMode)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.config`
- **Category:** Configuration
- **Since Version:** v1.0.0.150-b11

## Description

Controls how the engine interacts with the host OS and GPU. Configures Chromium process isolation architecture and graphics rendering acceleration mode.

### When to Use

Configure within KromiumConfig.builder().hardwareConfig { ... } to enable full GPU acceleration, disable GPU compositing, or activate software fallbacks in virtual machines.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`processModel`** | `KromiumProcessModel` | The process isolation architecture: AUTO (multi-process helper), OUT_OF_PROCESS (external RPC daemon), or IN_PROCESS (embedded). |
| **`gpuMode`** | `KromiumGpuMode` | Graphics rendering strategy: HARDWARE (full GPU), SOFTWARE (SwiftShader), COMPOSITING_DISABLED (CPU compositing), or ANGLE_WARP (Direct3D 11 WARP). |

## Methods

### `builder()`

```kotlin
@JvmStatic fun builder(): Builder
```

Returns a new builder for KromiumHardwareConfig.

- **Returns:** `Builder`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.config.KromiumHardwareConfig
import org.daviante.kromium.api.config.KromiumProcessModel
import org.daviante.kromium.api.config.KromiumGpuMode

val hardwareConfig = KromiumHardwareConfig.builder()
    .processModel(KromiumProcessModel.AUTO)
    .gpuMode(KromiumGpuMode.HARDWARE)
    .build()
```

### Pure Java (java)

```java
import org.daviante.kromium.api.config.KromiumHardwareConfig;
import org.daviante.kromium.api.config.KromiumProcessModel;
import org.daviante.kromium.api.config.KromiumGpuMode;

public class HardwareSetup {
    public static KromiumHardwareConfig create() {
        return KromiumHardwareConfig.builder()
            .processModel(KromiumProcessModel.AUTO)
            .gpuMode(KromiumGpuMode.HARDWARE)
            .build();
    }
}
```

