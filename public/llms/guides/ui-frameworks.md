# Multi-Framework UI Integration Guide

> Learn how to embed Kromium's off-screen rendering (OSR) surface in Jetpack Compose, Swing, JavaFX, SWT, and AWT.

- **Category:** UI Integrations
- **Read Time:** 10 min
- **Last Updated:** 2026-10-01

## Supported UI Frameworks

Kromium features a decoupled Off-Screen Rendering (OSR) engine that streams raw Chromium BGRA pixel buffers directly into the native graphical surface of your chosen UI toolkit.

| Framework | Target Module | Framework Identifier | Canvas Surface |
| :--- | :--- | :--- | :--- |
| **Compose Multiplatform** | `kromium-compose` | `KromiumUiFramework.COMPOSE` | `KromiumView` Composable |
| **Swing** | `kromium-swing` | `KromiumUiFramework.SWING` | `KromiumSwingCanvas` (`JPanel`) |
| **JavaFX** | `kromium-javafx` | `KromiumUiFramework.JAVAFX` | `KromiumJavaFxCanvas` (`StackPane`) |
| **Eclipse SWT** | `kromium-swt` | `KromiumUiFramework.SWT` | `KromiumSwtCanvas` (`Canvas`) |
| **Pure AWT** | `kromium-awt` | `KromiumUiFramework.AWT` | `KromiumAwtCanvas` (`Canvas`) |

## Compose Multiplatform Integration

The kromium-compose module provides the declarative @Composable KromiumView component with built-in reactive navigation state collection.

```kotlin
val client = engine.createClient()
val browser = client.createBrowser(
    url = "https://example.com",
    framework = KromiumUiFramework.COMPOSE
)

// In your Composable hierarchy:
KromiumView(
    browser = browser,
    modifier = Modifier.fillMaxSize()
)
```

## Java Swing Integration

In Swing applications, Kromium unwraps into a standard javax.swing.JPanel component.

```kotlin
val browser = client.createBrowser(
    url = "https://example.com",
    framework = KromiumUiFramework.SWING
)

val panel = browser.view.surface.unwrap(Component::class) as JPanel
frame.contentPane.add(panel, BorderLayout.CENTER)
```

## JavaFX Integration

For JavaFX applications, Kromium provides hardware-accelerated texture blitting into a JavaFX Region.

```kotlin
val browser = client.createBrowser(
    url = "https://example.com",
    framework = KromiumUiFramework.JAVAFX
)

val fxNode = browser.view.surface.unwrap(javafx.scene.Node::class)
rootStackPane.children.add(fxNode)
```

## Eclipse SWT Integration

For Eclipse SWT/RCP applications, `kromium-swt` provides `KromiumSwtCanvas` which renders Chromium frames into an SWT `Canvas` widget using an internal `SwtOsrBuffer`. A keyboard bridge handles SWT-to-CEF key event translation automatically.

```kotlin
val browser = client.createBrowser(
    url = "https://example.com",
    framework = KromiumUiFramework.SWT
)

val swtCanvas = browser.view.surface.unwrap(org.eclipse.swt.widgets.Canvas::class)
// Add the canvas to your SWT Composite layout
val layoutData = GridData(SWT.FILL, SWT.FILL, true, true)
swtCanvas.layoutData = layoutData
parent.layout(true, true)
```

## Pure AWT Integration

For lightweight Pure AWT applications without Swing dependencies, `kromium-awt` provides `KromiumAwtCanvas` which renders directly into a `java.awt.Canvas` component using Java2D `BufferedImage` blitting.

```kotlin
val browser = client.createBrowser(
    url = "https://example.com",
    framework = KromiumUiFramework.AWT
)

val awtCanvas = browser.view.surface.unwrap(java.awt.Canvas::class)
val frame = Frame("Kromium AWT Browser")
frame.add(awtCanvas, BorderLayout.CENTER)
frame.setSize(1280, 800)
frame.isVisible = true
```

## Related APIs

- [KromiumUiFramework](/llms/api/kromium-ui-framework.md)
- [KromiumView](/llms/api/kromium-view.md)
- [KromiumRenderSurface](/llms/api/kromium-render-surface.md)

