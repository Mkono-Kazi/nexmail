---
name: nexmail-feature-development
description: Implement or complete a Nexmail product feature across the desktop UI, API/worker, persistence, sync, and verification. Use for feature requests and vertical slices; use the provider or sync skill for provider-specific or synchronization-heavy work.
---

# Nexmail feature development

Use this workflow for a user-visible Nexmail feature. Load `PROJECT_RULES.md`, `continuity.md`, the linked product requirement, and the relevant architecture, UX, security, data, and provider references. Start from `prompts/FEATURE_GOAL.md` when the request needs a reusable task brief.

## Workflow

1. State the user outcome, requirement IDs, acceptance cases, affected platforms/providers, and exclusions.
2. Trace the complete path: UI → contract/API → domain/provider → PostgreSQL and/or SQLite → operation/sync state → UI result.
3. Identify authorization boundaries, durable writes, offline behavior, partial failures, and recovery before coding.
4. Implement the smallest complete vertical slice; keep placeholders clearly marked as unfinished and do not expose them as working actions.
5. Address keyboard/touch, screen-reader semantics, focus, text scaling, localization, and every meaningful loading/empty/offline/error/success state.
6. Add focused verification for behavior and failure paths. Run relevant checks when the task asks for verification or feature acceptance requires it; report exactly what ran.
7. Update the owning requirement/reference, feature status, `continuity.md`, `.ai/current-task.md`, and `.ai/handoff.md` when progress changes.

## Completion bar

A feature is Done only when its required frontend, backend/data, security/privacy, synchronization, accessibility, and verification work passes for the platforms/providers in scope. A successful compile or visual screen alone does not establish completion. If a dependency is blocked, record the user impact and one next action; keep the feature open.
