# KromiumKeyEvent

```kotlin
data class KromiumKeyEvent(
    val type: KromiumKeyEventType,
    val keyCode: Int = 0,
    val keyChar: Char = CHAR_UNDEFINED,
    val modifiers: Int = 0
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.ui`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`type`** | `KromiumKeyEventType` | Whether this is a key down, key character typed, or key up. |
| **`keyCode`** | `Int` | Standard virtual key code (see KromiumKeyCodes). |
| **`keyChar`** | `Char` | Character value for printable input and text composition. |
| **`modifiers`** | `Int` | Bitmask of active modifier keys. |
| **`isShiftDown`** | `Boolean` | True if Shift key is depressed. |
| **`isControlDown`** | `Boolean` | True if Control key is depressed. |
| **`isAltDown`** | `Boolean` | True if Alt key is depressed. |
| **`isMetaDown`** | `Boolean` | True if Meta/Windows/Command key is depressed. |
| **`isAltGraphDown`** | `Boolean` | True if AltGraph key is depressed. |

