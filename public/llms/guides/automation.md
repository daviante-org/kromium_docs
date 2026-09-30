# Web Automation & DOM Interaction API

> Playwright-inspired automation engine for SPAs, MutationObserver-backed waiting, form filling, and keystroke dispatch.

- **Category:** Core API
- **Read Time:** 7 min
- **Last Updated:** 2026-09-27

## Waiting for Elements & URLs

Kromium's waitForSelector injects an in-V8 MutationObserver to avoid IPC polling overhead, resuming your coroutine the millisecond the element appears.

```kotlin
// Suspends until element matching CSS selector appears
val found = browser.automation.waitForSelector(
    selector = "#login-form",
    timeoutMs = 10_000L
)

// Wait for redirect to dashboard
val redirected = browser.automation.waitForUrl(
    pattern = "https://app.example.com/dashboard",
    timeoutMs = 15_000L
)
```

## Form Inputs & Keystroke Simulation

Automate forms using fill, type, selectOption, and click.

```kotlin
// Instant fill (dispatches input and change events)
browser.automation.fill("input#username", "admin@company.com")

// Human-like keystroke typing with delay
browser.automation.type("input#password", "secret", delayMs = 50L)

// Select option
browser.automation.selectOption("select#country", "US")

// Click button
browser.automation.click("button[type='submit']")
```

## DOM Extraction & State Querying

Inspect DOM properties and content directly without writing raw JavaScript strings.

```kotlin
val text = browser.automation.getTextContent("h1.title")
val href = browser.automation.getAttribute("a#download-link", "href")
val isVisible = browser.automation.isVisible(".modal-dialog")
val totalItems = browser.automation.count(".item-row")
```

## JavaScript Bridge & Async Evaluation

Execute arbitrary JavaScript and await results via browser.jsBridge.

```kotlin
val result = browser.jsBridge.evaluateJavaScript("window.innerWidth * window.devicePixelRatio")
val html = browser.jsBridge.getHtml()
```

## Related APIs

- [KromiumAutomation](/llms/api/kromium-automation.md)
- [KromiumJsBridge](/llms/api/kromium-js-bridge.md)

