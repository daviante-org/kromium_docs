# KromiumNavigationInterceptor

```kotlin
fun interface KromiumNavigationInterceptor
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.network`
- **Since Version:** v1.0.0.150-b11

## Methods

### `shouldOverrideUrlLoading()`

```kotlin
fun shouldOverrideUrlLoading(url: String, isRedirect: Boolean): Boolean
```

Called before browser navigation occurs. Returns true to cancel the navigation, false to allow it.


