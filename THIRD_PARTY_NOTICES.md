# Third-party and imported-source notices

This file records material that should **not** be silently relabelled as original 5bit work.

## NeoStation website source

The initial website snapshot was imported from the NeoStation website under its MIT licence. The original MIT copyright and permission notice remains in `LICENSE.md`.

## System metadata snapshot

`public/systems/*.json` is an imported system-metadata snapshot that previously synced from the NeoStation frontend repository. The automatic upstream sync has been removed from this 5bit baseline so future builds do not silently pull NeoStation data.

The dataset still contains upstream schema fields such as `neosync`. Those fields are intentionally **not** renamed to 5bit because doing so would falsify their meaning. Before the data is used as a canonical 5bit product dataset, replace or independently regenerate the metadata and document its licence/provenance.

## Theme Designer system artwork

The Theme Designer contains system artwork carried over from the imported site/asset set. It should be replaced with 5bit-owned, appropriately licensed, or independently sourced artwork before treating the tool as fully independent.

## Third-party products and trademarks

Names such as RetroArch, RomM, RetroAchievements, ScreenScraper, Nintendo, Sony, Microsoft, Sega, and other platform/product names belong to their respective owners. Compatibility references do not imply endorsement.
