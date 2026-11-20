---
name: nexmail-provider-integration
description: Build or change a Nexmail mail-provider adapter, OAuth connection, mailbox synchronization, or provider capability mapping. Use for Gmail, Microsoft Graph, or IMAP/SMTP work; general feature work belongs to nexmail-feature-development.
---

# Nexmail provider integration

Before implementation, read `EMAIL_PROTOCOLS.md`, `SECURITY.md`, `ARCHITECTURE.md`, `PROJECT_RULES.md`, and the provider goal in `prompts/PROVIDER_GOAL.md`. Consult current official provider documentation for volatile API, OAuth, scope, rate-limit, webhook, and verification requirements.

## Provider boundaries

- Keep provider IDs, cursors, response types, and error semantics inside that adapter. Expose shared normalized types and explicit capabilities.
- Treat IDs as scoped by provider/account/resource. For IMAP, account for per-folder UID validity and UID state.
- Keep provider mail authoritative for original messages and delivery status. PostgreSQL coordinates metadata and sync; SQLite serves the device's durable offline state.
- Request the smallest viable scope and keep credentials in an encrypted backend credential store or OS secure storage according to the accepted architecture. Never place tokens in UI state, logs, Valkey payloads, or ordinary local tables.
- Model provider-specific folder, labels, threading, search, drafts, and mutation differences. Unsupported behavior must be reported rather than simulated.

## Required integration work

- Validate OAuth state and PKCE where supported; handle cancellation, denied consent, callback replay, expiry, revocation, MFA/provider challenges, and reconnect.
- Implement bounded initial sync and provider-specific incremental cursors, pagination, deduplication, throttling, cancellation, cursor-expiry recovery, and safe resync.
- Treat webhook/push signals as hints; preserve a durable change feed and polling/IDLE fallback as appropriate.
- Normalize malformed/untrusted mail defensively; sanitize HTML and bound MIME/attachment parsing.
- For sends, use a durable outbox and idempotency key. Reconcile ambiguous responses before retry; never imply queued means sent.
- Cover provider-specific normal, edge, duplicate, rate-limited, revoked, and malformed cases with sanitized fixtures or sandbox accounts.

Do not mark a provider supported from a successful OAuth handshake alone. Completion requires verified listed capabilities and accurate UI disclosure of the rest.
