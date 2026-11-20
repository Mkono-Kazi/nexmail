# Security and privacy requirements

**Status:** Accepted minimum controls for v1. Complete a product-specific threat model before handling real accounts; the architecture and control defaults are recorded in `DECISIONS.md`.

## Assets and threats

Protect account tokens, message bodies and metadata, drafts, attachments, search indexes, notification previews, and account identity. Consider device theft, malicious or compromised message content, token theft, cross-account data leakage, malicious links/attachments, network interception, unsafe diagnostics, dependency compromise, and accidental remote mutations.

## Required controls

- Use TLS with platform/provider validation; never disable certificate validation in production.
- Store provider credentials server-side using AES-256-GCM envelope encryption with versioned keys in deployment secrets. Store desktop session tokens and SQLCipher keys only in OS credential vaults. Minimize provider scopes and support revocation/removal.
- Encrypt local SQLite with SQLCipher. Do not use plaintext fallback when the OS credential vault is unavailable.
- Enforce user/account ownership in every API and data access path; add PostgreSQL RLS as a second boundary using a non-owner runtime role. Treat provider IDs as untrusted input.
- Sanitize message HTML; block script execution, active content, and third-party remote loads by default. Require an explicit user gesture before opening external links or downloading attachments.
- Validate attachment size and content handling; use temporary protected files and clean them up. Never trust extension or declared MIME type alone.
- Redact message content, addresses, subject lines, tokens, authorization codes, and attachment paths from logs and telemetry by default.
- Use safe deep-link/redirect allowlists and validate authorization callbacks.
- Apply dependency review, vulnerability updates, signing, and reproducible release practices appropriate to selected platforms.
- Provide a clear account removal path and explain the effect on local cache, drafts, credentials, and remote data.

## Privacy requirements

Publish a data inventory before launch: what is processed on device, what leaves the device, telemetry fields, crash reports, retention, deletion, backups, and subprocessors. Default to no content analytics. Notifications should minimize content on lock screens and respect OS permission controls. Obtain explicit consent for optional remote content loading and optional diagnostics.

## Provider-specific release gates

Gmail uses the restricted `gmail.modify` scope. Public availability requires Google OAuth verification and any applicable independent security assessment for server access to restricted Gmail data. Submit verification early; provider review is an external critical-path dependency. Microsoft Graph uses delegated permissions only; never request tenant-wide application permissions. Recheck the providers' current policies and scope classifications before release.

## Security review gates

Before connecting real provider accounts, review authentication, token storage, callback handling, logging, and account isolation. Before public beta, test malicious HTML, link handling, oversized and malformed attachments, offline queue/retry, account removal, database migration, and backup behavior. Before general release, resolve all critical/high findings or document an accepted, time-bounded exception with an owner; verify signing and update channels; review the data inventory and incident contact.

## Incident readiness

Define a security contact, vulnerability intake, severity/triage ownership, credential revocation guidance, user notification process, and release rollback/update process before general availability. Do not put secrets or message content in issue reports.
