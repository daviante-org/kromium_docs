# KromiumMenuBuilder

```kotlin
interface KromiumMenuBuilder
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.ui`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`context`** | `KromiumContextMenuContext` | Contextual parameters and action helpers for the current right-click event. |
| **`count`** | `Int` | Number of items currently present in the menu. |

## Methods

### `clear()`

```kotlin
fun clear(): KromiumMenuBuilder
```

Clears all existing default menu items from the context menu.


### `clearDefaults()`

```kotlin
fun clearDefaults(): KromiumMenuBuilder
```

Clears all existing default menu items (alias for Java / fluent style).


### `removeDefault()`

```kotlin
fun removeDefault(menuId: Int): KromiumMenuBuilder
```

Removes a specific menu item by its integer command ID.


### `addItem()`

```kotlin
fun addItem(label: String, enabled: Boolean = true, action: (KromiumContextMenuContext) -> Unit): KromiumMenuBuilder
```

Adds a standard clickable context menu item with an action callback.


### `item()`

```kotlin
fun item(label: String, enabled: Boolean = true, action: (KromiumContextMenuContext) -> Unit): KromiumMenuBuilder
```

Kotlin DSL alias for addItem.


### `addCheckItem()`

```kotlin
fun addCheckItem(label: String, checked: Boolean, enabled: Boolean = true, onToggle: (Boolean) -> Unit): KromiumMenuBuilder
```

Adds a checkable (checkbox) menu item.


### `checkItem()`

```kotlin
fun checkItem(label: String, checked: Boolean, enabled: Boolean = true, onToggle: (Boolean) -> Unit): KromiumMenuBuilder
```

Kotlin DSL alias for addCheckItem.


### `addRadioItem()`

```kotlin
fun addRadioItem(label: String, checked: Boolean, groupId: Int, enabled: Boolean = true, onSelect: () -> Unit): KromiumMenuBuilder
```

Adds a radio menu item belonging to a mutual-exclusion group.


### `radioItem()`

```kotlin
fun radioItem(label: String, checked: Boolean, groupId: Int, enabled: Boolean = true, onSelect: () -> Unit): KromiumMenuBuilder
```

Kotlin DSL alias for addRadioItem.


### `addSeparator()`

```kotlin
fun addSeparator(): KromiumMenuBuilder
```

Adds a visual separator line between menu items.


### `separator()`

```kotlin
fun separator(): KromiumMenuBuilder
```

Kotlin DSL alias for addSeparator.


### `addSubMenu()`

```kotlin
fun addSubMenu(label: String, block: (KromiumMenuBuilder) -> Unit): KromiumMenuBuilder
```

Adds a nested submenu with its own child builder.


### `subMenu()`

```kotlin
fun subMenu(label: String, block: KromiumMenuBuilder.() -> Unit): KromiumMenuBuilder
```

Kotlin DSL alias for addSubMenu.


### `back()`

```kotlin
fun back(label: String = "Back"): KromiumMenuBuilder
```

Adds the native Back command.


### `forward()`

```kotlin
fun forward(label: String = "Forward"): KromiumMenuBuilder
```

Adds the native Forward command.


### `reload()`

```kotlin
fun reload(label: String = "Reload"): KromiumMenuBuilder
```

Adds the native Reload command.


### `print()`

```kotlin
fun print(label: String = "Print..."): KromiumMenuBuilder
```

Adds the native Print command.


### `viewSource()`

```kotlin
fun viewSource(label: String = "View Page Source"): KromiumMenuBuilder
```

Adds the native View Page Source command.


### `copy()`

```kotlin
fun copy(label: String = "Copy"): KromiumMenuBuilder
```

Adds the native Copy command.


### `cut()`

```kotlin
fun cut(label: String = "Cut"): KromiumMenuBuilder
```

Adds the native Cut command.


### `paste()`

```kotlin
fun paste(label: String = "Paste"): KromiumMenuBuilder
```

Adds the native Paste command.


### `selectAll()`

```kotlin
fun selectAll(label: String = "Select All"): KromiumMenuBuilder
```

Adds the native Select All command.


### `inspectElement()`

```kotlin
fun inspectElement(label: String = "Inspect Element"): KromiumMenuBuilder
```

Turnkey action: Opens DevTools targeting clicked element coordinates.


### `copyLink()`

```kotlin
fun copyLink(label: String = "Copy Link Address"): KromiumMenuBuilder
```

Turnkey action: Copies target link URL to clipboard if on hyperlink.


### `saveImageAs()`

```kotlin
fun saveImageAs(label: String = "Save Image As..."): KromiumMenuBuilder
```

Turnkey action: Triggers download for image/media under cursor.


### `copyImageUrl()`

```kotlin
fun copyImageUrl(label: String = "Copy Image Address"): KromiumMenuBuilder
```

Turnkey action: Copies media/image source URL to clipboard.


### `searchWeb()`

```kotlin
fun searchWeb(labelFormat: String = "Search Google for \"%s\"", engineUrl: String = "https://www.google.com/search?q=%s", openInSystemBrowser: Boolean = true): KromiumMenuBuilder
```

Turnkey action: Searches web for selected text.


