# 5bit.one website baseline

## Source and licence

The baseline was derived from the website source at `misobadev/neostation-web`, which was published under the MIT licence. The original MIT copyright and permission notice remains in the root `LICENSE.md`. That notice covers the imported code and is intentionally separate from the public 5bit product identity. No code from the GPL-licensed application repository was imported.

## Changes from the source

- Replaced site identity, metadata, canonical URLs, navigation, footer, and product copy with original 5bit material.
- Removed source-product logos, screenshots, artwork, social/support links, download links, cloud-service references, system metadata, and continuation notes.
- Removed product-specific guide, integration, download, cloud-service, and theme-designer implementations.
- Added a deliberately restrained wordmark and neutral placeholder artwork for v0.1.
- Added honest coming-soon states and separated planned capabilities from anything available now.
- Added pages for Home, Download, Platforms, Systems, and Docs.

The theme designer was removed because its data model, previews, assets, and export promises were coupled to the source product. Reintroducing a designer should wait for a documented 5bit theme format.

## Deployment architecture

Astro produces a static `dist/` directory. Pagefind indexes that directory during `postbuild`. A GitHub Actions workflow runs reproducible npm installation, linting, Astro/type checks, and the production build on `main`, uploads the Pages artifact, and deploys it through GitHub Pages. Pull requests use the separate CI workflow and cannot deploy production.

Astro's `site` is `https://5bit.one/` and no repository subpath is configured. `public/CNAME` is copied into the artifact with the apex domain. GitHub Pages should be configured with `5bit.one` as the custom domain and HTTPS enforcement enabled after GitHub confirms DNS and certificate readiness. The apex is canonical; GitHub Pages should redirect the configured `www.5bit.one` CNAME to it.

## Design decisions

This is v0.1, not a full visual redesign. It retains the generic Astro layout, dark responsive foundation, metadata integrations, accessible skip link, and Markdown/MDX-capable toolchain. The temporary identity is a plain `5bit` wordmark and a small neutral mark. Copy avoids availability promises.

## Remaining technical debt

- Add real user documentation and search-backed content when the product has testable workflows.
- Replace placeholder brand assets during the v0.2 identity phase.
- Add automated internal-link and accessibility regression testing as routes expand.
- Review dependency upgrades periodically; avoid unrelated broad upgrades in this baseline.
- Confirm the first supported release targets before publishing download controls.

## Recommended next phase

Proceed with **5bit.one Visual Identity & Product Website v0.2** only after this baseline is deployed and stable. That phase can define the brand system, product screenshots or mockups, download experience, and richer responsive product storytelling.
