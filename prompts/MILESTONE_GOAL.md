# Roadmap milestone goal prompt

```text
GOAL
Complete [MILESTONE NAME] from continuity.md for Nexmail, delivering every milestone exit condition and leaving the next milestone unblocked.

START
Read continuity.md and PROJECT_RULES.md first, then ROADMAP.md and the relevant architecture/security/testing/release references. Inspect repository status and current implementation. Confirm the milestone's dependencies, open decisions, supported platforms, and provider scope.

DELIVERY
- Convert each milestone work item and exit condition into a short checklist tied to requirement IDs.
- Sequence work by dependency and complete vertical slices across frontend, API/worker, storage, and provider adapter.
- Keep interfaces, migrations, environment configuration, local dev services, accessibility, privacy, and deployment behavior aligned.
- Add verification for each critical workflow and failure boundary; run relevant project checks when requested or required by the task.
- Keep changes within the selected architecture unless an accepted ADR changes it.

EXIT REVIEW
Verify each stated exit condition with implementation paths and evidence. List any unmet condition as open; never infer completion from code scaffolding or a successful build alone. Update continuity.md status, .ai/current-task.md, .ai/handoff.md, feature docs, and DECISIONS.md as needed. Set the Next action to one concrete step in the following milestone.
```
