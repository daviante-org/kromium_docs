# Context Menu Customization

> Suppress, customize, or build rich right-click context menus using KromiumMenuBuilder's declarative DSL with built-in browser action shortcuts.

- **Category:** UI
- **Read Time:** 6 min
- **Last Updated:** 2026-10-01

## Built-In Preset Menus

`KromiumContextMenuListener` provides turnkey presets for common scenarios:

| Preset | Description |
| :--- | :--- |
| `KromiumContextMenuListener.disabled()` | Suppresses all context menus (kiosk mode) |
| `KromiumContextMenuListener.defaultMenu()` | Preserves native Chromium menu items |
| `KromiumContextMenuListener.devToolsOnly()` | Shows only "Inspect Element" |
| `KromiumContextMenuListener.minimalEditing()` | Smart menu: Copy Link on links, Copy/Search on selections, Cut/Paste/Select All in editable fields |

```kotlin
// Suppress all right-click menus
client.contextMenuListener = KromiumContextMenuListener.disabled()

// Or use the smart minimal editing menu with Inspect Element
client.contextMenuListener = KromiumContextMenuListener.minimalEditing(
    includeInspectElement = true
)
```

## Declarative Menu Builder DSL

Use `client.setContextMenu { ... }` with the `KromiumMenuBuilder` DSL to construct custom menus with items, checkboxes, radio buttons, submenus, and separators.

```kotlin
client.setContextMenu { ctx ->
    clear() // Remove default items

    item("Navigate Home") { it.browser.navigation.loadUrl("https://myapp.com") }
    separator()

    if (ctx.params.hasSelection()) {
        copy()
        searchWeb()
        separator()
    }

    if (ctx.params.isLink()) {
        copyLink()
        separator()
    }

    if (ctx.params.hasMedia()) {
        saveImageAs()
        copyImageUrl()
        separator()
    }

    subMenu("Developer") {
        inspectElement()
        viewSource()
        reload()
    }
}
```

## Built-In Action Shortcuts

KromiumMenuBuilder provides turnkey browser action methods that automatically wire up native commands:

| Method | Action |
| :--- | :--- |
| `back()` / `forward()` / `reload()` | Navigation commands |
| `copy()` / `cut()` / `paste()` / `selectAll()` | Clipboard commands |
| `print()` | Native print dialog |
| `viewSource()` | View page source |
| `inspectElement()` | Opens DevTools at click position |
| `copyLink()` | Copies the hovered link URL |
| `saveImageAs()` | Downloads the hovered image |
| `copyImageUrl()` | Copies the hovered image URL |
| `searchWeb()` | Searches Google for selected text |

## Java Usage

Context menu customization works identically in Java using `KromiumContextMenuListener` and the Consumer overloads of `addItem()`.

```java
client.setContextMenuListener(KromiumContextMenuListener.minimalEditing(true));

// Or custom:
client.setContextMenuListener((builder, context) -> {
    builder.clear();
    builder.addItem("Open Dashboard", ctx -> {
        ctx.getBrowser().getNavigation().loadUrl("https://dashboard.app");
    });
    builder.inspectElement();
});
```

## Related APIs

- [KromiumContextMenuListener](/llms/api/kromium-context-menu-listener.md)
- [KromiumMenuBuilder](/llms/api/kromium-menu-builder.md)
- [KromiumContextMenuContext](/llms/api/kromium-context-menu-context.md)
- [KromiumContextMenuParams](/llms/api/kromium-context-menu-params.md)

