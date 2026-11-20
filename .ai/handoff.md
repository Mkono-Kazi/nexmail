# Handoff

Updated: 2026-11-20

## State

Nexmail implementation is underway in the WSL Git checkout at `/home/pexter/projects/nexmail`. Milestone 1 has a pnpm 12.21.0/Turborepo workspace with a React/Tauri shell, shared Zod health contract, NestJS API health endpoint, separate BullMQ worker process, PostgreSQL/Valkey Compose services, initial Prisma schema, and a GitHub Actions quality workflow.

## Completed this session

- Added workspace package manifests, shared TypeScript settings, ESLint and Prettier setup, pnpm lockfile, and tightly scoped dependency build-script approvals.
- Added the brand-aligned desktop shell. It fetches and validates the API health response and shows accessible connection/error states.
- Added a NestJS API health route that reports PostgreSQL and Valkey status, plus an isolated BullMQ worker process.
- Added local PostgreSQL 18 and Valkey 8 Compose services, `.env.example`, and [DEV_SETUP.md](../DEV_SETUP.md).
- Added the initial Prisma data model for users, devices, provider accounts, sync cursors, and durable operations.
- Added the GitHub Actions formatting/lint/typecheck/build workflow.
- Verified locally: dependency installation, `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass.

## Not complete / environment limits

- No feature-complete mail workflow, authentication, Gmail adapter, fake provider, provider job handler, local encrypted SQLite store, secure credential-vault adapter, or production database migration exists yet.
- GitHub Actions has not run. Rust/Cargo and Docker are unavailable in this WSL execution context, so native Tauri packaging and local PostgreSQL/Valkey startup are not verified.
- The health UI and infrastructure scaffold are not evidence that mail features are implemented.
- Google/Microsoft app registrations, deployment secrets, SMTP configuration, signing credentials, and hostnames remain owner-controlled provisioning before their corresponding milestones.

## Next action

Continue Milestone 1: generate and review the initial Prisma migration, implement encrypted local SQLite and credential-vault interfaces, define the provider capability contract and fake provider, then run CI across the target OS matrix. After that, start the first complete Gmail read-only vertical slice. Read `continuity.md`, `PROJECT_RULES.md`, and the relevant feature reference first; keep `sources/` unchanged.
