# Custom Protocol Scheme Handlers

> Register custom protocols (app://, kromium://) to serve web assets from the classpath, local directories, or dynamic handlers.

- **Category:** Core API
- **Read Time:** 8 min
- **Last Updated:** 2026-10-01

## How Custom Schemes Work

Custom schemes allow you to intercept `app://myapp/index.html` style URLs and serve content from JVM resources, local files, or dynamically generated responses. This enables building fully offline desktop apps with web UIs.

**Two-step process:**
1. **Register the scheme** with `KromiumCustomScheme` in `KromiumConfig` (before engine init).
2. **Register the handler** via `engine.registerSchemeHandler(...)` (after engine init).

## Registering a Custom Scheme

Custom schemes must be declared before engine initialization. Use `KromiumCustomScheme.secure()` for a secure scheme with CORS and Fetch API enabled, or construct with full control over security flags.

```kotlin
val config = KromiumConfig.builder()
    .browserConfig { b ->
        b.customSchemes(listOf(
            KromiumCustomScheme.secure("app"),
            KromiumCustomScheme(
                schemeName = "local",
                isStandard = true,
                isLocal = true,
                isSecure = true,
                isCorsEnabled = true,
                isCspBypassing = false,
                isFetchEnabled = true
            )
        ))
    }
    .build()
```

## Serving Assets from the Classpath

`KromiumSchemeHandler.fromClasspath()` creates a turnkey handler that streams resources bundled inside your application JAR. Supports SPA fallback routing for React/Vue/Angular apps.

```kotlin
val engine = Kromium.createEngine(config)
engine.initialize()

// Serve from src/main/resources/web/
val handler = KromiumSchemeHandler.fromClasspath(
    resourcePath = "web",
    spaFallback = "index.html"
)
engine.registerSchemeHandler("app", "myapp", handler)

// Now navigate to app://myapp/index.html
val browser = engine.createClient().createBrowser("app://myapp/index.html")
```

## Serving Assets from a Local Directory

`KromiumSchemeHandler.fromDirectory()` serves files from a local filesystem directory with built-in directory traversal protection and SPA fallback support.

```kotlin
val handler = KromiumSchemeHandler.fromDirectory(
    directory = File("./frontend/dist"),
    spaFallback = "index.html",
    defaultHeaders = mapOf(
        "X-Frame-Options" to "DENY"
    )
)
engine.registerSchemeHandler("app", "myapp", handler)
```

## Dynamic Custom Handlers

For dynamic content, implement `KromiumAssetHandler` directly. Return `KromiumAssetResponse.json()`, `.html()`, `.text()`, or `.stream()` — or `null` for 404.

```kotlin
val apiHandler = KromiumSchemeHandler.create { request ->
    when {
        request.path == "/api/user" -> {
            KromiumAssetResponse.json("""
                {"id": 1, "name": "Alice"}
            """.trimIndent())
        }
        request.path.startsWith("/api/") -> {
            KromiumAssetResponse.notFound("Endpoint not found: ${request.path}")
        }
        else -> null // 404
    }
}
engine.registerSchemeHandler("app", "api", apiHandler)
```

## Related APIs

- [KromiumCustomScheme](/llms/api/kromium-custom-scheme.md)
- [KromiumSchemeHandler](/llms/api/kromium-scheme-handler.md)
- [KromiumAssetHandler](/llms/api/kromium-asset-handler.md)
- [KromiumAssetRequest](/llms/api/kromium-asset-request.md)
- [KromiumAssetResponse](/llms/api/kromium-asset-response.md)

