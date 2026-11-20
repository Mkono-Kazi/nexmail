# Nexmail context

Updated: 2026-11-20

## Project

- Goal: desktop-first mail client with provider choice, data portability, and polished UX.
- Selected stack: Tauri 2, React/TypeScript, NestJS 12 API + worker, PostgreSQL 18, Valkey 8/BullMQ 5, SQLCipher-backed SQLite, Docker/Coolify direction.
- First provider slice: Gmail; Microsoft Graph and IMAP/SMTP follow after the adapter contract is proven.
- Current state: documentation, rules, prompts, and skills only; no application code or runnable commands yet.

## Source documents

- Progress and roadmap: `../continuity.md`
- Architecture: `../ARCHITECTURE.md`
- Requirements: `../PRODUCT.md`
- Brand/design direction: `../BRAND_GUIDE.md`
- Project rules: `../PROJECT_RULES.md`
- Goal prompts: `../prompts/`
- Skills: `../skills/`

## Conventions

- Treat `sources/` as read-only.
- Mark a feature Done only with complete frontend/backend behavior and recorded verification for its scope.
- Keep provider-specific semantics inside adapters; use current official docs for provider APIs.
- Never put message content or secrets in logs, telemetry, job payloads, or ordinary credential storage.
- No install/build/test command is established until the engineering foundation is scaffolded.
