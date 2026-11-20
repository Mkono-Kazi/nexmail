# Nexmail project goal prompt

Copy this prompt when assigning the overall project or resuming after a long break.

```text
GOAL
Complete Nexmail as a polished, secure, desktop-first email client that reduces provider lock-in through provider choice, interoperable access, and practical data portability. Deliver working frontend and backend behavior for every approved in-scope feature, across the supported desktop platforms and providers.

CURRENT STATE
Read continuity.md first. It is the authoritative progress snapshot and full feature roadmap. Read PROJECT_RULES.md, PRODUCT.md, BRAND_GUIDE.md, ARCHITECTURE.md, DECISIONS.md, SECURITY.md, and the relevant feature references before changing implementation.

SELECTED FOUNDATION
Tauri 2 + React/TypeScript desktop; NestJS modular monolith with API and worker processes; PostgreSQL; Valkey + BullMQ; SQLCipher-backed SQLite local persistence; local-first interaction with server-coordinated synchronization; self-hostable Docker/Coolify deployment. Follow the Nexmail visual identity in BRAND_GUIDE.md. Prove the first complete provider slice with Gmail before adding Microsoft Graph and IMAP/SMTP.

WORKING METHOD
Advance one roadmap milestone or one complete feature at a time. Before implementation, state the intended user outcome, linked requirements, acceptance checklist, affected frontend/backend/data/provider paths, risks, and dependencies. Implement the smallest complete vertical slice. Keep the project buildable and preserve compatibility of contracts and migrations.

COMPLETION GATE
Do not call a feature Done until its applicable UI, API, authorization, persistence, provider behavior, sync/offline/error states, accessibility, security/privacy, verification, and documentation are complete. Do not replace missing behavior with a mock or silently deferred control. If blocked by an unresolved material decision, record options and the exact decision needed, and continue independent work.

RELEASE GOAL
The project is complete only when all approved features meet continuity.md's definition of a complete app; each supported platform and provider has verification evidence; security, accessibility, data portability, migration, release, support, and rollback gates pass; and docs match shipped behavior.

NEXT ACTION
Follow the single concrete Next action in .ai/current-task.md. Update continuity.md, .ai/current-task.md, and .ai/handoff.md as progress is made. Report what is complete, what was verified, limitations, and the next action without overstating status.
```
