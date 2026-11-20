# Verification strategy

**Status:** Tooling selected in `DECISIONS.md`; use these layers for the three supported desktop targets.

## Test layers

- **Domain tests:** account scoping, message/thread mapping, capability rules, mutation state transitions, and date/identity handling.
- **Provider adapter tests:** recorded fixtures or provider sandboxes for pagination, incremental sync, auth failures, rate limits, malformed responses, and ambiguous send outcomes.
- **Persistence tests:** migrations, crash/restart recovery, account removal, cache pruning, draft durability, and operation queue reconciliation.
- **UI/component tests:** accessible names and state, loading/empty/error/offline states, account switching, compose validation, and confirmation/undo behavior.
- **End-to-end tests:** add account, sync, open/read, organize, compose/save/send, search, disconnect/reconnect, remove account.
- **Platform tests:** installation/update, secure storage, opt-in notifications and lock-screen privacy, deep links, background constraints, keyboard/touch behavior, and native attachment open/save on each supported OS.
- **Security tests:** malicious HTML, script/remote resource blocking, deep-link validation, log redaction, account isolation, attachment limits, and dependency scanning.

## Selected tooling

Use Vitest for React/unit tests; Jest and Supertest for NestJS/API tests; disposable PostgreSQL and Valkey containers for integration tests; Playwright for browser-level component/API flows; and Tauri WebDriver automation for packaged desktop shell, deep-link, and OS integration checks. GitHub Actions runs lint/format, typecheck, build, and tests on Windows, macOS, and Ubuntu runners.

## Test data

Use synthetic mailboxes and sanitized fixtures. Include multiple accounts with overlapping provider IDs; long and internationalized names/addresses; Unicode and RTL; empty and malformed headers; nested multipart content; inline and large attachments; duplicate messages; stale/expired sync cursors; timeouts at every mutation boundary; and very large folders.

Never use personal mailbox exports or production credentials in automated tests. Provider sandbox credentials must be isolated, least-privileged, rotated, and absent from repository history and logs.

## Quality gates

For each change, run the checks that cover changed behavior and report what ran. Release candidates must meet all of the following: core workflow tests pass on every target platform; migrations and offline recovery pass; accessibility review covers core paths; security gates in `SECURITY.md` pass; no unresolved release-blocking defects; supported provider capabilities and limitations are documented.

## Manual exploratory scenarios

Test airplane mode during initial sync, edit while offline, app termination during draft save/send, expired consent, provider throttling, same sender in multiple accounts, attachment cancellation, unsupported provider action, full local storage, OS notification denial, and device lock/unlock. Record platform, app build, setup, expected result, observed result, and any data impact.
