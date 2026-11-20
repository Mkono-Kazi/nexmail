# Nexmail architecture

**Status:** First-release architecture decisions are accepted in [DECISIONS.md](DECISIONS.md). Remaining work is owner-controlled provisioning and implementation.

## Design goals

Keep mail-provider behavior isolated from the user interface, make offline state explicit, protect account boundaries, and keep business rules testable without a live mailbox. Preserve provider choice by using adapters and open protocols where they meet security and product needs. Prefer a small application architecture until measured requirements justify additional services.

## Selected foundation

| Area | Selected direction |
| --- | --- |
| Product | Desktop-first mail client; not an email hosting service |
| Desktop | Tauri 2 with React, TypeScript, Vite, Tailwind CSS |
| Frontend state | Zustand for transient UI state; TanStack Query for API state; SQLite for persistent local mail state |
| Native layer | Narrowly scoped Rust/Tauri commands for local database, secure storage, file access, notifications, deep links, and lifecycle |
| Backend | NestJS modular monolith, with API and worker as separately runnable processes |
| Server database | PostgreSQL for users/devices, account metadata, provider cursors, normalized message metadata, durable operations, and change feeds |
| Queue | Valkey 8 + BullMQ for sync, send, webhook, retry, and maintenance jobs |
| Local database | SQLite for cached mail, drafts, local search, sync state, and pending operations |
| Providers | Gmail API first; Microsoft Graph and custom IMAP/SMTP after the first provider slice |
| Synchronization | Local-first user interaction with server-coordinated sync; providers remain authoritative for original mail and delivery |
| Deployment | Self-hostable Docker Compose stack deployed to a VPS through Coolify; no managed Nexmail SaaS in v1 |

This sets the foundation, not feature completion. No auth flow, provider adapter, sync worker, database schema, or account UX is implemented yet. See `continuity.md` for the build sequence and truthful status.

The user-data plan is metadata-first on the server. Message bodies and attachments are fetched on demand and cached locally by default. Any server-side content cache requires a separate encryption, retention, and consent decision.

## Proposed logical boundaries

1. **Presentation:** platform-adapted screens, navigation, accessibility semantics, and user input.
2. **Application workflows:** account setup, mailbox operations, compose/send, search, and settings. Owns user-visible operation states and orchestration.
3. **Domain:** account, message, thread, mailbox, draft, attachment, and sync concepts; provider-independent rules.
4. **Provider adapters:** authentication and provider-specific read/write/search operations behind stable interfaces.
5. **Local data:** encrypted credential reference, database/cache, attachment storage, drafts, and an operation queue.
6. **Platform services:** secure storage, notifications, background execution, deep links, file access, and lifecycle.

The service layer is selected. NestJS API and worker run as separately deployable processes from one modular monolith. The first release is self-hostable; each installation owns its user namespace and instance URL. A hosted multi-tenant service is outside v1.

## User freedom and portability

- A Nexmail account belongs to a self-hosted instance and is required for backend-coordinated provider sync; it is not a Nexmail-hosted mailbox identity. This tradeoff is accepted in ADR-0004.
- Keep provider-specific behavior behind adapters so adding or replacing a provider does not require rewriting mailbox UI and core workflows.
- Evaluate open email protocols alongside provider APIs. Choose based on interoperability, authentication/security support, reliability, and provider capability; disclose where a provider restricts standard access.
- Use the accepted MBOX, EML, and JSON export formats. Account removal and local export must not be confused with deleting remote mailbox data.
- Document how users can retrieve their data and what stops working if their self-hosted service is unavailable or discontinued.
- Measure product craft through usability and accessibility evaluation on target platforms, not only feature completion.

## State and synchronization

- The local store is the fast read model, not proof that the provider accepted a write.
- Track synchronization status and last successful sync per account and relevant mailbox.
- Represent user mutations as explicit operations with account, target, desired state, creation time, and retry/reconciliation status.
- Retry only operations known to be safe. Reconcile ambiguous outcomes before retrying sends or destructive actions.
- Use provider-specific stable identifiers and version/change tokens where available; isolate their semantics inside adapters.
- Treat deletion, moves, labels, and folder semantics as provider capabilities rather than assuming all providers behave alike.
- Bound local mail and attachment retention; make cleanup atomic and observable to the user where it affects available offline data.

## Platform strategy

**Selected:** desktop-first Tauri 2 + React for Windows 11 25H2+, macOS 15+, and Ubuntu 24.04 LTS+ x86-64. Keep domain and provider contracts independent enough to support later platform clients. Mobile is outside v1.

## Reliability and operations

- Use structured, privacy-safe diagnostics with correlation IDs that do not contain mailbox content or credentials.
- Separate expected offline/authentication/provider errors from internal failures and give recoverable actions.
- Make migrations versioned, transactional, and tested against representative old databases.
- Keep long-running sync outside UI rendering; cancellation and app lifecycle changes must not corrupt persisted state.
- Meet the initial performance budgets in `PRODUCT.md`; benchmark on representative hardware and report the hardware and measurement method.

## Provisioning and implementation

See [DECISIONS.md](DECISIONS.md) for accepted implementation defaults and the owner-controlled provisioning tasks. Record any new material implementation decision as an ADR before it changes product behavior or data handling.
