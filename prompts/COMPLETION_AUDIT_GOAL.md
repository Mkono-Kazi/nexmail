# Feature or release completion audit prompt

```text
GOAL
Determine whether [FEATURE / MILESTONE / RELEASE] is genuinely complete against its acceptance criteria and Nexmail project rules. Fix in-scope omissions when implementation is authorized; otherwise produce a precise gap list.

EVIDENCE
Read continuity.md, PROJECT_RULES.md, the governing product requirements, relevant architecture/security/testing/release docs, and the implementation. Map each criterion to code, test or manual evidence, platforms/providers covered, and known limitations.

AUDIT AREAS
- Complete user journey from UI to provider/backend and back.
- Authorization and user/account/device ownership.
- Persistence, migrations, offline/restart behavior, retries, idempotency, conflict and ambiguous outcomes.
- Empty/loading/success/error/partial states and clear user copy.
- Security, privacy, logs, data retention/export, hostile email input, attachments, and native permissions.
- Accessibility, keyboard/touch, localization readiness, and target platform differences.
- Automated/manual verification, provider limitations, docs, release/support readiness.

DECISION
Mark Done only when every required criterion has evidence on every in-scope target. Otherwise leave status In progress or Blocked and state the missing work, affected user outcome, exact next action, and any decision needed. Never treat build success, mocked data, or unexercised scaffolding as feature completion.
```
