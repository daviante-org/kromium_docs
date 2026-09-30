# KromiumEngine

```kotlin
interface KromiumEngine
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.core`
- **Category:** Core Engine
- **Since Version:** v1.0.0.150-b11

## Description

The core interface representing the running Kromium engine. Manages lifecycle states, native binary initialization and disposal, browser client sessions, global cookie management, scheme handler registration, and engine-wide download operations.

### When to Use

Obtain via Kromium.createEngine(config, provider) or provider.createEngine(config) to control the engine lifecycle, observe states via StateFlow, and spawn isolated KromiumClient sessions.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`state`** | `StateFlow<KromiumState>` | The current state of the engine (e.g. downloading, extracting, ready). |
| **`info`** | `KromiumEngineInfo` | Gets information about the current engine installation. |
| **`cookieManager`** | `KromiumCookieManager` | Global cookie manager for this engine. |

## Methods

### `initialize()`

```kotlin
suspend fun initialize()
```

Initializes the engine asynchronously, downloading/extracting binaries if necessary.

- **Returns:** `Unit`

### `initializeAsync()`

```kotlin
fun initializeAsync(): CompletableFuture<Void?>
```

Asynchronously initializes the engine returning a Java CompletableFuture.

- **Returns:** `CompletableFuture<Void?>`

### `dispose()`

```kotlin
fun dispose()
```

Disposes the engine, cleaning up native resources.

- **Returns:** `Unit`

### `createClient()`

```kotlin
fun createClient(config: KromiumClientConfig = KromiumClientConfig.default()): KromiumClient
```

Creates a new isolated browser client session.

- **Returns:** `KromiumClient`

### `registerSchemeHandler()`

```kotlin
fun registerSchemeHandler(schemeName: String, domainName: String? = null, handler: KromiumAssetHandler): Boolean
```

Registers a custom protocol scheme handler factory with the engine.

- **Returns:** `Boolean`

### `cancelDownload()`

```kotlin
fun cancelDownload(downloadId: Int): Boolean
```

Programmatically cancels an in-progress download identified by its download ID across any active browser session.

- **Returns:** `Boolean`

### `pauseDownload()`

```kotlin
fun pauseDownload(downloadId: Int): Boolean
```

Programmatically pauses an in-progress download identified by its download ID across any active browser session.

- **Returns:** `Boolean`

### `resumeDownload()`

```kotlin
fun resumeDownload(downloadId: Int): Boolean
```

Programmatically resumes a paused download identified by its download ID across any active browser session.

- **Returns:** `Boolean`

### `isDownloadPaused()`

```kotlin
fun isDownloadPaused(downloadId: Int): Boolean
```

Checks whether an in-progress download is currently paused across any active browser session.

- **Returns:** `Boolean`

### `clearSchemeHandlers()`

```kotlin
fun clearSchemeHandlers(): Boolean
```

Clears all registered custom scheme handler factories.

- **Returns:** `Boolean`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.config.KromiumConfig
import org.daviante.kromium.jcef.JcefProvider

suspend fun initEngine() {
    val engine = JcefProvider.createEngine(KromiumConfig.builder().build())
    engine.initialize()
    val client = engine.createClient()
}
```

### Pure Java (java)

```java
import org.daviante.kromium.api.config.KromiumConfig;
import org.daviante.kromium.api.core.KromiumEngine;
import org.daviante.kromium.jcef.JcefProvider;

public class EngineInit {
    public static void start() {
        KromiumEngine engine = JcefProvider.INSTANCE.createEngine(KromiumConfig.builder().build());
        engine.initializeAsync().thenRun(() -> {
            System.out.println("Engine ready!");
        });
    }
}
```

