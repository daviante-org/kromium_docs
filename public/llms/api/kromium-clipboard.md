# KromiumClipboard

```kotlin
interface KromiumClipboard
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.automation`
- **Since Version:** v1.0.0.150-b11

## Methods

### `copy()`

```kotlin
fun copy()
```

Copies the current selection to the clipboard.


### `paste()`

```kotlin
fun paste()
```

Pastes the clipboard content into the current focused element.


### `cut()`

```kotlin
fun cut()
```

Cuts the current selection to the clipboard.


### `selectAll()`

```kotlin
fun selectAll()
```

Selects all text/content in the current focused element.


### `undo()`

```kotlin
fun undo()
```

Undoes the last editing action.


### `redo()`

```kotlin
fun redo()
```

Redoes the last undone editing action.


