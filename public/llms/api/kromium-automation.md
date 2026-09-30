# KromiumAutomation

```kotlin
interface KromiumAutomation
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.automation`
- **Since Version:** v1.0.0.150-b11

## Methods

### `emulateDesktopEnvironment()`

```kotlin
fun emulateDesktopEnvironment()
```

Injects JavaScript into the active page to normalize the headless environment and emulate a standard interactive desktop session.


### `simulateClick()`

```kotlin
fun simulateClick(x: Int, y: Int)
```

Simulates a click event at the specified viewport coordinates.


### `waitForSelector()`

```kotlin
suspend fun waitForSelector(selector: String, timeoutMs: Long = 10_000L): Boolean
```

Suspends until an element matching the CSS selector is attached to the DOM.


### `waitForSelectorAsync()`

```kotlin
fun waitForSelectorAsync(selector: String, timeoutMs: Long = 10_000L): CompletableFuture<Boolean>
```

Asynchronously awaits an element matching the CSS selector.


### `waitForUrl()`

```kotlin
suspend fun waitForUrl(pattern: String, isRegex: Boolean = false, timeoutMs: Long = 15_000L): Boolean
```

Suspends until current URL matches target pattern.


### `waitForUrlAsync()`

```kotlin
fun waitForUrlAsync(pattern: String, isRegex: Boolean = false, timeoutMs: Long = 15_000L): CompletableFuture<Boolean>
```

Asynchronously awaits matching URL.


### `click()`

```kotlin
suspend fun click(selector: String, timeoutMs: Long = 10_000L): Boolean
```

Clicks an element matching the CSS selector.


### `clickAsync()`

```kotlin
fun clickAsync(selector: String, timeoutMs: Long = 10_000L): CompletableFuture<Boolean>
```

Asynchronously clicks an element matching the CSS selector.


### `fill()`

```kotlin
suspend fun fill(selector: String, value: String, timeoutMs: Long = 10_000L): Boolean
```

Sets the value of an input element matching the selector.


### `fillAsync()`

```kotlin
fun fillAsync(selector: String, value: String, timeoutMs: Long = 10_000L): CompletableFuture<Boolean>
```

Asynchronously sets the value of an input element.


### `type()`

```kotlin
suspend fun type(selector: String, text: String, delayMs: Long = 20L, timeoutMs: Long = 10_000L): Boolean
```

Types text into an element character by character with keystroke delay.


### `typeAsync()`

```kotlin
fun typeAsync(selector: String, text: String, delayMs: Long = 20L, timeoutMs: Long = 10_000L): CompletableFuture<Boolean>
```

Asynchronously types text into an element.


### `selectOption()`

```kotlin
suspend fun selectOption(selector: String, value: String, timeoutMs: Long = 10_000L): Boolean
```

Selects an option in a dropdown select element.


### `selectOptionAsync()`

```kotlin
fun selectOptionAsync(selector: String, value: String, timeoutMs: Long = 10_000L): CompletableFuture<Boolean>
```

Asynchronously selects an option in a dropdown select element.


### `getTextContent()`

```kotlin
suspend fun getTextContent(selector: String, timeoutMs: Long = 10_000L): String?
```

Retrieves the inner text content of an element.


### `getTextContentAsync()`

```kotlin
fun getTextContentAsync(selector: String, timeoutMs: Long = 10_000L): CompletableFuture<String?>
```

Asynchronously retrieves the inner text content of an element.


### `getAttribute()`

```kotlin
suspend fun getAttribute(selector: String, attribute: String, timeoutMs: Long = 10_000L): String?
```

Retrieves an attribute value of an element.


### `getAttributeAsync()`

```kotlin
fun getAttributeAsync(selector: String, attribute: String, timeoutMs: Long = 10_000L): CompletableFuture<String?>
```

Asynchronously retrieves an attribute value of an element.


### `isVisible()`

```kotlin
suspend fun isVisible(selector: String): Boolean
```

Checks if an element matching selector is visible.


### `isVisibleAsync()`

```kotlin
fun isVisibleAsync(selector: String): CompletableFuture<Boolean>
```

Asynchronously checks if an element is visible.


### `isChecked()`

```kotlin
suspend fun isChecked(selector: String): Boolean
```

Checks if a checkbox or radio button is checked.


### `isCheckedAsync()`

```kotlin
fun isCheckedAsync(selector: String): CompletableFuture<Boolean>
```

Asynchronously checks if a checkbox or radio button is checked.


### `count()`

```kotlin
suspend fun count(selector: String): Int
```

Returns the number of elements matching the selector.


### `countAsync()`

```kotlin
fun countAsync(selector: String): CompletableFuture<Int>
```

Asynchronously returns the number of elements matching the selector.


