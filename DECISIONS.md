# Nexmail architecture decisions

All strategic product and engineering choices for the first desktop release are recorded below. **Accepted** means this is the project default; changing it requires an ADR that supersedes the decision. Account registration, OAuth applications, signing certificates, domains, and deployment secrets are setup tasks, not undecided architecture.

## Decision index

| ID | Decision | Status |
| --- | --- | --- |
| ADR-0001 | Desktop operating systems | Accepted |
| ADR-0002 | Application stack and toolchain | Accepted |
| ADR-0003 | Provider sequence and account access | Accepted |
| ADR-0004 | Backend, hosting, and Nexmail identity | Accepted |
| ADR-0005 | Data ownership, storage, and retention | Accepted |
| ADR-0006 | Authentication and sessions | Accepted |
| ADR-0007 | Provider credentials and local secrets | Accepted |
| ADR-0008 | Hybrid synchronization and queues | Accepted |
| ADR-0009 | Search | Accepted |
| ADR-0010 | API and change delivery | Accepted |
| ADR-0011 | Export and portability | Accepted |
| ADR-0012 | Product source license | Accepted |
| ADR-0013 | Telemetry and diagnostics | Accepted |
| ADR-0014 | First-release feature boundary and UX | Accepted |
| ADR-0015 | Verification and CI | Accepted |
| ADR-0016 | Deployment and backups | Accepted |
| ADR-0017 | Audience, account limits, accessibility, language, and economics | Accepted |
| ADR-0018 | Nexmail brand and design direction | Accepted |
| ADR-0019 | Notifications and operating-system file integration | Accepted |

## Accepted decisions

### ADR-0001 — Desktop operating systems

**Decision:** First release targets Windows 11 25H2 or newer, macOS 15 Sequoia or newer, and Ubuntu 24.04 LTS or newer on x86-64. The release matrix is limited to these three desktop families; other Linux distributions and mobile platforms are unsupported in the first release. Follow vendor security support and move the minimum forward when a baseline leaves support.

**Rationale:** The client is desktop-first. These baselines keep the supported matrix small while covering Windows, Mac, and a long-supported Linux distribution. Tauri's own technical minimums are broader; Nexmail intentionally chooses a newer supported-OS policy.

### ADR-0002 — Application stack and toolchain

**Decision:** Use a pnpm workspace with Turborepo; Node.js 22 LTS (minimum 22.22.3 for the Nest CLI); TypeScript strict mode; Tauri 2 + React 19 + Vite for desktop; NestJS 12 ESM for the modular monolith API and worker; Prisma ORM 7 with the PostgreSQL driver adapter; PostgreSQL 18; Valkey 8 as the Redis-compatible queue store; BullMQ 5; and SQLite with SQLCipher for device storage. Pin exact package versions in the lockfile and update security patches routinely.

Frontend roles: Tailwind CSS + shadcn/ui/Radix for accessible primitives; Zustand for ephemeral UI state; TanStack Query for API state; SQLite as the durable local data source; React Router for navigation; Zod for runtime contracts; TipTap for rich-text composition. Keep provider and sync logic out of UI components.

**Rationale:** This follows the submitted architecture while choosing Valkey, a vendor-neutral open-source Redis-compatible server, to keep the queue infrastructure consistent with Nexmail's source-freedom goal. BullMQ documents support for compatible Valkey servers. See [BullMQ connection compatibility](https://docs.bullmq.io/guide/connections) and [Valkey's Redis migration guide](https://valkey.io/topics/migration/).

### ADR-0003 — Provider sequence and account access

**Decision:** Implement Gmail first as the end-to-end adapter. Support personal Gmail and user-delegated Google Workspace mailboxes. Add Microsoft Graph delegated access second for personal and work/school accounts, then custom IMAP/SMTP third. Never request tenant-wide Microsoft application permissions. For IMAP/SMTP, use OAuth2 where the provider offers it; allow an explicitly entered app-specific password only where necessary and store it encrypted.

For Gmail, request `gmail.modify` plus the minimum identity scopes required by the selected login flow. Do not request `mail.google.com` because Nexmail does not need immediate permanent deletion; delete to Trash instead. Treat the Gmail restricted-scope verification and applicable security-assessment work as a release dependency. Google classifies `gmail.modify` as restricted and requires verification; server handling/transmission can trigger an independent security assessment. See [Gmail API scopes](https://developers.google.com/workspace/gmail/api/auth/scopes) and [restricted-scope verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification).

For Microsoft Graph, use delegated `Mail.ReadWrite` and `Mail.Send`, plus only identity/offline scopes actually needed. Do not use application permissions. See [Microsoft Graph permissions](https://learn.microsoft.com/graph/permissions-reference).

### ADR-0004 — Backend, hosting, and Nexmail identity

**Decision:** Use a NestJS modular monolith with separately runnable API and worker processes. The first release is self-hostable from Docker Compose and deployable to a VPS through Coolify. Do not launch an official multi-tenant hosted service in the first release. Each installation has its own Nexmail user namespace and instance URL. A Nexmail account is required to connect a provider and use server-coordinated sync; offline access to already cached content continues without the server. Nexmail is not an email hosting provider.

**Rationale:** Self-hosting and a portable server implementation limit dependence on a single Nexmail operator. The desktop shell and product UX remain polished regardless of who operates the sync service. Reconsider a managed service only after OAuth verification, security assessment, privacy operations, and funding/ownership are established.

### ADR-0005 — Data ownership, storage, and retention

**Decision:** Providers remain authoritative for original messages and delivery. PostgreSQL stores user/device/account records, provider identifiers and cursors, normalized message headers needed for cross-device lists/search, folder/label metadata, operation state, and sync events. It does not store message bodies or attachment contents. Fetch bodies on demand and cache them only in the device's SQLCipher-encrypted SQLite database. Stream attachments through the backend only when provider-token protection requires it; never persist them in object storage in v1. Delete server metadata and encrypted provider credentials when an account is disconnected; provide a user-visible confirmation. Cache retention defaults to the most recent 90 days, with older messages fetched on demand and a user setting to reduce the window.

PostgreSQL tenant-owned rows carry a `user_id`; account-owned rows also carry `account_id`. Enforce ownership in every application query and use PostgreSQL row-level security as a second boundary, with a non-owner application role and transaction-local user context. Use UUIDv4 IDs, timezone-aware timestamps, foreign keys, explicit uniqueness for provider IDs scoped by account, and indexes for foreign keys and list/sync access paths.

### ADR-0006 — Authentication and sessions

**Decision:** Nexmail identity uses email address + password; hash passwords with Argon2id. Require verified email for account activation. Each self-hosted instance sends verification and recovery links through administrator-configured SMTP; do not bind Nexmail sign-in to Google, Microsoft, or another social identity provider. Issue 15-minute access JWTs and rotating, device-scoped opaque refresh tokens with a 30-day absolute lifetime. Store only refresh-token hashes server-side, detect reuse, and allow per-device revocation. Require a one-time recovery code at account setup in addition to verified-email recovery. TOTP MFA is required before general availability and optional before private beta.

### ADR-0007 — Provider credentials and local secrets

**Decision:** Run provider OAuth Authorization Code with PKCE in the system browser and return through an exact allowlisted backend callback. The backend exchanges codes and stores provider access/refresh tokens using AES-256-GCM envelope encryption with key IDs; master keys come only from deployment secrets and support rotation. Never send provider tokens to the React webview or store them in Valkey job payloads, logs, analytics, or ordinary database fields. The desktop stores its Nexmail refresh token and SQLCipher key in the OS credential vault (Windows Credential Manager, macOS Keychain, Linux Secret Service). If no supported secure vault is available, block adding accounts rather than falling back to plaintext storage.

### ADR-0008 — Hybrid synchronization and queues

**Decision:** Use provider-specific webhooks/change cursors when available, with scheduled polling fallback no more frequently than every five minutes under normal operation and exponential backoff on rate limits/errors. BullMQ queues are `account-sync`, `message-send`, `webhooks`, `attachments`, `scheduled`, `reconciliation`, and `maintenance`. Use separate API and worker processes from the same codebase. Every mutation has an idempotency key and durable database record; BullMQ is a delivery mechanism, not the source of truth. WebSocket messages are wake-up hints; devices recover through a durable cursor-based REST change feed. Never mark queued mail as sent. Reconcile ambiguous provider send outcomes before retry.

### ADR-0009 — Search

**Decision:** Use PostgreSQL full-text search for server-held headers/metadata and SQLite FTS5 for the local cache, including locally cached body text. Do not upload bodies for search and do not deploy a separate search service in v1. Search always scopes to the signed-in Nexmail user and selected provider accounts.

### ADR-0010 — API and change delivery

**Decision:** Version REST endpoints under `/api/v1`; publish an OpenAPI contract; use shared Zod schemas for runtime validation and generated/shared TypeScript types. Use WebSockets only for event hints/progress, never as the durable source of changes. Batch device operations and acknowledge each operation independently.

### ADR-0011 — Export and portability

**Decision:** Provide account-scoped user export in MBOX for mailbox archives and EML for individual original messages, plus JSON for Nexmail settings and metadata. Export uses a native save dialog, is generated on demand, and is protected during temporary creation. Do not claim full cross-provider migration in v1; import and migration are deferred until round-trip behavior and provider limits are verified. Account disconnection deletes Nexmail's copy but never deletes remote mail without an explicit provider action.

### ADR-0012 — Product source license

**Decision:** License application code (desktop, API, worker, and packages) under AGPL-3.0-only; license documentation under CC-BY-4.0. Accept contributions under the same terms with DCO sign-off; do not require a CLA. Publish build/deployment instructions so users can self-host. Use only dependencies and assets compatible with these licenses and maintain a third-party notices inventory.

### ADR-0013 — Telemetry and diagnostics

**Decision:** No third-party analytics or automatic crash upload in v1. Desktop diagnostics stay local unless a user explicitly creates and shares a redacted report. Server logs are structured and redact message content, addresses, subjects, tokens, OAuth codes, and attachment paths. Self-host operators control retention. Reconsider opt-in crash reporting only after a privacy review.

### ADR-0014 — First-release feature boundary and UX

**Decision:** First release is desktop-only and includes onboarding, account/device lifecycle, unified and per-account mailboxes, message/thread reading, safe HTML rendering, organization actions, drafts/composition/send, attachments, search, offline cache/queued safe operations, preferences, privacy-aware OS notifications, and MBOX/EML/JSON export. Use an adaptive three-pane desktop layout with keyboard navigation, compact/comfortable density, system/light/dark theme, and accessible Radix primitives. Calendar, contacts, rules/filters, snooze/scheduled send, AI, mobile clients, OS share-sheet integration, and official hosted SaaS are post-v1 scope.

### ADR-0015 — Verification and CI

**Decision:** Use Vitest for frontend/unit tests, Jest + Supertest for Nest/API tests, PostgreSQL/Valkey integration tests with disposable containers, and Playwright for web/API workflow tests. Use Tauri WebDriver automation for native shell/deep-link and OS integration checks. GitHub Actions runs format/lint, typecheck, build, and test jobs on Windows, macOS, and Ubuntu target runners. Every feature includes tests for core success and key failure/offline boundaries.

### ADR-0016 — Deployment and backups

**Decision:** Provide one Docker Compose deployment with API, worker, PostgreSQL 18, Valkey 8, and reverse proxy handled by Coolify. Keep development local services in Compose. Run migrations as a controlled release step. Default server backups are daily, encrypted before leaving the host, with 30-day retention; document and test restore. Store deployment keys outside the repository and rotate token-encryption keys with versioned ciphertext.

### ADR-0017 — Audience, account limits, accessibility, language, and economics

**Decision:** The first release serves privacy-conscious individuals and professionals managing their own mail, not enterprise shared inboxes or centrally administered organizations. Support up to 10 connected mail accounts per Nexmail user. Ship English first, with localization-ready strings, formats, plural rules, and layout; add translations after community-maintained localization is reviewable. Meet WCAG 2.2 AA for core workflows and use platform accessibility APIs. Release the client and self-hosted service under AGPL-3.0-only, without ads, tracking-based monetization, or sale of personal data. The first release is free to self-host; a hosted subscription may be considered after v1 only if it preserves portability and the same privacy commitments. Initial performance budgets on representative supported hardware are: cold launch to usable inbox under 3 seconds with a warm local account; cached inbox render under 1 second; local search under 500 ms; local state feedback under 100 ms; and ordinary navigation under 200 ms. Record hardware and measurement methods before treating these budgets as release gates.

**Rationale:** These limits focus the first release on individual ownership and bound account-management complexity. Accessibility is a release requirement, not a later enhancement. English-first localization avoids blocking the initial build while keeping translation possible. Free, self-hosted software aligns with the project's independence goal; any hosted offering remains a later decision. Performance targets establish a measurable craft bar and must be validated on named hardware.

### ADR-0018 — Nexmail brand and design direction

**Decision:** Use Material Design 3 as a design reference for clear hierarchy, adaptive layouts, accessible components, predictable interaction states, and purposeful motion. Create an original Nexmail expression rather than copying Google's product screens, logos, iconography, typography treatment, or brand assets. Use the distinct deep-teal, ink, and warm-neutral palette in `BRAND_GUIDE.md`; do not use Google's four-color identity or wallpaper-derived dynamic color. Keep the three-pane desktop mail layout, user-controlled density, and light/dark/system themes. `BRAND_GUIDE.md` is the source of truth for visual tokens and design language.

**Rationale:** Familiar interaction patterns reduce learning cost, while original colors and identity make Nexmail recognizable and avoid implying affiliation with Google. Material 3 supports adaptable theming and a role-based system; Nexmail adopts the useful design principles and establishes its own tokens. See [Material Design 3](https://m3.material.io/) and [Material 3 theming guidance](https://developer.android.com/codelabs/m3-design-theming).

### ADR-0019 — Notifications and operating-system file integration

**Decision:** Use native Windows, macOS, and Linux desktop notifications generated by the client from synchronized mailbox changes; do not build a separate push-notification service in v1. Notifications are off until the user opts in, are configurable per account, and show a generic message alert with sender and subject hidden on the lock screen by default. Do not include message bodies or attachment details. Deep links route only to the relevant account/message after app authentication. For attachments, use native open/save dialogs and safe file staging; do not add OS share-sheet integration in v1.

**Rationale:** This uses the already selected desktop sync feed and avoids another service, third-party delivery dependency, or a privacy surprise. Native dialogs give users explicit control over files without making platform sharing part of the release-critical mail workflow.

## External provisioning tasks

These tasks need owner-controlled accounts or credentials and do not reopen the architecture choices:

- Register Google OAuth credentials and submit Gmail scopes for required verification/security assessment before public release.
- Register the Microsoft application for delegated Graph permissions before that provider's integration is released.
- Configure the instance's email sender, canonical instance URL, TLS, database/Valkey secrets, token-encryption key, backup destination, and email recovery settings.
- Create the GitHub repository and organization, configure Actions, and obtain platform signing credentials for release builds.

## Superseding decisions

For a material change, copy [the ADR template](docs/adr/0000-template.md), record the alternatives and security/privacy consequences, mark the prior decision superseded, and update the owning documents in the same change.
