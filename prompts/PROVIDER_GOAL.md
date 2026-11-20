# Provider integration goal prompt

```text
GOAL
Deliver a production-shaped Nexmail adapter for [PROVIDER] that can securely connect an account and complete [CAPABILITIES] through the shared provider contract without leaking provider-specific behavior into the UI or domain layer.

BEFORE CODING
Read PROJECT_RULES.md, continuity.md, EMAIL_PROTOCOLS.md, SECURITY.md, and the provider capability matrix. Use current official provider documentation to confirm authorization requirements, scopes, API versions, change cursors, rate limits, verification policies, webhooks, and error behavior. Record material decisions in DECISIONS.md/ADR. Never request, commit, or log real credentials.

REQUIRED WORK
- Implement the provider adapter and explicit capability reporting.
- Implement secure connect/callback/refresh/revoke behavior in the correct layer; validate state/PKCE and least-privilege scopes as applicable.
- Normalize provider IDs, folders/labels, threads, recipients, dates, and message state without assuming IDs are global or semantics match other providers.
- Implement initial and incremental sync with provider-specific cursors, pagination, deduplication, cursor-expiry recovery, throttling, bounded retries, and cancellation.
- Implement requested read/write/search/send/attachment behavior; preserve uncertain send outcomes and reconcile before retry.
- Keep tokens out of the webview, SQLite, logs, telemetry, Valkey payloads, and unencrypted database fields.
- Add sanitized fixtures or provider sandbox coverage for authorization, normal responses, malformed data, pagination, duplicates, rate limits, revoked consent, and ambiguous outcomes.
- Update provider capability docs, UI limitations, tests, roadmap status, and supported-provider matrix.

COMPLETION GATE
The adapter is Done only when all requested capabilities pass contract/integration coverage, account boundaries are enforced, sync recovers from failures without data loss or duplication, security review requirements pass, and the UI communicates unsupported behavior accurately. A provider that only connects or reads one page is not complete unless that narrower scope was explicitly approved and labeled.
```
