# Continuation Notes - NeoStation Assets

> Create this note so a future session can pick up exactly where we left off.

## Project locations

- **API service (Go):** `/Users/misoba/Workspaces/misoba/neostation-assets-service`
  - remote: `git@github.com:misobadev/neostation-assets-service.git` (commit `2523b60`, pushed to `main`; local work uncommitted)
  - Runs locally in Docker on port `8090` (API), Postgres on `5433`. R2 bucket `neostation-assets` served via custom domain `assets-cdn.neostation.dev`.
- **Web frontend (Astro, public marketing site):** `/Users/misoba/Workspaces/misoba/neostation-web`
  - Deployed at `neostation.dev`. NO arts/admin pages (moved out).
- **Assets app (React + Vite, NEW):** `/Users/misoba/Workspaces/misoba/neostation-assets-web`
  - Deployed at `assets.neostation.dev`. Contains the arts builder (accounts + my submissions timeline) and the admin panel.
- **Design reference:** `/Users/misoba/Workspaces/neogamelab/neosync/neosync-web` (React Router + Tailwind v4 pure, NO daisyUI). Copy its look.

## Subdomains / URLs (current plan)

- `assets.neostation.dev` — the new React assets app (builder + admin).
- `assets-api.neostation.dev` — the Go API (default `PUBLIC_ASSETS_API_URL` / `VITE_ASSETS_API_URL`).
- `assets-cdn.neostation.dev` — Cloudflare R2 custom domain that serves the pack files (`R2_PUBLIC_BASE_URL`, `VITE_CDN_BASE`). NOTE: was `assets.neostation.dev`, changed 2026-08-21.
- `neostation.dev` — the marketing Astro site.

## Accounts + submission timeline feature (done, working locally)

Users register (email verification + password reset via SMTP) and log in to submit packs. Submissions are tied to the account; the arts app shows a timeline of each submission's status (by date) including admin comments.

### Backend (`neostation-assets-service`)
- Migrations: `005_create_users_table`, `006_add_submissions_user_id`.
- `pkg/auth`: `UserClaims`, `GenerateUserToken`, `ParseUserToken`, `UserMiddleware`, `WithUser`/`UserFromContext`.
- `internal/email/email.go`: SMTP sender (go-mail) with verification + reset templates; links point to `{FRONTEND_URL}/?verify=...` and `?reset=...`.
- `internal/services/user_service.go`: `UserService` with Register / Login / VerifyEmail / ResendVerification / ForgotPassword / ResetPassword / GetUserByID. Tokens 32B hex; verification TTL 24h, reset TTL 1h; forgot-password 1min cooldown, never reveals account existence. `SkipEmailVerification` skips the verified-email login gate (dev only).
- Submission flow requires user JWT; upload/complete check ownership. Admin approve/reject accept optional `comment` appended to the log.
- Endpoints: `POST /api/v1/register|login|verify-email|resend-verification|forgot-password|reset-password`, `GET /api/v1/verify-email?token=`; user-JWT `GET /api/v1/auth/me`, `GET /api/v1/auth/submissions(/{id})`, `POST /api/v1/submissions`, `POST /api/v1/submissions/{id}/upload`, `POST /api/v1/submissions/{id}/complete`; admin `POST /api/v1/admin/login`, submissions list/detail, approve/reject (both accept optional `comment`). Admin login handler renamed to `AdminLogin`.
- Env: `SKIP_EMAIL_VERIFICATION`, `SMTP_HOST/PORT/USERNAME/PASSWORD/FROM_EMAIL/FROM_NAME`, `FRONTEND_URL` (set to the assets app URL), `EMAIL_LOGO_URL`. SMTP creds (Infomaniak) live in the gitignored `.env`.

### Frontend — neostation-assets-web (React + Vite + react-router + Tailwind v4)
- `src/pages/HomePage.tsx`: auth (login/register/forgot/reset via `?reset=`, auto verify via `?verify=`), pack builder (metadata + backgrounds/preview uploaded via presigned R2 URLs), "My submissions" timeline, and public browse of approved packs. User JWT in `neostation-user-token` localStorage.
- `src/pages/AdminPage.tsx`: admin login, list by status, detail modal with files/logs + "Comment for the submitter" (approve sets version + comment; reject sets comment).
- `src/lib/api.ts`: typed API client; env `VITE_ASSETS_API_URL` (browser-reachable API) and `VITE_CDN_BASE` (R2 CDN).
- `src/lib/systems.ts`: loads the 121 official systems from `src/data/systems/*.json` (copied from neostation-web `public/systems`) at build time.
- `src/index.css`: full design system ported from neostation-web `global.css` (pure Tailwind v4, daisyUI class names re-implemented as `@utility`).
- Docker: `Dockerfile` accepts `VITE_ASSETS_API_URL`/`VITE_CDN_BASE` build args; nginx SPA fallback.
- Local container: `neostation-assets-web-local` on `http://localhost:5173`.

### neostation-web changes (marketing site)
- DELETED `src/pages/arts.astro` and `src/pages/admin.astro`; removed "System Art" from `site.config.ts` `menuLinks` and from `Footer.astro`. Build now emits 10 pages. `public/systems` is still used by `guide.astro` (kept).
- The old `/arts/` and `/admin/` URLs now serve the homepage via nginx fallback (no 404 page wired).

## How to run everything locally

```bash
# API on :8090 (migrations auto-apply on startup)
cd /Users/misoba/Workspaces/misoba/neostation-assets-service && docker compose up -d --build
# Assets app on :5173 (Vite dev) — for dev use: npm run dev
cd /Users/misoba/Workspaces/misoba/neostation-assets-web && npm run dev
# or production-like docker:
docker build --build-arg VITE_ASSETS_API_URL=http://localhost:8090 -t neostation-assets-web:local . && docker run -d --name neostation-assets-web-local -p 5173:80 neostation-assets-web:local
# Marketing site on :8091
cd /Users/misoba/Workspaces/misoba/neostation-web && docker build --build-arg PUBLIC_ASSETS_API_URL=http://localhost:8090 -t neostation-web:local . && docker rm -f neostation-web-local; docker run -d --name neostation-web-local -p 8091:80 neostation-web:local
```
- Register at http://localhost:5173/ (real inbox needed for the verify link; SMTP is live). For a quick local test set `SKIP_EMAIL_VERIFICATION=true` in the assets `.env`.
- Admin at http://localhost:5173/admin — creds in `neostation-assets-service/.env` (`ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD`).

## What STILL NEEDS TO BE DONE

### 1. Visual QA
- Review the new app at http://localhost:5173 (register -> verify -> submit -> see timeline) and /admin (reject with comment -> see it in the submitter timeline).
- neostation-web remaining pages still not visually verified against the design system: `neostation.astro`, `downloads.astro`, `guide.astro`, `integrations.astro`, `neosync.astro`, `404.astro`, `payment-success.astro`, `payment-cancel.astro` (index.astro done).

### 2. Deploy notes (Dokploy, later)
- API: set `FRONTEND_URL=https://assets.neostation.dev`, `SMTP_*`, `SKIP_EMAIL_VERIFICATION=false`, `R2_PUBLIC_BASE_URL=https://assets-cdn.neostation.dev`.
- Assets app build: `VITE_ASSETS_API_URL=https://assets-api.neostation.dev`, `VITE_CDN_BASE=https://assets-cdn.neostation.dev`.
- Marketing web build: no arts/api needed anymore (can drop the `PUBLIC_ASSETS_API_URL` arg).

### 3. Optional cleanups
- neostation-web: `@fontsource-variable/sora`, `jetbrains-mono`, `anta` deps no longer imported — optional remove.
- Backend: no rate limiting on auth endpoints yet — consider adding for /register, /forgot-password, /resend-verification before production.

## Context on the API service (for reference, already done)

- Endpoints: `GET /health`, `GET /api/v1/packs`, `GET /api/v1/manifest`; account: `POST /api/v1/register|login|verify-email|resend-verification|forgot-password|reset-password`, `GET /api/v1/verify-email?token=`; user-JWT: `GET /api/v1/auth/me`, `GET /api/v1/auth/submissions(/{id})`, `POST /api/v1/submissions`, `POST /api/v1/submissions/{id}/upload`, `POST /api/v1/submissions/{id}/complete`; admin: `POST /api/v1/admin/login`, `GET/POST /api/v1/admin/submissions...`, approve/reject (both accept optional `comment`).
- R2 layout: `packs/{packId}/backgrounds/{system}.webp`, `packs/{packId}/preview.webp`, `packs/{packId}/theme.json`, plus `manifest.json` at bucket root.
- Config via `.env` (gitignored): `PORT=8090`, `POSTGRES_DB=neostation_assets`, `POSTGRES_USER=neostation_user`, `POSTGRES_PORT=5433`, `R2_ACCOUNT_ID/ACCESS_KEY/SECRET_KEY`, `R2_BUCKET_NAME=neostation-assets`, `R2_PUBLIC_BASE_URL=https://assets.neostation.dev`, `ADMIN_SEED_EMAIL=miguel.soto@neostation.dev`, `ADMIN_SEED_PASSWORD=...`, `JWT_SECRET=...`.
- To deploy to Dokploy later: set `PUBLIC_ASSETS_API_URL` in neostation-web build to the Go API subdomain (e.g. `https://assets-api.neostation.dev`).

## Important gotchas

- The user wants **English only** in comments/README (no Spanish) and **no emojis** in code/messages. Not a xintec project → comments in English.
- Commits/PRs only when the user explicitly asks, and in English.
- The `.env` files are gitignored; never commit secrets.
- Default API URL in the web is `https://assets-api.neostation.dev`; the actual subdomain is not yet created/deployed.
