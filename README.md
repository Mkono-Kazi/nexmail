# Nexmail

Product and implementation documentation for Nexmail, a desktop-first mail client aiming to pair user choice and data portability with a polished, dependable experience. The accepted foundation is Tauri 2 + React/TypeScript, NestJS API and worker, PostgreSQL, Valkey/BullMQ, SQLCipher-backed local SQLite, and hybrid synchronization. Gmail is first, followed by Microsoft Graph and IMAP/SMTP. The first release is self-hosted; see [DECISIONS.md](DECISIONS.md) for the complete decision record.

## Start here

1. Read [continuity.md](continuity.md) to resume the project, see implementation status, and follow the end-to-end roadmap.
2. Read [PRODUCT.md](PRODUCT.md) for goals, scope, and acceptance criteria.
3. Read [ARCHITECTURE.md](ARCHITECTURE.md) for the accepted system boundaries.
4. Read [SECURITY.md](SECURITY.md) before handling credentials, message content, links, attachments, or remote content.
5. Read the relevant reference below before changing a feature.
6. Record consequential choices in [DECISIONS.md](DECISIONS.md), then update the affected requirements and plans.
7. Use [PROJECT_RULES.md](PROJECT_RULES.md) and the goal prompt in [prompts/FEATURE_GOAL.md](prompts/FEATURE_GOAL.md) for implementation work.

## Documentation map

| Document | Use it for |
| --- | --- |
| [continuity.md](continuity.md) | Project state, complete feature inventory, backend/frontend workstreams, and end-to-end roadmap |
| [PRODUCT.md](PRODUCT.md) | Product principles, user needs, requirements, and MVP boundary |
| [UX.md](UX.md) | Navigation, interaction flows, accessibility, and platform adaptation |
| [BRAND_GUIDE.md](BRAND_GUIDE.md) | Brand identity, visual direction, palette, typography, and interface language |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Accepted application boundaries and offline-first behavior |
| [DATA_MODEL.md](DATA_MODEL.md) | Local entities, identity, synchronization state, and persistence rules |
| [EMAIL_PROTOCOLS.md](EMAIL_PROTOCOLS.md) | Provider integrations, authentication, sync, sending, and error handling |
| [SECURITY.md](SECURITY.md) | Threat model, privacy requirements, and release security gates |
| [TESTING.md](TESTING.md) | Verification strategy and quality gates |
| [ROADMAP.md](ROADMAP.md) | Ordered delivery phases and exit criteria |
| [DECISIONS.md](DECISIONS.md) | Accepted architecture and product decisions |
| [docs/adr/0000-template.md](docs/adr/0000-template.md) | Template for recording an accepted or proposed decision |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Change workflow and documentation maintenance |
| [RELEASE.md](RELEASE.md) | Build, signing, distribution, rollout, and support readiness |
| [GLOSSARY.md](GLOSSARY.md) | Shared product and email terminology |
| [PROJECT_RULES.md](PROJECT_RULES.md) | Project-wide development, security, and completion rules |
| [prompts/README.md](prompts/README.md) | Reusable goal prompts for the project, features, providers, milestones, and completion audits |
| [skills/INDEX.md](skills/INDEX.md) | Nexmail-specific agent workflows and when to use them |
| [.ai/current-task.md](.ai/current-task.md) | Active work goal and next concrete action |

## Status and authority

These documents are a starting specification, not evidence that a feature is implemented. **Accepted** items are project defaults; provider capabilities, security details, applicable law, and owner provisioning must still be verified when implementing or operating the product. The code and recorded accepted decisions become the implementation source of truth; keep this documentation aligned with them.

Requirements use stable IDs so design, implementation, and verification can refer to the same behavior. When a requirement changes, update its acceptance criteria and associated test coverage in the same change.
