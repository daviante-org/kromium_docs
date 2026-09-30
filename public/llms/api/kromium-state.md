# KromiumState

```kotlin
sealed class KromiumState
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.core`
- **Category:** Core Engine
- **Since Version:** v1.0.0.150-b11

## Description

Observable lifecycle and operational states of the Kromium engine emitted by KromiumEngine.state StateFlow.

### When to Use

Observe engine.state in UI layers (Compose Multiplatform, JavaFX, Swing) to display progress indicators, download status, or error messages before browser creation.

## States & Variants

| Variant | Declaration | Description |
| :--- | :--- | :--- |
| **`KromiumState.Idle`** | `data object Idle : KromiumState()` | Engine has not started initialization or download. |
| **`KromiumState.Locating`** | `data object Locating : KromiumState()` | Locating local JCEF engine binaries on the system. |
| **`KromiumState.Downloading`** | `data class Downloading(val progress: KromiumDownloadProgress) : KromiumState()` | Downloading native JCEF bundle binaries with reactive progress metrics. |
| **`KromiumState.Extracting`** | `data object Extracting : KromiumState()` | Extracting downloaded bundle archive to the local cache directory. |
| **`KromiumState.Initializing`** | `data object Initializing : KromiumState()` | Bootstrapping CEF native binaries and preparing Chromium subsystems. |
| **`KromiumState.Ready`** | `data object Ready : KromiumState()` | CEF native runtime is initialized, healthy, and ready to create browser instances. |
| **`KromiumState.Error`** | `data class Error(val cause: Throwable) : KromiumState()` | Engine initialization or operational failure occurred; inspect cause for details. |
| **`KromiumState.Disposed`** | `data object Disposed : KromiumState()` | Engine and all associated browser instances have been disposed and shut down. |

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import androidx.compose.runtime.*
import org.daviante.kromium.api.core.KromiumEngine
import org.daviante.kromium.api.core.KromiumState

@Composable
fun ObserveState(engine: KromiumEngine) {
    val state by engine.state.collectAsState()
    when (val s = state) {
        is KromiumState.Downloading -> println("Downloading: ${s.progress.fraction * 100}%")
        is KromiumState.Ready -> println("Engine ready")
        is KromiumState.Error -> println("Failed: ${s.cause.message}")
        else -> println("State: $s")
    }
}
```

### Pure Java (java)

```java
import org.daviante.kromium.api.core.KromiumEngine;
import org.daviante.kromium.api.core.KromiumState;

public class StateObserver {
    public static void check(KromiumEngine engine) {
        KromiumState state = engine.getState().getValue();
        if (state instanceof KromiumState.Ready) {
            System.out.println("Ready!");
        }
    }
}
```

