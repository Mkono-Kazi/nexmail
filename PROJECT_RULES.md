# Nexmail project rules

These rules apply to all Nexmail planning and implementation work. Read [continuity.md](continuity.md) for current state, [ARCHITECTURE.md](ARCHITECTURE.md) for selected technical direction, and the feature-specific reference before changing behavior.

## Product goal

Build Nexmail into a complete desktop-first email client that gives people provider choice, interoperable access, practical data portability, and a polished, dependable daily experience. Complete each in-scope feature across the UI and the backend/data path before calling it done.

## Source of truth

- [PRODUCT.md](PRODUCT.md) owns product requirements and scope.
- [BRAND_GUIDE.md](BRAND_GUIDE.md) owns brand identity, visual direction, and interface design tokens.
- [ARCHITECTURE.md](ARCHITECTURE.md) owns selected architecture and system boundaries.
- [DECISIONS.md](DECISIONS.md) owns accepted decisions and any explicitly proposed changes.
- [continuity.md](continuity.md) owns the full feature inventory, project state, and completion roadmap.
- `skills/` owns repeatable agent workflows; `prompts/` owns copy-ready goal prompts.
- Read the applicable feature reference; update it when implementation changes its behavior.
- Treat each file under `sources/` as read-only reference material. Never edit, rename, move, or delete it.
- Do not mark a planned feature, provider, or platform as implemented without code and verification evidence.

## Selected architecture

Use desktop-first Tauri 2 + React + TypeScript; NestJS 12 modular monolith with separately runnable API and worker; PostgreSQL 18; Valkey 8 + BullMQ; SQLCipher-backed SQLite local persistence; hybrid local-first interaction with server-coordinated synchronization; self-hostable Docker deployment targeting Coolify. Support Windows 11 25H2+, macOS 15+, and Ubuntu 24.04 LTS+ x86-64. Build the first complete provider slice with Gmail before Microsoft Graph and IMAP/SMTP. The accepted defaults are in `DECISIONS.md`; distinguish them from owner-controlled provisioning.

## Feature completion rule

For each requested feature, define a measurable goal and acceptance checklist before implementation. Trace it through all applicable layers:

1. User workflow, visual states, keyboard/touch use, accessibility, localization, and consistency with `BRAND_GUIDE.md`.
2. API contracts, authorization, validation, business rules, provider capabilities, and meaningful errors.
3. Database schema/migration, account ownership, local persistence, sync queue, conflict/retry rules, and recovery.
4. Security/privacy consequences, data retention, logs, and user disclosures.
5. Automated/manual verification and documentation updates.

Treat a feature as incomplete while a required layer is missing. If a requirement is intentionally deferred, record the reason and user-visible limitation; do not silently substitute a mock, stub, or disabled control for working behavior.

## Engineering guardrails

- Keep provider-specific behavior inside provider adapters and expose capabilities explicitly.
- Provider mail is authoritative for original messages and delivery. SQLite is the device's offline read model; PostgreSQL coordinates shared metadata and sync state.
- Make local drafts durable before reporting them saved. Distinguish queued, sending, sent, failed, and delivery-unknown states.
- Use idempotent operations and reconcile ambiguous sends before retrying. Never put message bodies, OAuth credentials, or secrets into Valkey job payloads or logs.
- Keep message bodies and attachments provider-first and local-cache-first. Server-side content storage requires a separate accepted security/privacy decision.
- Enforce user/account/device ownership on every API and database access path. Apply input validation and least-privilege Tauri capabilities.
- Render email as hostile input. Sanitize HTML, block remote resources by default, and isolate rendering from privileged native commands.
- Prefer small, reviewable steps that leave the app buildable. Keep API contracts and migrations backward-aware.
- For volatile provider or framework behavior, consult current primary documentation before implementation and record material constraints.
- Never invent completed work, test results, provider support, or production readiness.

## Goal-driven work

Start from [the feature goal prompt](prompts/FEATURE_GOAL.md). Use the provider, milestone, or completion-audit goal when appropriate. The goal statement must name the outcome and observable completion conditions. Keep scope limited to the user request and required dependencies; record unresolved decisions rather than guessing when they materially affect privacy, data loss, security, or architecture.

## Status reporting

Use `Planned`, `In progress`, `Blocked`, `Done`, or `Deferred` consistently. A `Done` status includes links to implementation and records the checks/scenarios that passed, supported platforms/providers, and known limitations. Update `.ai/current-task.md`, `.ai/handoff.md`, and `continuity.md` at meaningful milestones and before handing off.
