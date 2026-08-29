# NeoStation web audit verification

Verified on 2026-08-29 against the live `RedRocDev/5Bit.one` clone after reading the complete 1,216-line handoff at `C:/Users/fcare/OneDrive/Desktop/WiiGames/5bit-neostation-web-audit.md`.

The handoff is evidence and shared technical context. The live repository remains authoritative where it differs.

## Preserved import

- Imported upstream commit: `677ec3f607f1eefc5cf529a122ac45e8e9eb99bf`
- Imported tree: `be63dbd0b38851b3b3a01a0a3290472f723dcdee`
- Permanent tag: `v0.0.0-import`
- Files in imported tree: 210
- Astro pages in imported tree: 8
- System JSON files in imported tree: 122
- Upstream framework declaration: Astro `^6.4.8`
- Upstream MIT notice: present in `LICENSE.md`, including `Copyright (c) 2026 NeoStation`

The file, page, and system-data counts exactly match the archive audit. The source archive itself is not stored in this clone, so its reported ZIP SHA-256 could not be independently recomputed here. The imported commit and tree hashes are the repository-native integrity identifiers for the preserved baseline.

The baseline tag was added after the transformation because the initial transformation had already completed when the handoff was explicitly adopted. No selective re-import or project restart was performed. The untouched imported tree remained available in Git history throughout and is now permanently named and pushed.

## Classification verification

| Classification | Verified treatment in current `main` |
|---|---|
| KEEP | Astro static-site foundation, TypeScript, Tailwind utility system, base layout, skip link, icon support, sitemap, robots, webmanifest, responsive shell, Markdown/MDX-capable dependencies, Pagefind indexing, and 404 structure |
| ADAPT | `BaseHead`, header, footer, site configuration, global styles, mobile navigation, SEO metadata, canonical URLs, and generic page layout mechanics |
| REWRITE | Home, download state, product copy, public navigation, documentation landing page, favicon/brand mark, OpenGraph artwork, README, platforms, and systems positioning |
| REMOVE | NeoStation and NeoSync routes, source-product downloads and release fetches, guide/integrations pages, Theme Designer public route, branded images, provider art, system dataset, sync script, donation/community links, stale environment plumbing, continuation notes, Docker/nginx files, and host-specific `_headers` |
| REVIEW-LICENCE / REFERENCE | System/emulator registry schema, historical system JSON, Theme Designer concepts, and third-party provider marks remain available only through the preserved import tree and audit context |

## Findings confirmed against the imported tree

- The repository was a static Astro marketing/documentation/tool site, not the Flutter application.
- The system dataset was coupled to `misobadev/neostation-frontend` through `scripts/sync-systems.mjs`, including non-deterministic CI/build-time fetching.
- The downloads page was coupled to NeoStation releases and an unauthenticated GitHub release API request.
- The Theme Designer was a substantive client-only tool with NeoStation-specific previews and compatibility promises.
- NeoStation branding, screenshots, service claims, community/support links, and release links were pervasive and required systematic removal.
- The upstream nginx/Dokploy/Docker architecture was unnecessary for static GitHub Pages hosting.
- Pagefind generated an index without an exposed search interface.
- RSS discovery links existed without matching feeds.
- No automated test suite existed; lint, Astro checks, build, and browser smoke checks were the relevant validation lanes.

## Live-clone differences from the audited archive

- `main` is already the transformed 5bit v0.1 baseline; the audit describes the preserved import at `v0.0.0-import`.
- Astro was upgraded from 6.4.8 to 7.2.9 to resolve current security advisories. The upgraded project passes install, lint, Astro/type checks, and production build.
- The current site has 50 tracked files and six Astro pages: Home, Download, Platforms, Systems, Docs, and 404.
- The truthful download route is singular `/download/`, rather than the audit's approximate `/downloads/` suggestion.
- GitHub Pages deployment, the `5bit.one` custom domain, apex canonicalization, `www` redirect, approved certificate, and HTTPS enforcement are already active.
- The transformation was committed directly on `main` before this handoff was explicitly adopted, rather than on a separate transformation branch. The imported tree was not lost and is now protected by the permanent tag.
- Source-family strings remaining in the current tree are limited to legal attribution, developer architecture/audit documentation, and project memory. They are not public product branding or runtime service references.

## Current technical debt carried forward from the audit

- Pagefind still creates an index without a public search interface; add documentation search or remove the unused indexing path later.
- Markdown/content infrastructure is retained but not yet powering a full documentation collection.
- The `clean` npm script remains Unix-shell-specific and should be made cross-platform before relying on it for Windows development.
- External Google Fonts and unused/heavy dependencies should be reviewed in a focused cleanup, with build verification after each change.
- The broad speculation-rules prefetch/prerender policy remains and should be measured before the site grows.
- A future 5bit Runtime Registry/System Doctor must use 5bit-owned or clearly licensed data rather than restoring the historical dataset blindly.
- A future Theme Studio requires a 5bit-owned theme contract and UI before any preserved implementation ideas return to production.

## Conclusion

The audit accurately describes the preserved imported snapshot and its primary risks. The live transformation follows its substantive KEEP/ADAPT/REWRITE/REMOVE/REVIEW-LICENCE classification, with the chronology and route-name differences documented above. Future work should proceed from current `main`, using `v0.0.0-import` only as the complete historical reference.
