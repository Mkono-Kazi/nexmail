# Release and operations

**Status:** Accepted deployment direction: self-hosted Docker Compose/Coolify; v1 has no managed Nexmail SaaS.

## Before a release candidate

- Confirm version, supported platform/OS matrix, provider capabilities, and known limitations.
- Run required build, domain, adapter, persistence, UI, end-to-end, security, accessibility, and platform checks from `TESTING.md`.
- Verify database upgrade and recovery from the last supported release; document any incompatible change and safe user action.
- Verify account authorization, token storage, account removal, offline queue, draft recovery, and ambiguous-send behavior.
- Review permissions, requested provider scopes, opt-in notification defaults and lock-screen privacy, privacy/data inventory, diagnostics redaction, and legal disclosures.
- Complete Google OAuth verification and applicable Gmail restricted-scope security assessment before public Gmail availability; verify Microsoft delegated permissions for Graph.
- Build with production configuration; verify signing identity, artifact provenance, update channel, and rollback/recovery process.
- Prepare release notes, support contact, known issues, incident route, and user-facing migration or permission explanations.

## Rollout

Use staged rollout where the platform allows it. Monitor privacy-safe health signals such as crash rate, sync failures by category, migration failures, and send reconciliation failures. Avoid collecting message content, addresses, subjects, or attachment data. Define stop/rollback thresholds before rollout begins.

## Incident response

For a security, data-loss, or delivery incident: contain the affected release or integration; preserve privacy-safe diagnostics; assess account and data impact; revoke or rotate compromised credentials where applicable; communicate accurate user actions and status; ship a signed fix or disable the affected capability; document cause and prevention work.

## Support readiness

Provide a way for users to report app version, platform, provider, and sanitized diagnostic IDs without sending mailbox content by default. Support guidance must never ask users to share passwords, access tokens, authorization codes, or private message content.

## Self-hosted operations

Provide a single documented Docker Compose deployment supported by Coolify on a VPS. Require instance operators to configure TLS, SMTP, the token-encryption key, and encrypted PostgreSQL backups. The default backup schedule is daily with 30-day retention; document a restore drill before public release. Do not ship development secrets or public credentials in images.
