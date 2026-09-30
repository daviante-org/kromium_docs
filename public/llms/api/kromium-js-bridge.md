# KromiumJsBridge

```kotlin
interface KromiumJsBridge
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.automation`
- **Since Version:** v1.0.0.150-b11

## Methods

### `executeJavaScript()`

```kotlin
fun executeJavaScript(code: String)
```

Executes arbitrary JavaScript in the context of the current page.


### `evaluateJavaScript()`

```kotlin
suspend fun evaluateJavaScript(expression: String, timeoutMs: Long? = null, bindingTimeoutMs: Long? = null, bindingIntervalMs: Long? = null): String?
```

Executes arbitrary JavaScript asynchronously and returns the stringified response.


### `getHtml()`

```kotlin
suspend fun getHtml(): String
```

Convenience function to fetch the complete HTML of the current document (document.documentElement.outerHTML).


### `getHtmlAsync()`

```kotlin
fun getHtmlAsync(): CompletableFuture<String>
```

Asynchronously fetches the complete HTML of the current document.


### `getText()`

```kotlin
suspend fun getText(): String
```

Convenience function to fetch the visible text content of the current document (document.body.innerText).


### `getTextAsync()`

```kotlin
fun getTextAsync(): CompletableFuture<String>
```

Asynchronously fetches the visible text content of the current document.


### `getFaviconUrl()`

```kotlin
suspend fun getFaviconUrl(): String?
```

Attempts to resolve the URL of the page's favicon using DOM inspection.


### `getFaviconUrlAsync()`

```kotlin
fun getFaviconUrlAsync(): CompletableFuture<String?>
```

Asynchronously resolves the favicon URL.


