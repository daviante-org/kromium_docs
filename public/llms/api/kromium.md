# Kromium

```kotlin
object Kromium
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api`
- **Category:** Core Engine
- **Since Version:** v1.0.0.150-b11

## Description

The main entry point for the Kromium library. Provides synchronized factory access to create and manage the active singleton KromiumEngine instance using a specified KromiumConfig and KromiumEngineProvider.

### When to Use

Call Kromium.createEngine(config, provider) during application bootstrap to create the shared uninitialized KromiumEngine instance.

## Methods

### `createEngine()`

```kotlin
@JvmStatic @Synchronized fun createEngine(config: KromiumConfig, provider: KromiumEngineProvider): KromiumEngine
```

Creates the Kromium engine using the provided configuration and provider. The engine is NOT automatically initialized. You must call engine.initialize() on a background thread so you can observe engine.state from the UI.

- **Returns:** `KromiumEngine`

## Code Examples

### Compose Multiplatform (kotlin)

```kotlin
import org.daviante.kromium.api.Kromium
import org.daviante.kromium.api.config.KromiumConfig
import org.daviante.kromium.jcef.JcefProvider

val config = KromiumConfig.builder().build()
val engine = Kromium.createEngine(config, JcefProvider)
engine.initialize()
```

### Pure Java (java)

```java
import org.daviante.kromium.api.Kromium;
import org.daviante.kromium.api.config.KromiumConfig;
import org.daviante.kromium.api.core.KromiumEngine;
import org.daviante.kromium.jcef.JcefProvider;

KromiumConfig config = KromiumConfig.builder().build();
KromiumEngine engine = Kromium.createEngine(config, JcefProvider.INSTANCE);
engine.initializeAsync();
```

