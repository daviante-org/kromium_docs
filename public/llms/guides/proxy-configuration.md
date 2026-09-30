# Enterprise Networking & Proxies API

> Configure HTTP, HTTPS, SOCKS5, and PAC proxies, remote DNS leak protection, and dynamic proxy switching.

- **Category:** Networking
- **Read Time:** 6 min
- **Last Updated:** 2026-09-27

## Supported Proxy Modes

Kromium models proxy configurations via the type-safe sealed class KromiumProxy.

| Mode | Class | Description |
| :--- | :--- | :--- |
| **System Default** | `KromiumProxy.System` | Adopts host OS proxy settings. |
| **Direct** | `KromiumProxy.Direct` | Bypasses all proxies. |
| **Auto-Detect** | `KromiumProxy.AutoDetect` | Uses WPAD via DHCP and DNS queries. |
| **PAC Script** | `KromiumProxy.Pac(pacUrl)` | Downloads and evaluates PAC script. |
| **HTTP / HTTPS** | `KromiumProxy.Http(...)` | Standard HTTP or TLS-encrypted forward proxy. |
| **SOCKS5 / SOCKS4** | `KromiumProxy.Socks5(...)` | SOCKS proxy with optional remote DNS leak protection. |
| **Multi-Protocol** | `KromiumProxy.MultiProtocol(...)` | Routes different protocols through separate endpoints. |

## Configuring Proxies

Configure the proxy when building KromiumConfig before engine startup.

```kotlin
val config = KromiumConfig.builder()
    .browserConfig { b ->
        b.proxy(
            KromiumProxy.Http(
                host = "proxy.corp.internal",
                port = 8080,
                username = "corporate_user",
                password = "secure_password",
                isSecure = true,
                bypassList = listOf("<local>", "127.0.0.1", "*.internal.net")
            )
        )
    }
    .build()
```

## SOCKS5 with Remote DNS Leak Protection

Setting remoteDns = true ensures DNS queries are resolved exclusively through the proxy rather than leaking to local ISP.

```kotlin
val socks5 = KromiumProxy.Socks5(
    host = "10.0.0.1",
    port = 1080,
    remoteDns = true
)
```

## Dynamic Runtime Proxy Switching

Switch proxies dynamically on active client sessions without restarting the engine.

```kotlin
val proxyManager = client.proxyManager
proxyManager.setProxy(KromiumProxy.Direct)
```

## Related APIs

- [KromiumProxy](/llms/api/kromium-proxy.md)
- [KromiumProxyManager](/llms/api/kromium-proxy-manager.md)

