# Downloads, Permissions & SSL Security API

> Intercept downloads, handle camera/microphone permissions, and enforce SSL certificate policies and domain whitelists.

- **Category:** Security
- **Read Time:** 6 min
- **Last Updated:** 2026-09-27

## File Download Management

Control file downloads with beforeDownloadListener to customize target paths or cancel downloads, and downloadListener to track real-time progress.

```kotlin
client.beforeDownloadListener = KromiumBeforeDownloadListener { item, suggestedFileName ->
    if (suggestedFileName.endsWith(".exe")) {
        return@KromiumBeforeDownloadListener "" // Cancel download
    }
    File(downloadsDir, suggestedFileName).absolutePath
}

client.downloadListener = KromiumDownloadListener { item ->
    println("Progress: ${item.percentComplete}%")
}
```

## Camera, Microphone & Device Permissions

Intercept WebRTC camera, microphone, and screen share requests via KromiumPermissionListener.

```kotlin
client.permissionListener = KromiumPermissionListener { request ->
    if (request.origin.endsWith("meet.google.com")) {
        KromiumPermissionDecision.GRANT
    } else {
        KromiumPermissionDecision.DENY
    }
}
```

## SSL/TLS Certificate Policies

Configure certificate validation error handling using SslErrorPolicy.

```kotlin
val config = KromiumClientConfig.builder()
    .sslErrorPolicy(SslErrorPolicy.allowDomains("*.corp.internal", "localhost"))
    .build()
```

## Domain Sandboxing & Host Locking

Lock the browser to navigate strictly within an allowed set of hostnames or domains.

```kotlin
browser.security.hostLock = setOf("app.internal.net", "accounts.google.com")
browser.security.hostLockSubresources = true
```

## Related APIs

- [KromiumSecurity](/llms/api/kromium-security.md)
- [SslErrorPolicy](/llms/api/ssl-error-policy.md)
- [KromiumPermissionListener](/llms/api/kromium-permission-listener.md)
- [KromiumDownloads](/llms/api/kromium-downloads.md)

