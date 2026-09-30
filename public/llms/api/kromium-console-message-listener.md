# KromiumConsoleMessageListener

```kotlin
fun interface KromiumConsoleMessageListener
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.devtools`
- **Since Version:** v1.0.0.150-b11

## Methods

### `onConsoleMessage()`

```kotlin
fun onConsoleMessage(message: KromiumConsoleMessage): Boolean
```

Invoked when a console message is logged. Returns true to indicate the message was handled and suppress default logging, or false to allow standard output.


