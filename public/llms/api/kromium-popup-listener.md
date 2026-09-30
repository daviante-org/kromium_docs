# KromiumPopupListener

```kotlin
fun interface KromiumPopupListener
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.ui`
- **Since Version:** v1.0.0.150-b11

## Methods

### `onBeforePopup()`

```kotlin
fun onBeforePopup(targetUrl: String): Boolean
```

Called before a popup window is opened. Returns true to cancel/block the popup, or false to allow the popup to open.


