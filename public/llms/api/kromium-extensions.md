# KromiumExtensions

```kotlin
package org.daviante.kromium.api.core
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.core`
- **Since Version:** v1.0.0.150-b11

## Methods

### `createHeadlessBrowser()`

```kotlin
fun KromiumEngine.createHeadlessBrowser(url: String = "about:blank", width: Int = 1280, height: Int = 800): KromiumBrowser
```

Creates a new zero-dependency headless KromiumBrowser instance within a new isolated client session.


### `createHeadlessBrowser()`

```kotlin
fun KromiumClient.createHeadlessBrowser(url: String = "about:blank", width: Int = 1280, height: Int = 800): KromiumBrowser
```

Creates a new zero-dependency headless KromiumBrowser instance on this client.


