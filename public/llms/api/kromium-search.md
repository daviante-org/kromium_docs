# KromiumSearch

```kotlin
interface KromiumSearch
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.search`
- **Since Version:** v1.0.0.150-b11

## Methods

### `find()`

```kotlin
fun find(searchText: String, forward: Boolean = true, matchCase: Boolean = false, findNext: Boolean = false)
```

Searches for searchText within the currently loaded web page.


### `stopFinding()`

```kotlin
fun stopFinding(clearSelection: Boolean = true)
```

Stops the current search operation and optionally clears search highlighting.


