# KromiumPermissionListener

```kotlin
fun interface KromiumPermissionListener
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.permission`
- **Since Version:** v1.0.0.150-b11

## Methods

### `onRequestPermission()`

```kotlin
fun onRequestPermission(request: KromiumPermissionRequest): KromiumPermissionDecision
```

Evaluates an incoming KromiumPermissionRequest and returns a KromiumPermissionDecision.


