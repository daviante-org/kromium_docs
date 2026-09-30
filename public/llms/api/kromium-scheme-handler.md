# KromiumSchemeHandler

```kotlin
object KromiumSchemeHandler
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.scheme`
- **Since Version:** v1.0.0.150-b11

## Methods

### `fromClasspath()`

```kotlin
fun fromClasspath(resourcePath: String = "", classLoader: ClassLoader = KromiumSchemeHandler::class.java.classLoader, spaFallback: String? = null, defaultHeaders: Map<String, String> = emptyMap()): KromiumAssetHandler
```

Creates an asset handler that streams resources bundled inside the application JAR or classpath.


### `fromDirectory()`

```kotlin
fun fromDirectory(directory: File, spaFallback: String? = null, defaultHeaders: Map<String, String> = emptyMap()): KromiumAssetHandler
```

Creates an asset handler that serves files from a local directory on disk with directory traversal protection.


### `create()`

```kotlin
fun create(handler: KromiumAssetHandler): KromiumAssetHandler
```

Creates a custom KromiumAssetHandler from a functional lambda.


### `sanitizePath()`

```kotlin
fun sanitizePath(rawPath: String): String?
```

Sanitizes a requested URL path against directory traversal attempts. Returns null if path is malicious.


