# Email providers and protocol behavior

**Status:** Provider order, account scope, authentication pattern, and v1 capability scope are accepted in `DECISIONS.md`. Provider application registration remains a provisioning task.

## Provider adapter contract

Each adapter must expose capabilities for authentication, mailbox discovery, listing/pagination, message retrieval, search, flag/read changes, moves/deletes, draft handling, send, attachments, and change notifications/sync cursors. Unsupported behavior must be reported as unsupported, not simulated as success. Provider IDs and error semantics remain inside the adapter.

Prefer interoperable email protocols where they provide secure, reliable access and meet the product requirements. Use provider APIs for capabilities or authentication flows that standards-based access cannot provide safely. Keep providers replaceable behind adapters, test capability differences, and describe restrictions to users. Standards support is a product strategy decision, not a claim that every provider exposes identical features.

## Authentication

- Use provider-approved delegated authorization and short-lived access tokens. Run OAuth Authorization Code with PKCE in the system browser and exchange codes in the NestJS callback; the webview never receives provider tokens.
- Request the narrowest scopes required and explain requested access in plain language.
- Keep refresh/access tokens in platform secure storage; never include them in logs, crash reports, URLs, analytics, or ordinary backups.
- Handle consent revocation, expired credentials, MFA/provider challenges, and account removal explicitly.
- Do not collect or store mailbox passwords. For custom IMAP/SMTP only, allow a user-supplied app-specific password when that provider lacks OAuth2; encrypt it server-side and explain its scope.

## Accepted provider sequence

1. **Gmail first:** personal and user-delegated Workspace mailboxes via Gmail API. Use `gmail.modify` for read/compose/send/organize and do not request immediate permanent-delete access. This is a restricted Google scope; complete app verification and any required independent security assessment before public release. The provider app registration is a launch dependency.
2. **Microsoft Graph second:** personal and work/school mailboxes using delegated `Mail.ReadWrite` and `Mail.Send`; never request tenant-wide application permissions.
3. **Custom IMAP/SMTP third:** IMAP over TLS and SMTP submission over TLS; prefer OAuth2, allow explicitly entered app passwords only where necessary. Do not claim provider-specific features beyond the adapter's tested capability set.

## Synchronization

- Initial sync should fetch mailbox metadata and a bounded recent window, then fetch additional history on demand or in background within platform limits.
- Incremental sync should use provider-supported change history/cursors; detect cursor expiry and recover with a documented resync that avoids duplicate local records.
- Full sync must be cancellable, rate-limit aware, and resumable after app restart.
- Notifications or push signals are hints to sync, not a source of truth. Periodic refresh is subject to platform background limits and user settings.
- Surface last-updated time and actionable auth/network/provider error states.

## Mutations and sending

- Persist a draft before reporting it saved. Distinguish local draft, provider draft, queued send, accepted send, and failed send.
- A network timeout during send is ambiguous. Query/reconcile provider state where possible before retrying; never blindly resend a message that may already have been accepted.
- Preserve recipient intent and sender identity. Require confirmation for account/identity ambiguity and clearly show external recipients if the product supports such warnings.
- Do not silently drop unsupported message features, recipients, or attachments; explain any lossy conversion before sending.
- Use provider threading/reply metadata when available, while retaining a valid reply behavior when it is not.

## Message parsing and rendering

Email headers, MIME structures, filenames, HTML, and external links are untrusted input. Parsing must tolerate malformed input within resource limits. The UI must not execute scripts, active content, or remote resources by default. Keep remote images blocked or proxied until the user opts in; explain privacy impact. Escape text contexts and sanitize HTML with a maintained, tested sanitizer.

## Provider certification

Before shipping an adapter, document its auth registration and scopes, API/protocol versions, rate limits, supported capabilities, pagination and sync semantics, error mapping, test accounts/fixtures, and known limitations. Verify current provider policies and primary documentation during implementation; this file intentionally does not freeze volatile endpoints or SDK versions.
