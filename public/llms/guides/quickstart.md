# 5-Minute Quickstart Guide

> Add Kromium to your Gradle project, bootstrap the Chromium engine, and create your first browser instance.

- **Category:** Getting Started
- **Read Time:** 5 min
- **Last Updated:** 2026-09-27

## Prerequisites

Before integrating Kromium, ensure your environment meets the minimum runtime requirements:
- **JDK:** Java 17 or higher (Java 21 LTS recommended, e.g., Eclipse Temurin).
- **Supported Operating Systems:**
  - **Windows:** 10 / 11 (x86_64, ARM64)
  - **macOS:** 12+ Monterey, Ventura, Sonoma, Sequoia (Intel x86_64, Apple Silicon ARM64)
  - **Linux:** Ubuntu 20.04+, Debian 11+, Fedora, Arch (x86_64, ARM64) with GTK 3+ installed.

## Adding Gradle Dependencies

Add Kromium to your build.gradle.kts using either Gradle Version Catalog or direct coordinates.

```kotlin
// build.gradle.kts
dependencies {
    val kromiumVersion = "1.0.0.150-b11"
    
    implementation("org.daviante.kromium:kromium-api:$kromiumVersion")
    implementation("org.daviante.kromium:kromium-provider-jcef:$kromiumVersion")

    // Target UI integration:
    implementation("org.daviante.kromium:kromium-compose:$kromiumVersion")
    // implementation("org.daviante.kromium:kromium-swing:$kromiumVersion")
    // implementation("org.daviante.kromium:kromium-javafx:$kromiumVersion")
    // implementation("org.daviante.kromium:kromium-swt:$kromiumVersion")
    // implementation("org.daviante.kromium:kromium-awt:$kromiumVersion")
}
```

## Basic Engine Lifecycle & First Browser

Kromium separates the engine lifecycle into three clean stages:
1. **KromiumEngine**: Manages the underlying native Chromium runtime, process models, and shared cache.
2. **KromiumClient**: Represents an isolated session (cookies, storage, and global listeners).
3. **KromiumBrowser**: Represents a single web page view and its control facades.

```kotlin
val config = KromiumConfig.builder()
    .browserConfig { b ->
        b.cachePath(File(System.getProperty("user.home"), ".myapp-cache").absolutePath)
    }
    .build()

// 1. Instantiate and initialize engine
val engine = Kromium.createEngine(config)
engine.initialize() // Suspends until native runtime is extracted and ready

// 2. Create isolated client session
val client = engine.createClient()

// 3. Create browser instance for your UI toolkit
val browser = client.createBrowser(
    url = "https://example.com",
    framework = KromiumUiFramework.SWING
)
```

## Controlling the Browser

Once created, browser exposes dedicated facades for all web operations: navigation, DevTools, downloads, cookies, and automation.

```kotlin
// --- Navigation ---
browser.navigation.loadUrl("https://github.com")

// Suspending load (waits until DOM is ready):
val loaded = browser.navigation.loadUrl(
    url = "https://github.com",
    waitUntil = NavigationStage.LOADED,
    timeoutMs = 15_000L
)

// --- DevTools ---
browser.devTools.openDevTools()
```

## Observing Reactive Navigation State

browser.navigation.navigationState is a coroutine StateFlow<KromiumNavigationState> that continuously emits real-time loading updates.

```kotlin
scope.launch {
    browser.navigation.navigationState.collect { state ->
        println("URL: ${state.url}")
        println("Page Title: ${state.title}")
        println("Is Loading: ${state.isLoading}")
        println("Can Go Back: ${state.canGoBack}")
        println("Can Go Forward: ${state.canGoForward}")
    }
}
```

## Related APIs

- [Kromium](/llms/api/kromium.md)
- [KromiumEngine](/llms/api/kromium-engine.md)
- [KromiumBrowser](/llms/api/kromium-browser.md)
- [KromiumClient](/llms/api/kromium-client.md)

