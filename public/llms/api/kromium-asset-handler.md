# KromiumAssetHandler

```kotlin
fun interface KromiumAssetHandler
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.scheme`
- **Since Version:** v1.0.0.150-b11

## Methods

### `handle()`

```kotlin
fun handle(request: KromiumAssetRequest): KromiumAssetResponse?
```

Handles an incoming KromiumAssetRequest and returns a KromiumAssetResponse, or null to produce a 404 response.


