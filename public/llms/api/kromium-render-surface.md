# KromiumRenderSurface

```kotlin
interface KromiumRenderSurface
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.ui`
- **Since Version:** v1.0.0.150-b11

## Methods

### `unwrap()`

```kotlin
fun <T : Any> unwrap(clazz: KClass<T>): T?
```

Attempts to unwrap this generic surface into a platform-specific UI component (e.g. java.awt.Component for Swing/Compose Desktop).


