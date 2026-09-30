# KromiumJsDialog

```kotlin
class KromiumJsDialog(
    val message: String,
    val defaultPromptText: String,
    val type: KromiumJsDialogType,
    val originUrl: String = "",
    private val onConfirm: (promptResult: String) -> Unit,
    private val onCancel: () -> Unit
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.ui`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`message`** | `String` | The text message displayed by the dialog. |
| **`defaultPromptText`** | `String` | The default input text if type is PROMPT. |
| **`type`** | `KromiumJsDialogType` | The dialog classification (ALERT, CONFIRM, PROMPT). |
| **`originUrl`** | `String` | The URL of the web page that initiated the dialog. |
| **`isHandled`** | `Boolean` | Indicates whether this dialog has already been confirmed or cancelled. |

## Methods

### `confirm()`

```kotlin
fun confirm(promptResult: String = defaultPromptText)
```

Confirms or accepts the dialog. For prompts, passes promptResult back to the JavaScript engine.


### `cancel()`

```kotlin
fun cancel()
```

Cancels or dismisses the dialog.


