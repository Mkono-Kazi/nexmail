# Local development setup

## Required tools

- Node.js 22.22.3
- pnpm 12.21.0 (Corepack can activate the version pinned in `package.json`)
- Rust stable with the platform's Tauri prerequisites
- Docker Engine/Desktop with Compose v2

## Start local services

1. Copy `.env.example` to `.env` and keep `.env` local.
2. Start PostgreSQL and Valkey with `docker compose up -d`.
3. Install workspace dependencies with `pnpm install`.
4. Generate the Prisma client and create the initial local schema with `pnpm --filter @nexmail/database generate` followed by `pnpm --filter @nexmail/database exec prisma db push`.
5. Start the API, worker, and desktop shell in separate terminals with `pnpm dev:api`, `pnpm dev:worker`, and `pnpm dev:desktop`.

The desktop currently displays API and dependency health. Mail workflows, authentication, encrypted device storage, provider integrations, and production migrations are not implemented yet. The local database command is for disposable development data only; production schema changes must use reviewed migrations.
