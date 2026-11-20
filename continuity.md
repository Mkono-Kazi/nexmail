# Nexmail project continuity

**Purpose:** Resume development without depending on chat history. This document records the project baseline, complete planned feature set, backend and frontend responsibilities, delivery order, and completion criteria.

**Last reviewed:** 2026-11-20  
**Project status:** Architecture selected; implementation has not started. No application source code, backend, frontend, tests, build system, or deployment setup exists in this workspace yet. All product capabilities below are **Planned**, not completed.

## 1. Read this first

1. Confirm the current repository state and read this file.
2. Read [PRODUCT.md](PRODUCT.md), [ARCHITECTURE.md](ARCHITECTURE.md), and [SECURITY.md](SECURITY.md).
3. Read the relevant feature reference: [UX.md](UX.md), [DATA_MODEL.md](DATA_MODEL.md), [EMAIL_PROTOCOLS.md](EMAIL_PROTOCOLS.md), [TESTING.md](TESTING.md), or [RELEASE.md](RELEASE.md).
4. Keep the status labels here honest. Update this document when a milestone changes; link implementation and verification evidence when work begins.
5. Do not modify synced files in `sources/`; they are read-only reference material.

## 2. Current state

### Completed

- Initial product and engineering documentation has been created and indexed in [README.md](README.md).
- Requirements, architecture boundaries, data concepts, provider behavior, security, UX, testing, roadmap, release guidance, terminology, and ADR process are documented at a high level.
- The product vision prioritizes user choice, interoperability, data portability, and a polished experience. Product, brand, platform, hosting, privacy, security, and engineering defaults are accepted in `DECISIONS.md`.
- The selected foundation is desktop-first Tauri 2 + React/TypeScript, NestJS API/worker, PostgreSQL, Valkey/BullMQ, SQLCipher-protected local SQLite, hybrid sync, Docker/Coolify deployment, and a Gmail-first vertical slice. These choices are recorded in `ARCHITECTURE.md` and `DECISIONS.md`.
- The original visual direction is defined in `BRAND_GUIDE.md`: Material-inspired design principles, with a distinct Nexmail deep-teal/ink/warm-neutral identity.
- Project development rules, goal-based prompts, focused agent skills, and `.ai/` handoff files have been created to make staged full-stack work repeatable.
- This continuity document records the full planned feature map and delivery sequence.

### Not started

- The selected foundation has not yet been created. The source workspace still has no Git repository or application code. OAuth registrations, deployment secrets, SMTP configuration, signing credentials, and actual hostnames require owner-controlled provisioning before the corresponding integration/release milestones.
- No product code, UI, database, provider integration, API, automated checks, CI, credentials, app registrations, or deployed service exists.
- No requirement is implemented or verified.

### Immediate next action

Start **Milestone 1: scaffold and vertical contracts** below, following `PROJECT_RULES.md` and the applicable skill in `skills/`. Build the selected monorepo and local services. Strategic product and architecture choices are accepted; verify provider capabilities and complete owner-controlled provisioning before connecting real accounts. Do not represent planned architecture or features as shipped behavior.

## 3. Product scope and architecture boundary

The intended product is a secure, accessible, desktop-first client that helps people choose where and how they use email. It aims to reduce dependence on dominant technology providers while delivering the polish, reliability, and ease of use people expect from a modern app. It should pair provider choice and open interoperability with control over personal data; work predictably through connectivity loss; preserve drafts and safe pending actions; and make account and delivery state clear. The accepted independence and portability commitments are documented in `DECISIONS.md`.

The product's freedom commitments are accepted in `DECISIONS.md`: self-hostable service, no Nexmail mailbox, provider choice, portable exports, and no ads or data-sale model. The selected architecture includes a backend service. Backend responsibilities include:

- The **desktop app** owns native integration, local SQLite data, local cache, durable drafts, pending operations, and offline presentation.
- The **NestJS service** owns authenticated APIs, Nexmail account/device coordination, normalized metadata, durable sync/outbox state, provider adapters, and background jobs.
- **Email providers** remain authoritative for original mailbox content and delivery status. Message bodies and attachments stay provider-first and are cached locally by default under the accepted retention policy.

The service is selected for hybrid synchronization and cross-device coordination. The Nexmail account, recovery, provider order, export formats, and self-hosted deployment model are accepted in `DECISIONS.md`. A user account belongs to a self-hosted instance; it is not a Nexmail mailbox. Core offline reading is limited to content already present in the local cache while the service is unavailable.

## 4. Complete feature inventory

All items begin as **Planned**. Mark an item **In progress** only when implementation has started and **Done** only when its acceptance criteria pass on every applicable supported platform and the evidence is recorded. Use **Deferred** for explicitly postponed scope and include the decision/ADR.

### 4.1 Account and identity

| Feature | Frontend responsibility | Backend/data responsibility | Completion evidence |
| --- | --- | --- | --- |
| Account onboarding | Provider selection or supported account entry, consent explanation, progress, and recovery UI | OAuth/delegated auth or approved protocol auth, callback validation, provider registration, secure token reference | Add-account flow works on every platform; cancellation, denial, MFA/challenge, expired auth, and retry are handled |
| Multiple accounts | Account switcher, unified/separate views as decided, visible account identity | Account-scoped storage, credentials, sync state, operations, and query isolation | Same provider IDs across accounts never cause cross-account data exposure or mutation |
| Reconnect and revoke | Clear auth-required state, reconnect action, removal flow | Refresh/re-auth, revoked-consent handling, secure token deletion, provider disconnect behavior where supported | Expired and revoked credentials recover without losing drafts or misreporting sync |
| Sender identities | Display selected sender and account in compose | Provider identities/aliases and capability mapping | Sender is explicit and correct; ambiguous identity is resolved before sending |
| Provider choice and data portability | Explain supported account types, limitations, and export controls | Standards-based adapters where practical; documented export format for data created or stored by the app | Users are not required to create a product-hosted mailbox identity; portability claims match tested export/import behavior |

### 4.2 Mailbox, messages, and threads

| Feature | Frontend responsibility | Backend/data responsibility | Completion evidence |
| --- | --- | --- | --- |
| Mailbox navigation | Inbox/folder/label navigation, account context, unread counts where supported | Discover and map provider folders, labels, special-use roles, and capabilities | Unsupported mailbox behavior is explained rather than presented as success |
| Message list | Sender, subject, date, preview, unread/star indicators, pagination, loading/empty/offline/error states | Bounded sync, stable mapping, paging, deduplication, account-scoped queries | Large mailbox scrolling/paging works without blocking the UI or losing items |
| Message detail | Participants, headers, body, attachments, safe links, thread navigation | MIME parsing/mapping, bounded resource use, secure content cache | Malformed and hostile messages render safely and remain understandable |
| Threading | Conversation view and expand/collapse behavior as designed | Provider thread IDs and documented fallback grouping | Replies and messages group predictably; provider differences are documented |
| Read/unread and star/flag | Controls, pending state, undo where feasible | Capability-aware provider mutation, queue/retry/reconciliation | UI clearly distinguishes pending from provider-confirmed state |
| Archive, move, delete, trash | Clear action labels, confirmations or undo, correct mailbox context | Provider-specific folder/label semantics and safe mutation handling | Local cache removal is not mistaken for remote deletion; failures recover clearly |
| Bulk actions | Selection, action summary, cancellation/undo where supported | Bounded batches, rate-limit handling, partial-result reporting | Partial failures identify affected items and can be retried safely |

### 4.3 Compose, drafts, sending, and attachments

| Feature | Frontend responsibility | Backend/data responsibility | Completion evidence |
| --- | --- | --- | --- |
| Compose | To/Cc/Bcc, subject, body editor, sender selection, validation, discard warning | Draft model and provider-independent message construction | Keyboard, touch, assistive technology, and platform back/navigation preserve user intent |
| Draft save | Visible save state and recovery | Durable local draft; optional provider draft sync; merge/conflict rules | Draft survives process termination, restart, offline use, and recoverable provider failure |
| Reply/reply-all/forward | Correct recipients, quoted content, thread context | Provider reply metadata and message composition | Recipient intent and threading are correct; unsupported content transformations are surfaced |
| Attachments | File picker, progress, remove/cancel, size/type feedback | Protected temp/cache files, limits, MIME building, cleanup | Interrupted, oversized, malformed, and canceled attachments do not corrupt drafts or leak files |
| Send | Sender/recipient review, progress, queued/sent/failed/unknown state | Provider submission, safe retries, idempotency or reconciliation, error mapping | A timeout is never falsely shown as failure or blindly resent; user can understand delivery certainty |
| Outbox/offline send | Queue indicator, retry/cancel where safe | Durable operation queue and reconciliation | Queued mail survives restart and sends once when safe; uncertain sends are resolved before retry |

### 4.4 Search, sync, and offline

| Feature | Frontend responsibility | Backend/data responsibility | Completion evidence |
| --- | --- | --- | --- |
| Search | Query entry, scope/account filters, results, empty/error states | Provider search and/or account-scoped local index, query limits | Results identify account/scope and match provider behavior documented for that account |
| Initial sync | Progress, usable partial content, error/retry states | Bounded recent-window sync, paging, checkpointing, deduplication | User can begin using the app before an unbounded full mailbox download completes |
| Incremental sync | Last-updated time and refresh affordance | Provider change cursors, notifications as hints, cursor expiry/full-resync strategy | Repeated sync converges without duplicate messages or lost mutations |
| Offline reading | Stale/offline indicator and cached content | Bounded cache, attachment policy, cache eviction and retention | Cached content is available per user settings and clearly marked potentially stale |
| Offline actions | Show queued action and allow safe correction/cancel where possible | Durable mutation queue, dependency order, retry classification, conflict resolution | Restart/network transitions preserve action intent and avoid duplicate destructive effects |
| Sync controls | Per-account refresh and cache-retention setting (up to the accepted 90-day default) | Scheduling within OS constraints, throttling/backoff, cancellation and resume | App remains responsive and cache settings take effect without data corruption |

### 4.5 Notifications, preferences, and platform integration

| Feature | Frontend responsibility | Backend/data responsibility | Completion evidence |
| --- | --- | --- | --- |
| Notifications | Opt-in permission explanation, per-account settings, lock-screen privacy, route on open | Native OS notifications from synchronized mailbox changes; no separate push service in v1 | Notifications are off until enabled, hide sender/subject on lock screen by default, and open the correct account/message |
| Preferences | Account, display, privacy, sync, notification, and accessibility settings within scope | Persist and migrate settings; enforce settings in sync/notification flows | Choices survive restart and their effects are observable |
| Deep links | Validate navigation target and show safe fallback | Validate auth callback and app/service routing | Untrusted links cannot open arbitrary account actions or bypass auth state checks |
| Files and sharing | Native open/save dialogs for attachments | Secure file staging, cleanup, MIME and size handling | OS integration works on each supported platform and has safe cancellation/error behavior; share-sheet integration is deferred |
| Platform lifecycle | Native back, keyboard, touch, safe-area, app lifecycle adaptation | Secure storage, background task, notification, and database adapters | Core workflows pass on each supported OS/version and actual representative devices |

### 4.6 Security, privacy, accessibility, localization, and operations

- **Security:** least-privilege auth, secure credential storage, encrypted local data per selected threat model, sanitized HTML, blocked remote content by default, safe links and attachments, account isolation, redacted logs, dependency/security review, signed releases.
- **Privacy:** data inventory, content-free default telemetry, retention/deletion rules, backup behavior, notification preview privacy, clear consent, user-facing privacy disclosures, incident contact.
- **Accessibility:** screen reader names/roles/state, keyboard-only operation, visible focus, text scaling, high contrast, reduced motion, reflow/zoom, non-color status, accessible send/sync announcements.
- **Localization:** externalized UI text, locale-aware formatting, pluralization, text expansion, Unicode addresses/content, bidirectional and RTL layouts.
- **Reliability:** bounded resource use, resilient migrations, disk-full handling, cancellation, retry/backoff, precise offline/auth/provider/local-storage error states, privacy-safe diagnostics.
- **Quality/support:** CI, automated and manual verification, crash/support workflow, known-issue tracking, staged rollout where available, rollback/disable plan, security incident readiness.

These cross-cutting requirements are mandatory for every feature; see [SECURITY.md](SECURITY.md), [UX.md](UX.md), [TESTING.md](TESTING.md), and [RELEASE.md](RELEASE.md).

### 4.7 Explicitly out of initial scope unless newly approved

Calendar and contacts management, shared/team inboxes, mail hosting, server-side AI processing, advanced rules, bulk account migration, organization administration, and full PGP/S/MIME workflows. Each needs product requirements, provider/platform capability review, security/privacy analysis, and a recorded scope decision before implementation.

## 5. End-to-end development roadmap

Milestones are dependency ordered. Frontend and backend tasks can proceed in parallel after their contracts and shared decisions are stable. No calendar estimates are assigned until team size, target platforms, provider access, and delivery constraints are known.

### Milestone 0 — Provisioning and workspace setup

**Status:** Product and architecture decisions are accepted in `DECISIONS.md`. Create the Git-backed application home, prepare the development environment, configure ignored local secrets, request provider test access, and sketch the approved three-pane flow.

**Frontend setup:** target Windows 11 25H2+, macOS 15+, and Ubuntu 24.04 LTS+ x86-64. Prototype navigation, account setup, inbox, reader, and compose; capture accessibility and interaction constraints.

**Backend setup:** prepare local PostgreSQL/Valkey services, instance URL and SMTP configuration plan, Google OAuth test project, and threat/data-flow checklist. Record external provisioning status without adding secret values to documentation.

**Exit:** a Git-backed repository and local toolchain are ready; development can start. Google OAuth test access is required only before the Gmail provider milestone, and production Google verification/security assessment is required before public release.

### Milestone 1 — Engineering foundation

**Frontend:** app shell, navigation skeleton, theme/layout baseline, localization setup, accessibility primitives, error/loading/empty patterns, fake account and fake mailbox screens.

**Backend:** repository/service scaffold as selected, provider interface and capability model, local schema/repository contracts, secure-storage abstraction, fake provider, operation/sync state machines, structured redacted logging.

**Shared:** CI build/lint/type/static checks; dependency and secret-handling policy; API/interface contracts; synthetic mailbox fixtures; initial threat model and privacy data inventory.

**Exit:** selected platforms build; fake data flows from adapter/repository to UI; account IDs scope every data query; baseline accessibility and test pipeline work; no production credentials are required.

### Milestone 2 — Account setup and read-only mailbox slice

**Frontend:** add account, authorization progress/error/retry, mailbox navigation, message list, message detail, thread view, sync status, offline and empty states.

**Backend:** first-provider auth, validated callback, secure token references, mailbox discovery, bounded initial sync, pagination, message/thread mapping, safe content parser/sanitizer, account-scoped local persistence, basic incremental sync.

**Exit:** a test account can authorize and read a mailbox end to end on every target platform; account removal clears local data per policy; malicious/malformed messages do not execute content; sync is resumable and deduplicated.

### Milestone 3 — Read workflows and organization

**Frontend:** mark read/unread, star/flag, archive/move/delete supported actions, optimistic/pending indicators, undo/confirmation, action failure recovery.

**Backend:** provider capability mapping, mutation queue, safe retry classification, reconciliation, idempotency where available, conflict/partial-batch reporting.

**Exit:** each supported operation has provider-specific semantics documented; failures and offline transitions converge to provider state; destructive actions are explicit and never confused with local cache eviction.

### Milestone 4 — Compose, drafts, attachments, and send

**Frontend:** composer, To/Cc/Bcc, sender selection, reply/reply-all/forward, draft status, attachment UI, send state, unsaved-change handling.

**Backend:** durable drafts, optional provider draft sync, MIME construction, protected attachment staging/limits/cleanup, provider send, delivery-state reconciliation, outbox queue.

**Exit:** drafts survive restart/offline conditions; account/sender and recipient intent are correct; ambiguous send outcomes are not duplicated; attachments are safely bounded and recoverable.

### Milestone 5 — Search, preferences, notifications, and robust offline behavior

**Frontend:** search and scope, filters, account preferences, app preferences, notification settings, privacy and cache controls, documented data export, queued actions and last-updated display.

**Backend:** provider/local search implementation, indexes and migrations, account-scoped data export, retention/eviction, background scheduling, native notification integration from synchronized changes, backoff/rate limits, cursor expiry recovery.

**Exit:** cross-account search isolation passes; offline read and safe queued actions work after restart; preference changes are enforced; export scope and format are documented and verified; notification delivery and privacy match platform limits and user choices.

### Milestone 6 — Feature completeness and platform parity

**Frontend:** close every planned MVP row in §4; responsive/adaptive layouts; keyboard/touch/system navigation; screen reader, scaling, contrast, reduced motion, localization, RTL, and platform file/deep-link behavior.

**Backend:** close provider capability gaps for launch scope; harden migrations, storage limits, account removal, sync concurrency, retry behavior, diagnostics redaction, and recovery paths.

**Exit:** every in-scope feature is Done or has an accepted, user-visible Deferred decision; parity matrix covers each supported platform; functional requirements PR-01 through PR-11 map to implementation and verification evidence.

### Milestone 7 — Beta, security, performance, and operational hardening

**Frontend:** usability and accessibility evaluation, worst-case mail content handling, platform lifecycle testing, clear error copy, user support diagnostics consent.

**Backend:** provider sandbox/limited beta, rate-limit/load/resource testing, secure configuration and secrets, data migration/backup validation, observability with content-free diagnostics, incident/rollback practice.

**Exit:** test matrix in [TESTING.md](TESTING.md) passes; high/critical security issues are closed or have approved time-bounded exceptions; data inventory/legal disclosures/support and incident processes are ready; no known release-blocking data-loss or duplicate-send bugs remain.

### Milestone 8 — Production release and complete app handoff

**Frontend/release:** production builds for every supported platform, signing, store/package listings, onboarding/help/privacy copy, accessibility statement as applicable, version/update path, release notes.

**Backend/operations:** production provider registrations and service deployment if needed, database migrations, monitoring/alerting, backups and restore drills if server data exists, credential rotation, rate/cost controls, rollback and disable switches.

**Exit:** all release gates in [RELEASE.md](RELEASE.md) pass; production account lifecycle and mail workflows are verified with controlled test accounts; support/security contact and incident response work; staged rollout and rollback have an owner; documentation reflects the shipped system.

## 6. Definition of a complete, fully functional app

The app is complete for its **approved launch scope** when all conditions below are evidenced, not merely planned:

1. The supported platform/OS matrix, provider list, open-protocol strategy, architecture, and service boundary are accepted and documented; user freedom and portability claims are backed by tested behavior.
2. Every in-scope item in §4 has status **Done**, or an explicit accepted **Deferred** status with user-facing limitation where needed.
3. A new user can add an account, use the mailbox, read and organize messages, compose and save drafts, send and verify outcomes, search, work offline within policy, recover from auth/network/provider errors, configure preferences, and remove the account.
4. Frontend flows and backend/provider operations agree on loading, pending, confirmed, failed, and uncertain states.
5. Account isolation, secure credential handling, safe message rendering, attachment handling, data retention/deletion, and diagnostic redaction pass the security gates.
6. Automated and manual checks cover core workflows on each supported platform, including accessibility, localization-ready behavior, migration, offline/restart, duplicate IDs, large/malformed content, and ambiguous send outcomes.
7. Production build, signing, update/deployment, rollback, support, incident response, and privacy disclosures are ready.
8. [README.md](README.md) and the reference docs describe actual shipped behavior and known limitations; this file records milestone state and next action.

## 7. Progress tracking format

For each feature or milestone, record:

```text
Status: Planned | In progress | Blocked | Done | Deferred
Owner:
Requirements:
Implementation: frontend path(s) / backend path(s)
Verification: commands or manual scenarios and results
Platform/provider coverage:
Unresolved risks or feature-level decisions, if any:
Next concrete action:
```

Only mark **Blocked** when a concrete external dependency prevents progress. Mark **Done** only after verification evidence exists. Keep long execution notes in the relevant issue/ADR; keep this file as the resumable high-level status and roadmap.

## 8. Related documentation

- Product and acceptance requirements: [PRODUCT.md](PRODUCT.md)
- UX and platform behavior: [UX.md](UX.md)
- Architecture and offline state: [ARCHITECTURE.md](ARCHITECTURE.md)
- Persistence and entities: [DATA_MODEL.md](DATA_MODEL.md)
- Auth, provider adapters, sync, sending, and parsing: [EMAIL_PROTOCOLS.md](EMAIL_PROTOCOLS.md)
- Threat model and security gates: [SECURITY.md](SECURITY.md)
- Verification strategy: [TESTING.md](TESTING.md)
- Milestone overview: [ROADMAP.md](ROADMAP.md)
- Technical decision log: [DECISIONS.md](DECISIONS.md)
- Release operations: [RELEASE.md](RELEASE.md)
