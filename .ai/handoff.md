# Handoff

Updated: 2026-11-20

## State

Nexmail is documentation-only with accepted decisions recorded in `DECISIONS.md`: Tauri 2 + React/TypeScript, NestJS 12 API/worker, PostgreSQL 18, Valkey 8/BullMQ 5, SQLCipher-backed SQLite, self-hosted Docker/Coolify, and a Gmail-first vertical slice. Project rules, goal prompts, and agent workflows exist; no application code or Git repository exists yet.

## Done this session

- Recorded architecture, product, and brand direction in `ARCHITECTURE.md`, `DECISIONS.md`, `BRAND_GUIDE.md`, `PRODUCT.md`, `README.md`, `ROADMAP.md`, and `continuity.md`.
- Added `PROJECT_RULES.md`, prompts under `prompts/`, and workflows under `skills/`.
- Added `.ai/context.md` and this handoff.

## Owner setup remaining

- Owner provisioning remains: create the GitHub repository; configure Google/Microsoft OAuth applications before provider milestones; set each self-hosted instance's URL, SMTP, token key, TLS, backup destination, and platform signing credentials.
- No code, dependencies, database migration, API, worker, UI, or CI has been created or verified.

## Next action

Scaffold the pnpm/Turborepo monorepo, Docker Compose services, NestJS API and worker, shared TypeScript contracts, PostgreSQL schema/migration, and minimal Tauri/React desktop shell. Preserve `sources/` unchanged.
