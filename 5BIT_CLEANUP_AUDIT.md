# 5bit cleanup audit

## Fixed in this baseline

- Removed public NeoStation routes (`/neostation`, duplicate `/5bit`) and the NeoSync product page.
- Removed inherited NeoStation logos/screenshots and the NeoSync provider asset from public assets.
- Removed inherited Ko-fi, Patreon, Discord, NeoStation download/release, Obtainium, API, and domain links from public pages.
- Replaced the Downloads page with an honest 5bit release-status page; no third-party binaries are relabelled as 5bit.
- Reframed integrations as targets/plans rather than claiming unfinished functionality is already shipping.
- Removed NeoSync/cloud-save claims from the guide and homepage.
- Replaced the footer with 5bit navigation, GitHub links, and a centered disclaimer.
- Rebranded the package/web manifest and removed the NeoStation image-domain allowlist.
- Removed CI-time syncing from the NeoStation frontend repository.
- Rewrote README/CONTRIBUTING and removed obsolete NeoStation continuation notes.
- Preserved the original MIT notice in `LICENSE.md` instead of falsifying its copyright.

## Intentionally retained

- `LICENSE.md` still names NeoStation because the MIT copyright notice must be preserved for the imported source.
- `public/systems/*.json` still contains upstream schema/data, including `neosync` fields. Those fields were not renamed because that would change their meaning. Replace/regenerate the dataset before making it a canonical 5bit asset.
- Theme Designer system artwork is still inherited/imported and needs its own asset-provenance pass.

## Recommended next work

1. Define a 5bit-owned system metadata schema and replace the imported system JSON dataset.
2. Replace Theme Designer system art with 5bit-owned or clearly licensed art.
3. Publish real 5bit release artifacts before enabling platform download buttons.
4. Decide on an official private contact email before adding community moderation/privacy contact language.
5. Generate 5bit-owned favicon/OG images rather than retaining generic imported social assets.
6. Audit Guide screenshots and replace any UI capture that visually belongs to the upstream application.
7. When accounts, analytics, payments, ads, or mailing lists are added, revisit privacy/cookie/legal requirements.
