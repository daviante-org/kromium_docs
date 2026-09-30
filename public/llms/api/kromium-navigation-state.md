# KromiumNavigationState

```kotlin
data class KromiumNavigationState(
    val isLoading: Boolean = false,
    val canGoBack: Boolean = false,
    val canGoForward: Boolean = false,
    val url: String = "",
    val title: String = ""
)
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.navigation`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`isLoading`** | `Boolean` | Whether the browser is currently loading a resource. |
| **`canGoBack`** | `Boolean` | Whether backward navigation is available in session history. |
| **`canGoForward`** | `Boolean` | Whether forward navigation is available in session history. |
| **`url`** | `String` | The currently loaded URL. |
| **`title`** | `String` | The title of the currently loaded page. |

