# 5bit.one website

The public website for **5bit**, a universal gaming home in development. Production is published at [5bit.one](https://5bit.one).

This is the website repository, not the 5bit application. Product features described on the site are labelled as planned or coming later until supported builds exist.

## Stack

- Astro 6 with TypeScript
- Tailwind CSS 4
- Pagefind static search infrastructure
- Astro sitemap, robots, and webmanifest integrations
- GitHub Pages deployed by GitHub Actions

## Development

Node 24 is specified in `.nvmrc`.

```sh
npm ci
npm run dev
```

Quality and production commands:

```sh
npm run lint
npm run check
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/` and then creates the Pagefind index.

## Repository structure

- `src/pages/` — public routes
- `src/components/` — shared page chrome and metadata
- `src/styles/` — baseline design utilities
- `public/` — static assets, `CNAME`, and browser resources
- `.github/workflows/` — continuous integration and Pages deployment
- `docs/architecture/` — architectural decisions and technical debt

## Deployment

Pushes to `main` run install, lint, Astro/type checks, and the production build. The resulting `dist/` directory is uploaded as a GitHub Pages artifact and deployed with least-privilege Pages permissions. Pull requests run CI but do not deploy production.

The canonical origin is `https://5bit.one`; this apex custom domain does not use a repository-path base URL. `public/CNAME` preserves the custom-domain declaration in the deployed artifact.

## Licence and source attribution

This codebase began from the MIT-licensed [`misobadev/neostation-web`](https://github.com/misobadev/neostation-web) website. Its MIT copyright notice is preserved in [`LICENSE.md`](LICENSE.md). Public product branding, copy, links, logos, screenshots, and product-specific services from that source were removed; no application code was imported.

See [`docs/architecture/website-baseline.md`](docs/architecture/website-baseline.md) for the complete baseline record.
