# Nexmail feature goal catalog

Choose the closest goal below, fill its few inputs, and use it with [FEATURE_GOAL.md](FEATURE_GOAL.md). These are starter scopes, not claims that features exist. A feature is Done only when the shared completion gate and feature-specific acceptance conditions pass.

## Account lifecycle and devices

```text
GOAL
Let a user connect, identify, reconnect, and remove a supported mail account, and register/revoke a Nexmail device without losing user-created work or exposing another account's data.

SCOPE
Provider consent and callback; account/device UI; secure credential reference; backend ownership checks; account-scoped records; reconnect/revocation; local cache cleanup; explicit effect on remote data. Keep Nexmail sign-in and recovery within the accepted identity ADR.

DONE WHEN
Connect, cancellation, denial, expiry, revocation, reconnect, account switch, removal, and device revocation have clear UI and verified backend/local effects on each target OS. Tests prove account/device isolation and that removing local data does not silently delete remote mail.
```

## Mailbox navigation and unified inbox

```text
GOAL
Let the user navigate supported accounts, folders/labels, and a unified inbox while seeing account, sync, and freshness state for every result.

SCOPE
Folder/capability discovery; account-scoped pagination and queries; stable ordering; unread/flag summaries; local SQLite read model; loading/empty/error/offline states; responsive desktop layout and keyboard navigation.

DONE WHEN
Provider limitations are represented correctly, overlapping provider IDs remain isolated, paging does not duplicate or omit rows, cached data opens offline with a stale indicator, and UI states are verified for small and large mailboxes.
```

## Message reading, threads, and safe rendering

```text
GOAL
Let the user open a message or conversation, understand participants and dates, inspect attachments, and read hostile or malformed email safely.

SCOPE
Normalized headers and provider threading; body retrieval/cache; MIME bounds; plain-text fallback; sanitized HTML in an isolated rendering surface; remote content blocked by default; safe external links; accessible reading controls.

DONE WHEN
Thread mapping works for the target provider, malformed and oversized messages fail safely, scripts/active content/remote loads are blocked by default, and keyboard/screen-reader reading paths work.
```

## Message organization

```text
GOAL
Let the user mark read/unread, star/flag, archive, move, label, or delete supported messages and see whether each operation is pending or provider-confirmed.

SCOPE
Capability-aware UI; operation IDs and durable queue; optimistic state with rollback/reconciliation; batch actions and partial failures where included; undo/confirmation where supported.

DONE WHEN
Repeated clicks and duplicate jobs are idempotent; offline operations survive restart; provider conflicts and permanent errors are visible; local cache removal is never confused with remote delete.
```

## Composer, drafts, and sending

```text
GOAL
Let the user compose, reply, reply-all, forward, save a durable draft, and send through the selected account with clear delivery certainty.

SCOPE
Sender identity; To/Cc/Bcc; validation; body/quoted content; local-first drafts; optional provider draft sync; durable outbox; send idempotency/reconciliation; queued/sending/sent/failed/delivery-unknown states.

DONE WHEN
Drafts survive offline use, restart, and recoverable errors; recipient/sender intent is preserved; provider acceptance is distinguished from queue acceptance; ambiguous outcomes are reconciled before retry and cannot silently duplicate a send.
```

## Attachments

```text
GOAL
Let the user attach, inspect, download, and open supported files without trusting message-supplied names or media types.

SCOPE
Native file picker; size/type limits; upload/download progress and cancellation; protected temporary files; safe names; provider part handling; cleanup and UI errors.

DONE WHEN
Oversized, malformed, canceled, interrupted, and duplicate attachment flows are covered; files are staged safely and cleaned up; open/download requires a user action and cannot execute through the privileged webview.
```

## Search

```text
GOAL
Let the user search supported mail across selected accounts and understand search scope, freshness, and provider-specific result limitations.

SCOPE
Provider and/or PostgreSQL search; SQLite FTS5 offline search; account scoping; query validation; pagination; filters; index rebuild/migration; results and empty/error/offline states.

DONE WHEN
Cross-account isolation passes; local results remain usable offline and are labeled appropriately; provider/local result differences are documented; indexing and query performance meet measured project targets.
```

## Hybrid sync and offline work

```text
GOAL
Keep the local client useful offline and converge provider, backend, and device state reliably after reconnect or process failure.

SCOPE
Initial/incremental sync; provider cursors; BullMQ jobs; durable API change feed; local operation queue; device cursor; retries/backoff; conflict resolution; outbox reconciliation; sync state UI.

DONE WHEN
Duplicate webhooks and operation batches are harmless; cursor expiry recovers; worker crashes around side effects do not cause data loss or duplicate sends; clients resume from durable cursors; offline drafts and supported mutations survive restart.
```

## Notifications and preferences

```text
GOAL
Let the user control sync, notification, cache, privacy, and display behavior and receive only notifications they consented to.

SCOPE
Persisted settings and migrations; platform permissions; lock-screen privacy; account-aware routing; provider/backend notification events; effective cache and scheduling behavior.

DONE WHEN
Permission denial and revocation are handled; settings affect real backend/native behavior; notification links route to the right account; private content is minimized; settings survive restart and migration.
```

## Data portability

```text
GOAL
Let the user understand what data Nexmail stores and export supported user-created or locally cached data in a documented, account-scoped format.

SCOPE
Export inventory and format; optional import path only when included; native save dialog; background progress/cancellation; temporary file protection; metadata/body distinction; account removal; service-discontinuation plan.

DONE WHEN
Exported contents match the documented format, are protected during creation, and are distinguished from a complete provider mailbox archive. Any import or cross-provider migration claim has a verified round trip; unsupported data is disclosed.
```

## Other features

For features not listed, use [FEATURE_GOAL.md](FEATURE_GOAL.md). Add only the feature-specific acceptance conditions that change what Done means; keep the universal full-stack, security, accessibility, offline, verification, and documentation bar in one place.
