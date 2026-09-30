# KromiumStorage

```kotlin
interface KromiumStorage
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.storage`
- **Since Version:** v1.0.0.150-b11

## Methods

### `getCookiesAsync()`

```kotlin
fun getCookiesAsync(): CompletableFuture<Map<String, String>>
```

Retrieves all cookies available to the current page.


### `getCookieAsync()`

```kotlin
fun getCookieAsync(name: String): CompletableFuture<String?>
```

Retrieves a specific cookie by name.


### `setCookie()`

```kotlin
fun setCookie(name: String, value: String, domain: String? = null, path: String = "/", isSecure: Boolean = false, isHttpOnly: Boolean = false, expires: Date? = null): Boolean
```

Sets a cookie on the global cookie manager.


### `clearCookies()`

```kotlin
fun clearCookies(): Boolean
```

Clears all cookies from the global manager.


### `clearWebStorageAsync()`

```kotlin
fun clearWebStorageAsync(): CompletableFuture<Boolean>
```

Clears Local Storage and Session Storage for the current origin.


### `clearBrowsingDataAsync()`

```kotlin
fun clearBrowsingDataAsync(clearCookies: Boolean = true, clearStorage: Boolean = true): CompletableFuture<Boolean>
```

Aggregates cookie and storage clearing.


