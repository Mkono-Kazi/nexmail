# Nexmail product requirements

**Status:** First-release product decisions are accepted in `DECISIONS.md`; implementation has not started. Provider-specific capabilities must still be verified and disclosed during their integration work.

## Product goal

Build a trustworthy, accessible mail client that helps people choose where and how they use email. The product aims to reduce dependence on dominant technology providers and remove the setup friction and rough edges people can encounter in existing alternatives, including some open-source clients. It should pair provider choice, open interoperability, and control over personal data with a polished, dependable experience across the platforms the project chooses to support.

## Product principles

- **Trust:** explain account access, sync state, and consequential actions; protect credentials and message data.
- **Reliability:** preserve user work through disconnects, restarts, and recoverable failures.
- **Clarity:** show which account and identity an action affects; distinguish local pending changes from server-confirmed changes.
- **Accessibility:** support keyboard, assistive technology, text scaling, contrast, and reduced motion on every supported platform.
- **Portability:** share product behavior and domain rules where practical while respecting platform conventions.
- **User freedom:** support provider choice and interoperable standards where practical; make data export, account removal, and limitations understandable; avoid requiring an app-owned identity or exclusive cloud service unless an accepted decision justifies it.
- **Craft:** make setup, everyday mail work, offline recovery, and cross-platform behavior feel coherent and well finished. Polish is a product requirement, not a final styling pass.

## Users and primary jobs

- A person with one or more existing email accounts who needs a unified inbox.
- A person who needs to triage, find, and respond to important messages quickly.
- A person who travels or has intermittent connectivity and needs clear offline behavior.
- A person who relies on accessibility features or platform-native input and navigation.

The first release is designed for privacy-conscious individuals and professionals, supports up to 10 accounts per user, and ships in English with localization-ready foundations. Enterprise shared inboxes and centralized organization administration are outside v1.

## Scope

### MVP capabilities

- Add, reconnect, and remove an account through the selected provider's supported authentication flow.
- View folders or labels, message lists, conversation threads, and message details.
- Compose, reply, reply-all, forward, save drafts, and send messages with attachments.
- Mark read/unread, star/flag, archive, move, and delete messages where supported by the account.
- Search mail within a clearly defined scope and display useful empty, loading, offline, and error states.
- Synchronize essential mailbox state, retain a bounded local cache, and queue safe user actions while offline.
- Manage account, notification, privacy, and display preferences.
- Choose among the supported provider types without requiring a new identity hosted by this product; document provider-specific limitations.
- Export mail as MBOX/EML and Nexmail settings/metadata as JSON, with the limitations defined in `DATA_MODEL.md` and `DECISIONS.md`.

### Deferred beyond v1

Calendar and contacts management; team/shared inboxes; server-side AI processing; mail hosting; full PGP/S/MIME workflows; advanced rules; bulk migration; organization administration. These may be added only with product, security, privacy, and platform requirements of their own.

## Functional requirements

| ID | Requirement | Acceptance criteria |
| --- | --- | --- |
| PR-01 | Account lifecycle | A user can add, inspect connection status, reconnect, and remove up to 10 accounts. When at the limit, the app explains how to remove an account before adding another. Removal clearly states what local data will be deleted and never implies remote mail is deleted. |
| PR-02 | Mailbox navigation | A user can move between configured accounts and their available folders/labels; current account and location remain visible. |
| PR-03 | Read mail | A user can open a message, inspect participants, date, body, and attachments, and navigate within its conversation. |
| PR-04 | Organize mail | Supported actions show pending/confirmed state, update the UI consistently, and recover without losing the intended action after retryable failures. |
| PR-05 | Compose and send | A user can edit recipients, subject, body, and attachments; save a draft; review the sender identity; and see whether a send is queued, in progress, accepted, or failed. |
| PR-06 | Search | Search results identify the account and scope, handle no results and errors, and do not expose data from another account. |
| PR-07 | Offline use | Cached content is labeled as potentially stale; permitted local actions queue safely; unsent drafts survive restart; connectivity restoration reconciles state. |
| PR-08 | Preferences | Per-account and app-level settings are discoverable, persist across restart, and have understandable defaults. |
| PR-09 | Notifications | Native OS notifications are off until the user opts in and can be configured per account. Sender and subject are hidden on the lock screen by default; message bodies and attachment details are never included. Opening a notification routes to the correct account/message after authentication. |
| PR-10 | Provider choice and portability | Users connect external mail accounts through a self-hosted Nexmail instance without creating a Nexmail mailbox. Provider integrations use interoperable protocols where practical and provider APIs where required. Users can export account-scoped metadata/settings as JSON and mail as MBOX/EML, with limitations clearly explained. |
| PR-11 | Product craft | Account setup and core mail workflows are coherent, responsive, accessible, and recoverable. Usability evaluation on Windows 11 25H2+, macOS 15+, and Ubuntu 24.04 LTS+ identifies and resolves major friction in onboarding, reading, organizing, composing, search, and offline recovery before general release. Core workflows meet WCAG 2.2 AA. |

## Quality requirements

- **Cross-platform behavior:** every supported platform passes the same core workflow criteria, with documented platform-specific differences.
- **Responsiveness:** cold launch to a usable warm-account inbox under 3 seconds; cached inbox render under 1 second; local search under 500 ms; local state feedback under 100 ms; ordinary navigation under 200 ms on representative supported hardware. Record hardware and measurement method before treating targets as release gates.
- **Data integrity:** actions and drafts survive process termination according to the persistence policy; duplicate sends are prevented where the provider supports idempotency or reconciliation.
- **Privacy:** collect the minimum telemetry and data needed; no message body, subject, recipients, or attachment content in diagnostic logs by default.
- **Accessibility:** core workflows meet WCAG 2.2 AA and platform conventions; see `UX.md` and `TESTING.md`.
- **Localization:** UI strings, dates, times, addresses, pluralization, right-to-left layout, and text expansion are designed for localization from the start.

## Accepted product decisions

The first release is desktop-only for the OS matrix above, uses a self-hosted Nexmail service, and supports Gmail first followed by delegated Microsoft Graph and IMAP/SMTP. The audience, 10-account limit, English-first localization approach, WCAG 2.2 AA target, performance budgets, free self-hosted economics, export formats, account identity, storage boundaries, source license, telemetry policy, brand direction, and v1 feature boundary are accepted in `DECISIONS.md`. OAuth app registrations, actual deployment region/URL, SMTP credentials, signing certificates, legal entity details, and operator contact information are instance-owner provisioning items, not architecture decisions.

## MVP exit criteria

MVP is ready for release only when all MVP requirements have passing verification on each supported platform, account/provider limitations are disclosed, security release gates in `SECURITY.md` pass, release criteria in `RELEASE.md` pass, and unresolved launch-blocking decisions are closed.
