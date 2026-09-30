# Cloudflare R2 Maven Repository Guide

> How Kromium packages are published to Cloudflare R2 and how downstream projects configure their Maven / Gradle builds.

- **Category:** Deployment
- **Read Time:** 6 min
- **Last Updated:** 2026-09-27

## Overview & Architecture

Kromium publishes standard Maven repository layouts directly to Cloudflare R2 under https://repo.daviante.org/artifacts.

### Benefits of Cloudflare R2
- **Zero Egress Fees:** $0 for outbound data transfer.
- **S3-Compatible API:** Operates seamlessly with standard build tools.
- **Edge Caching:** Fast global distribution via Cloudflare's CDN.

## Configuring Downstream Projects

To consume Kromium artifacts in downstream Gradle or Maven projects, add the repository URL to your repository configuration.

```kotlin
// settings.gradle.kts or build.gradle.kts
repositories {
    mavenCentral()
    maven("https://repo.daviante.org/artifacts")
}
```

## Related APIs

- [KromiumEngineDownloadConfig](/llms/api/kromium-engine-download-config.md)

