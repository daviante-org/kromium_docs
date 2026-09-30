# DevTools, Text Search & JavaScript Bridge

> Open Chromium DevTools, find text on pages, execute JavaScript, extract HTML/text content, and resolve favicons.

- **Category:** Core API
- **Read Time:** 5 min
- **Last Updated:** 2026-10-01

## Opening Developer Tools

The `browser.devTools` facade provides direct control over the native Chromium Developer Tools window.

```kotlin
// Open DevTools (docked or undocked based on Chromium default)
browser.devTools.openDevTools()

// Open DevTools targeting a specific element at coordinates
browser.devTools.openDevTools(inspectPoint = Point(300, 200))

// Close DevTools
browser.devTools.closeDevTools()
```

## Find Text on Page

The `browser.search` facade provides in-page text search with highlighting, case sensitivity, and directional navigation — similar to Ctrl+F in a browser.

```kotlin
// Start a case-insensitive forward search
browser.search.find(
    searchText = "Kromium",
    forward = true,
    matchCase = false,
    findNext = false
)

// Navigate to the next match
browser.search.find(
    searchText = "Kromium",
    forward = true,
    findNext = true
)

// Navigate to the previous match
browser.search.find(
    searchText = "Kromium",
    forward = false,
    findNext = true
)

// Stop searching and clear highlights
browser.search.stopFinding(clearSelection = true)
```

## JavaScript Execution & Bridge

The `browser.jsBridge` facade provides bidirectional JavaScript interoperability with both fire-and-forget execution and async evaluated results.

```kotlin
// Fire-and-forget JavaScript execution
browser.jsBridge.executeJavaScript("document.title = 'Hello from Kotlin'")

// Evaluate and await a result (suspend)
val width = browser.jsBridge.evaluateJavaScript(
    "window.innerWidth * window.devicePixelRatio"
)
println("Viewport width: $width")

// Get full page HTML
val html = browser.jsBridge.getHtml()

// Get visible text content
val text = browser.jsBridge.getText()

// Resolve the page's favicon URL
val favicon = browser.jsBridge.getFaviconUrl()
```

## Java CompletableFuture Interop

All suspend JS bridge methods have `*Async` counterparts for Java interop.

```java
// Java: Get HTML asynchronously
browser.getJsBridge().getHtmlAsync()
    .thenAccept(html -> System.out.println("Page HTML length: " + html.length()));

// Java: Get text content
browser.getJsBridge().getTextAsync()
    .thenAccept(text -> System.out.println("Visible text: " + text));

// Java: Resolve favicon
browser.getJsBridge().getFaviconUrlAsync()
    .thenAccept(url -> System.out.println("Favicon: " + url));
```

## Related APIs

- [KromiumDevTools](/llms/api/kromium-dev-tools.md)
- [KromiumSearch](/llms/api/kromium-search.md)
- [KromiumJsBridge](/llms/api/kromium-js-bridge.md)
- [KromiumConsoleMessage](/llms/api/kromium-console-message.md)

