# Sample Applications & Reference Code

> Explore the 5 official Kromium desktop sample applications covering Compose Multiplatform, Swing, JavaFX, SWT, and AWT.

- **Category:** Getting Started
- **Read Time:** 8 min
- **Last Updated:** 2026-10-01

## Official Sample Applications

The Kromium repository provides 5 fully functional desktop sample applications in the `samples/` directory. Each sample demonstrates production-grade architecture, theming, window management, and Kromium feature integration.

| Sample Application | Path | UI Framework | Features Covered |
| :--- | :--- | :--- | :--- |
| **`kromium-sample-compose`** | `samples/kromium-sample-compose` | Compose Multiplatform (Desktop) | 9 Feature Panels: Automation, Cookies/Storage, DevTools, DOM Extraction, Downloads, Navigation, PDF Print, Security/Network, View Tools |
| **`kromium-sample-swing`** | `samples/kromium-sample-swing` | Java Swing | 9 Feature Panels with custom dark/light theme, card components, traffic light window controls, and logging console |
| **`kromium-sample-javafx`** | `samples/kromium-sample-javafx` | OpenJFX / JavaFX | FXML-free declarative Kotlin UI, TabPane navigation, hardware texture blitting, and automation |
| **`kromium-sample-swt`** | `samples/kromium-sample-swt` | Eclipse SWT | SWT Composite embedding, native OS event loop integration, key event bridge, and developer tools |
| **`kromium-sample-awt`** | `samples/kromium-sample-awt` | Pure Java AWT | Minimalist dependency-free browser, Java2D BufferedImage blitting, and navigation controls |

## Running the Samples

You can launch any sample directly from the root repository using Gradle:

```bash
# Run Compose Multiplatform sample
./gradlew :samples:kromium-sample-compose:run

# Run Swing sample
./gradlew :samples:kromium-sample-swing:run

# Run JavaFX sample
./gradlew :samples:kromium-sample-javafx:run

# Run Eclipse SWT sample
./gradlew :samples:kromium-sample-swt:run

# Run Pure AWT sample
./gradlew :samples:kromium-sample-awt:run
```

## Compose Multiplatform Sample Architecture

Located at `samples/kromium-sample-compose`, this sample demonstrates how to build a tabbed developer workbench using Compose Desktop with reactive StateFlow collection.

```kotlin
// From samples/kromium-sample-compose/src/main/kotlin/org/daviante/kromium/sample/Main.kt
fun main() = application {
    val engine = remember { Kromium.createEngine() }
    DisposableEffect(Unit) {
        engine.initialize()
        onDispose { engine.dispose() }
    }

    val client = remember(engine) { engine.createClient() }
    val browser = remember(client) {
        client.createBrowser(
            url = "https://example.com",
            framework = KromiumUiFramework.COMPOSE
        )
    }

    Window(onCloseRequest = ::exitApplication, title = "Kromium Compose Sample") {
        SampleAppShell(browser = browser)
    }
}
```

## Swing Sample Architecture & UI Shell

Located at `samples/kromium-sample-swing`, this sample illustrates embedding `KromiumSwingCanvas` inside a custom-themed Swing layout with `BorderLayout` and custom swing components.

```kotlin
// From samples/kromium-sample-swing/src/main/kotlin/org/daviante/kromium/sample/swing/Main.kt
SwingUtilities.invokeLater {
    val engine = Kromium.createEngine()
    engine.initialize()

    val client = engine.createClient()
    val browser = client.createBrowser(
        url = "https://example.com",
        framework = KromiumUiFramework.SWING
    )

    val frame = JFrame("Kromium Swing Sample")
    frame.defaultCloseOperation = JFrame.EXIT_ON_CLOSE
    frame.setSize(1400, 900)

    val canvas = browser.view.surface.unwrap(Component::class.java) as JPanel
    frame.contentPane.add(canvas, BorderLayout.CENTER)
    frame.isVisible = true
}
```

## Feature Code Samples in the Repository

The sample applications contain dedicated feature files that developers can directly copy into their projects:

- **`AutomationFeature.kt`**: Automatic form filling, clicking buttons by CSS selector, typing into inputs, and dispatching keyboard events.
- **`CookieStorageFeature.kt`**: Reading/setting cookies, inspecting Local Storage, and clearing browser cache.
- **`DevToolsFeature.kt`**: Launching undocked DevTools window, inspecting specific elements, and measuring page performance.
- **`DomExtractionFeature.kt`**: Extracting page title, outer HTML, text content, and resolving dynamic elements.
- **`DownloadsFeature.kt`**: Intercepting download items, tracking download speed and bytes received, and pausing/canceling.
- **`NavigationFeature.kt`**: URL loading, back/forward history, stop/reload, and navigation stage state listeners.
- **`PdfPrintFeature.kt`**: Vector PDF generation with custom margins, paper sizes, and headers/footers.
- **`SecurityNetworkFeature.kt`**: Custom SOCKS5/HTTP proxy setup, SSL certificate exception handling, and media permissions.
- **`ViewToolsFeature.kt`**: Zoom level manipulation, window resizing, and screenshot capture.

## Related APIs

- [KromiumUiFramework](/llms/api/kromium-ui-framework.md)
- [KromiumView](/llms/api/kromium-view.md)
- [KromiumBrowser](/llms/api/kromium-browser.md)
- [KromiumAutomation](/llms/api/kromium-automation.md)

