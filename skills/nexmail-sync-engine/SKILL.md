---
name: nexmail-sync-engine
description: Implement or diagnose Nexmail hybrid synchronization, offline operations, provider cursors, change feeds, conflict handling, or outbox delivery. Use when state moves across provider, server, queue, devices, and local SQLite.
---

# Nexmail hybrid synchronization

Read `ARCHITECTURE.md`, `DATA_MODEL.md`, `EMAIL_PROTOCOLS.md`, `SECURITY.md`, and the sync sections of `continuity.md`. Preserve the three authorities: provider for original mail/delivery, Nexmail backend for shared metadata and coordination, and device SQLite for local cache and pending operations.

## Invariants

- Model synchronization as explicit operations, not whole-database uploads.
- Every operation has stable operation ID, user/device/account scope, entity/type, creation time, base revision when available, retry state, and reconciliation result.
- Make operation submission and queue processing idempotent. Enforce uniqueness in durable storage, not only in Valkey.
- Keep job payloads small and free of OAuth tokens and message bodies; pass internal identifiers and load sensitive data securely in the worker.
- Commit normalized changes and cursors transactionally. Use provider-specific cursor semantics; cursor expiry triggers a bounded, deduplicating recovery path.
- WebSocket events signal that durable changes may exist; reconnecting clients recover through the API cursor/feed.
- Queue acknowledgements mean accepted for processing, never “sent” or provider-confirmed.
- For send timeouts or worker crashes, reconcile against provider state before retrying. Prefer delivery-unknown over duplicate email.
- Reconcile external mutations that happen while devices are offline; distinguish retryable, conflict, permanent, and authentication failures.
- Keep local drafts durable and usable without network; clearly show stale cache and pending actions.

## Verification scenarios

Cover duplicate webhook delivery, repeated operation batch, concurrent devices, worker crash before/after provider side effect, network loss mid-operation, expired/revoked auth, provider throttling, cursor expiry, remote move/delete while offline, app restart, and local/server cursor divergence. Completion requires convergence without silent data loss, false success, or duplicate sends.
