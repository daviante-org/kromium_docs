# KromiumConsoleMessage

```kotlin
data class KromiumConsoleMessage(
    val level: KromiumConsoleMessageLevel,
    val message: String,
    val source: String = "",
    val line: Int = 0
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.devtools`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`level`** | `KromiumConsoleMessageLevel` | The severity level of the console message. |
| **`message`** | `String` | The text content of the message. |
| **`source`** | `String` | The URL or script origin that emitted the message. |
| **`line`** | `Int` | The line number in the source file where the message was emitted (1-based), or 0 if unknown. |

