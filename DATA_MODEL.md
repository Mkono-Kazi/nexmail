# Data model and persistence

**Status:** First-release storage decisions are accepted in `DECISIONS.md`; implement and evolve the schema through reviewed migrations.

## Core records

- **Account:** local stable ID, provider/type, display label, normalized address, auth reference, enabled state, capabilities, and timestamps. Secret material belongs in platform secure storage, never ordinary account fields.
- **Mailbox:** account ID, provider mailbox ID, display name, kind, hierarchy/role metadata, and capability flags.
- **Message:** account ID, provider message ID, conversation/thread ID when available, envelope headers, received/sent timestamps, read/flag state, mailbox associations, and sync version. Preserve provider identifiers without treating them as globally unique.
- **Body representation:** parsed plain text and sanitized/renderable HTML references, content metadata, and loading state. Keep raw MIME only if a documented feature requires it and the retention/security policy permits it.
- **Attachment:** message/account IDs, provider part ID, safe display filename, media type as untrusted metadata, byte size, and a reference to protected local content when cached.
- **Draft:** account and sender identity, recipient lists, subject, body, attachment references, local revision, provider draft ID if present, and save/send state.
- **Pending operation:** account ID, operation type, target IDs, requested mutation, state, attempt metadata, and reconciliation information. Avoid storing duplicate secrets or unnecessary message content.
- **Sync cursor/state:** account and mailbox scope, provider change token/cursor, last attempt, last success, and recoverable error category.
- **Preference:** scoped setting key/value and schema version; sensitive values use secure storage.
- **Device session:** user/device scoped refresh-token hash, expiry, last-seen time, and revocation time. Raw refresh tokens exist only in the desktop OS credential vault.

## Invariants

- Every account-owned record is scoped by account ID. Queries and mutations must include this scope.
- Provider IDs are scoped by account and entity type; do not assume global uniqueness.
- Local timestamps use a consistent UTC representation; display conversion belongs to presentation.
- User-generated draft changes are durable before the UI reports they are saved.
- Cache deletion must not delete remote mail unless the user explicitly invokes a remote delete action.
- A cached attachment is never opened based solely on filename or claimed MIME type.
- Database migrations preserve drafts, account references, and pending operations or provide a safe recovery path.

## Retention and deletion

The server retains normalized headers, provider identifiers, and sync metadata for the 90-day default window; older records are fetched from the provider on demand. The user may reduce the cache window. Bodies and attachment contents live only in the encrypted local cache during normal operation. Disconnecting an account removes its server-side metadata, encrypted provider credentials, local cached content, and pending operations after clear confirmation. Remote provider mail is untouched unless the user explicitly requests a provider-side delete.

## Export and portability

Keep exports account-scoped, user-initiated, and protected during temporary file creation. State clearly when an export is a local copy versus a complete provider mailbox archive. Do not imply that exporting local cache migrates or removes remote mail.

Accepted formats: account mailbox archive as MBOX; individual original messages as EML; Nexmail settings and metadata as JSON. Import and cross-provider migration remain outside v1 until round-trip semantics are verified.

## Encryption and tenant isolation

Local SQLite uses SQLCipher. Its key is held only in the operating-system credential vault. PostgreSQL provider tokens use application-layer AES-256-GCM envelope encryption with versioned keys. PostgreSQL tenant records include `user_id`; enforce ownership in every query and enable row-level security with a non-owner, non-`BYPASSRLS` runtime role. Apply user context transaction-locally. Index foreign keys and common `(user_id, account_id, received_at)` access paths.

## Indexing and scale

Index only fields needed by the chosen search experience. Keep indexes account-scoped and rebuildable from retained local data. Establish representative mailbox sizes and limits before choosing pagination, pruning, and full-text indexing behavior.
