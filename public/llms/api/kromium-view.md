# KromiumView

```kotlin
interface KromiumView
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.ui`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`surface`** | `KromiumRenderSurface` | The native rendering surface associated with this browser. |
| **`zoomLevel`** | `Double` | Gets or sets the current zoom level. (0.0 is 100%, 1.0 is ~120%, -1.0 is ~80%). |
| **`scaleFactor`** | `Double` | Gets or sets the manual UI scaling factor (e.g. 1.0 = 100%, 2.0 = 200%). |
| **`isAutoDetectScaleFactor`** | `Boolean` | Whether OSR automatically detects display DPI scaling. |
| **`scrollMultiplier`** | `Double` | Scroll sensitivity multiplier for OSR mode (default: 1.0). |

## Methods

### `setZoom()`

```kotlin
fun setZoom(level: Double)
```

Sets the zoom level for this browser.


### `getZoom()`

```kotlin
fun getZoom(): Double
```

Gets the current zoom level.


### `takeScreenshot()`

```kotlin
fun takeScreenshot(): BufferedImage?
```

Captures a screenshot of the current page rendering synchronously.


### `takeScreenshotAsync()`

```kotlin
fun takeScreenshotAsync(): CompletableFuture<BufferedImage?>
```

Asynchronously captures a screenshot of the current page using native capabilities.


### `setAntialiasing()`

```kotlin
fun setAntialiasing(enabled: Boolean)
```

Toggles graphics antialiasing on the underlying rendering component.


### `setInterpolation()`

```kotlin
fun setInterpolation(quality: String)
```

Sets the rendering interpolation quality.


### `resetScaleFactorToAuto()`

```kotlin
fun resetScaleFactorToAuto()
```

Resets the UI scaling factor to automatically match system DPI.


### `print()`

```kotlin
fun print()
```

Triggers the operating system's native interactive print dialog for the current page.


### `printToPdf()`

```kotlin
fun printToPdf(path: String): CompletableFuture<Boolean>
```

Generates a PDF of the current page and saves it to the specified path using default settings.


### `printToPdf()`

```kotlin
fun printToPdf(path: String, settings: KromiumPdfSettings): CompletableFuture<Boolean>
```

Generates a vector PDF of the current page and saves it with custom settings.


### `sendKeyEvent()`

```kotlin
fun sendKeyEvent(event: KromiumKeyEvent)
```

Dispatches a standardized cross-platform keyboard event into the browser viewport.


### `setFocus()`

```kotlin
fun setFocus(focused: Boolean = true)
```

Explicitly notifies the underlying browser rendering engine whether this view has active focus.


### `resize()`

```kotlin
fun resize(width: Int, height: Int)
```

Resizes the underlying browser rendering surface to the specified dimensions.


