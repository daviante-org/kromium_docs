# KromiumNavigation

```kotlin
interface KromiumNavigation
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.navigation`
- **Category:** Navigation & Lifecycle
- **Since Version:** v1.0.0.150-b11

## Description

Facade for browser navigation operations. Provides URL loading with lifecycle stage awaiting, history traversal, HTML injection, network idle detection, and reload/stop controls.

### When to Use

Access via browser.navigation to load URLs, navigate history, wait for page lifecycle stages, or detect network idle state.

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`navigationState`** | `StateFlow<KromiumNavigationState>` | Observable state stream of the browser's navigation and loading status. |

## Methods

### `loadUrl()`

```kotlin
suspend fun loadUrl(url: String, waitUntil: NavigationStage = NavigationStage.LOADED, timeoutMs: Long = 10_000L): Boolean
```

Loads a specific URL in the browser and suspends until the navigation reaches the requested stage.


### `loadUrl()`

```kotlin
fun loadUrl(url: String)
```

Loads a specific URL in the browser without suspending.


### `loadUrlAsync()`

```kotlin
fun loadUrlAsync(url: String, waitUntil: NavigationStage = NavigationStage.LOADED, timeoutMs: Long = 10_000L): CompletableFuture<Boolean>
```

Loads a specific URL and returns a CompletableFuture that completes when the requested stage is reached.


### `waitForNavigation()`

```kotlin
suspend fun waitForNavigation(stage: NavigationStage = NavigationStage.LOADED, timeoutMs: Long = 10_000L): Boolean
```

Waits for the page navigation lifecycle to reach the specified stage.


### `waitForNavigationAsync()`

```kotlin
fun waitForNavigationAsync(stage: NavigationStage = NavigationStage.LOADED, timeoutMs: Long = 10_000L): CompletableFuture<Boolean>
```

Waits for the page navigation lifecycle to reach the specified stage and returns a CompletableFuture.


### `waitForNetworkIdle()`

```kotlin
suspend fun waitForNetworkIdle(idleTimeMs: Long = 500L, maxTimeoutMs: Long = 10_000L, pollIntervalMs: Long = 50L): Boolean
```

Waits until there are no active in-flight network requests for a specific duration.


### `waitForNetworkIdleAsync()`

```kotlin
fun waitForNetworkIdleAsync(idleTimeMs: Long = 500L, maxTimeoutMs: Long = 10_000L, pollIntervalMs: Long = 50L): CompletableFuture<Boolean>
```

Waits until there are no active in-flight network requests and returns a CompletableFuture.


### `loadHtml()`

```kotlin
fun loadHtml(html: String, url: String = "http://kromium.local/")
```

Loads raw HTML content directly into the browser.


### `goBack()`

```kotlin
fun goBack()
```

Navigates backwards in the history, if possible.


### `goForward()`

```kotlin
fun goForward()
```

Navigates forwards in the history, if possible.


### `canGoBack()`

```kotlin
fun canGoBack(): Boolean
```

Returns true if the browser can navigate backwards.


### `canGoForward()`

```kotlin
fun canGoForward(): Boolean
```

Returns true if the browser can navigate forwards.


### `reload()`

```kotlin
fun reload(ignoreCache: Boolean = false)
```

Reloads the current page.


### `stopLoad()`

```kotlin
fun stopLoad()
```

Stops any pending or current load operation.


