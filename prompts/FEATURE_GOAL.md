# Full-stack feature goal prompt

Copy once per feature. Keep the fill-in section short; the acceptance structure below carries the repeated engineering requirements.

```text
GOAL
Complete [FEATURE NAME] for Nexmail so that [USER OUTCOME] works reliably on [SUPPORTED PLATFORMS] for [PROVIDER / ACCOUNT SCOPE].

SCOPE INPUTS
- Product requirement IDs: [PR-...]
- User journey: [short description]
- Included behavior: [list]
- Explicitly excluded behavior: [list or “none”]
- Dependencies/decisions: [ADR, prior feature, provider capability]

SOURCE MATERIAL
Read continuity.md, PROJECT_RULES.md, BRAND_GUIDE.md, the linked PRODUCT.md requirement, ARCHITECTURE.md, SECURITY.md, and the relevant UX.md / DATA_MODEL.md / EMAIL_PROTOCOLS.md / TESTING.md section. Read current primary framework/provider documentation when behavior may have changed. Treat sources/ as read-only.

REQUIRED OUTCOME
Implement one complete vertical slice. Cover the frontend user flow; API and authorization; domain/provider behavior; PostgreSQL and SQLite persistence/migrations as applicable; local queue and sync/reconciliation as applicable; loading, empty, offline, validation, partial-failure, retry, and success states; accessibility and localization; safe privacy/security behavior; and user documentation.

ACCEPTANCE CHECKLIST
- [ ] User can complete the named journey without relying on placeholder data or hidden manual steps.
- [ ] Each UI state corresponds to real backend/local state and explains pending vs confirmed outcomes.
- [ ] API inputs are validated and ownership is checked for user, device, and account boundaries.
- [ ] Durable writes and migrations preserve drafts, operations, and existing user data.
- [ ] Offline, restart, timeout, duplicate event, retry, and conflict cases are handled where relevant.
- [ ] Provider limitations and unsupported capabilities are explicit; no false success is shown.
- [ ] Security/privacy, accessibility, localization, and brand/design requirements are addressed.
- [ ] Automated coverage is added for core behavior and failure boundaries; relevant checks are run and results recorded.
- [ ] Docs, requirement status, continuity, and release notes are updated where applicable.

WORK PLAN
1. Inspect current code and requirement; report assumptions and acceptance cases.
2. Map affected modules, data flow, API/contracts, migrations, and UI states.
3. Implement in dependency order, keeping the app buildable.
4. Verify with focused checks and realistic failure/offline scenarios.
5. Review the diff for scope, security, data loss, duplicate actions, accessibility, and unfinished placeholders.
6. Update status only from evidence and write the next concrete action to .ai/current-task.md and .ai/handoff.md.

DONE MEANS
Every applicable checkbox passes with evidence on every target platform/provider in scope. If any required behavior cannot be completed, keep the feature In progress, document the blocker and user impact, and do not report the feature as complete.
```
