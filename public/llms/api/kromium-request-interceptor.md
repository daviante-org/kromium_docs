# KromiumRequestInterceptor

```kotlin
fun interface KromiumRequestInterceptor
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.network`
- **Since Version:** v1.0.0.150-b11

## Methods

### `intercept()`

```kotlin
fun intercept(request: KromiumWebResourceRequest): Boolean
```

Intercepts an outgoing request. Developers can mutate request.headers or return true to cancel/block the request.


