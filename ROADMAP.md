# Development roadmap

**Status:** Sequence and exit criteria; dates are intentionally unset until team and platform scope are known.

## Phase 0 — Provisioning and workspace setup

**Decisions:** accepted in `DECISIONS.md`; do not reopen them during routine implementation. **Work:** create the GitHub repository, choose the initial development OS, install the pinned toolchain, configure local secrets through ignored environment files, create Google/Microsoft app registrations before their provider milestones, and set up self-host deployment access. Build a small three-pane interaction prototype while foundation code begins.

**Exit:** source code has a Git-backed home; the development machine can run the selected stack; no production secrets are in the repository; Gmail sandbox/test-user access is available before the Gmail slice.

## Phase 1 — Foundation

**Work:** pnpm/Turborepo workspace, CI, Tauri desktop shell, NestJS API/worker, PostgreSQL/Valkey Compose services, Prisma schema/migrations, SQLCipher SQLite adapter, secure credential-vault adapter, shared contracts, API health checks, and fake provider. Establish WCAG 2.2 AA component patterns, English string catalog/localization foundations, and performance measurement fixtures.

**Exit:** Windows, macOS, and Ubuntu target builds work in CI; desktop shell reaches API; API/worker connect to PostgreSQL and Valkey; migrations and local encrypted database initialize; fake-provider contracts work; CI build/type/lint checks pass.

## Phase 2 — One-provider vertical slice

**Work:** account authorization, bounded mailbox sync, message list/detail, safe HTML presentation, read/unread and archive/move as supported, offline cache, and clear errors.

**Exit:** users can complete read-and-organize workflows on all target platforms; account isolation, malicious content, and offline behavior meet security and product criteria.

## Phase 3 — Compose and search

**Work:** durable drafts, recipients, reply/forward, attachment handling, send reconciliation, provider search or scoped local search, and opt-in native OS notifications.

**Exit:** no draft loss in recovery scenarios; send state is accurate under interruption; search scope is understandable; accessibility and provider limitations are documented.

## Phase 4 — Private beta and hardening

**Work:** real provider sandbox/beta use, performance/resource measurement, migration and large-mailbox work, platform-specific lifecycle checks, security review, support/diagnostics, and feedback triage.

**Exit:** release gates pass; known issues and data limitations are disclosed; rollback and incident procedures are rehearsed.

## Phase 5 — General release and expansion

**Work:** signed distribution, staged rollout, support, observability with privacy-safe metrics, update/recovery process, and provider/platform expansion based on evidence.

**Exit:** release criteria in `RELEASE.md` pass for each platform. New providers or platforms receive their own capability and compliance review before being advertised.

## Prioritization rule

Prioritize data integrity, authentication reliability, safe message rendering, accessibility, and core mail workflows ahead of cosmetic breadth. Add scope only when each new provider/platform has an owner, test coverage, support plan, and security review.
