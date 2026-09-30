# KromiumSecurity

```kotlin
interface KromiumSecurity
```

- **Module:** `kromium-api`
- **Package:** `org.daviante.kromium.api.network`
- **Since Version:** v1.0.0.150-b11

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`hostLock`** | `Set<String>?` | Whitelist of allowed hostnames/domains. Navigations outside these domains will be rejected. |
| **`hostLockSubresources`** | `Boolean` | When true, host lock also restricts subresource network requests (scripts, xhr, fetch). |
| **`hostLockSubframes`** | `Boolean` | When true, host lock also restricts navigations in subframes (iframes). Defaults to false, allowing embedded verification widgets to navigate within iframes without violating host locking. |

