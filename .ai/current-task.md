# Current task

Status: in progress
Goal: Build the first runnable Nexmail foundation in the WSL checkout: monorepo workspace, desktop shell, API/worker, shared contracts, database/queue development services, and CI baseline.

## Checklist

- [x] Record the selected architecture and Gmail-first direction.
- [x] Write project-wide completion and engineering rules.
- [x] Create reusable project, feature, provider, milestone, and completion-audit goal prompts.
- [x] Create focused workflows for feature development, provider integration, and hybrid sync.
- [x] Resolve OS targets, auth, provider scope, data handling, self-hosting, license, telemetry, release scope, verification, audience, performance, accessibility, localization, economics, and brand direction.
- [x] Create and push the documentation repository to Mkono-Kazi/nexmail.
- [x] Move the Git checkout to `/home/pexter/projects/nexmail` in WSL.
- [x] Scaffold the pnpm/Turborepo workspace and configure shared TypeScript/package boundaries.
- [x] Add the Tauri/React desktop shell and brand-aligned baseline.
- [x] Add NestJS API health endpoint and separate BullMQ worker process with shared response contracts.
- [x] Add PostgreSQL/Valkey local service definitions and initial Prisma schema.
- [x] Add baseline CI workflow and verify dependency installation, formatting, lint, typecheck, and workspace builds locally.
- [ ] Add reviewed Prisma migration, encrypted SQLite storage, secure credential-vault adapter, provider interface, fake provider, and CI platform builds.

## Next

Continue Milestone 1 with a reviewed initial Prisma migration, encrypted SQLite storage, secure credential-vault adapter, provider interface, fake provider, and CI platform builds. Local formatting, lint, typecheck, and workspace builds pass. pnpm 12.21.0 is active. Rust/Cargo and Docker are unavailable in this WSL execution context, so native Tauri and container startup cannot be checked here yet.
