# KromiumAuthListener

```kotlin
fun interface KromiumAuthListener
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.network`
- **Since Version:** v1.0.0.150-b11

## Methods

### `onAuthRequired()`

```kotlin
fun onAuthRequired(request: KromiumAuthRequest): KromiumAuthResponse
```

Called when an authentication challenge is received.


