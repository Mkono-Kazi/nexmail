# User experience and interaction requirements

**Status:** Accepted first-release direction: desktop-first three-pane layout. `BRAND_GUIDE.md` owns brand identity, visual tokens, motion, and interface language; use this document for workflows and interaction requirements.

## Information architecture

Provide clear entry points for account/mailbox navigation, message list, message/thread reading, compose, search, and settings. Keep the active account and mailbox apparent at all times. Multi-account views must make account boundaries visible in results and compose.

Use an adaptive three-pane desktop layout: navigation/account sidebar, message list, and reading pane. Support compact and comfortable density, system/light/dark themes, discoverable keyboard shortcuts, persistent sync status, and clear pending/confirmed operation states. Use accessible shadcn/ui and Radix primitives; follow `BRAND_GUIDE.md` for the original Nexmail identity and Material-inspired visual approach.

## Core flows

### Add an account

Explain supported providers and requested access → launch approved authorization → return through a validated callback → show sync progress and account identity → present the mailbox. If setup fails, preserve enough safe state to retry and explain whether authorization succeeded.

### Read and organize

Show a stable list with sender, subject, date, unread state, and useful preview → open a thread → expose message details and attachments → offer supported actions with undo where feasible → communicate whether each change is pending offline or confirmed by the provider.

### Compose and send

Show sender identity → allow recipient entry with clear To/Cc/Bcc roles → edit subject/body and attach files → preserve a durable draft → show progress/result after send. Warn before discarding meaningful unsaved changes. On ambiguous send failure, state that delivery is unconfirmed and provide reconciliation rather than a misleading retry button.

### Offline and error states

Distinguish no connection, authentication required, provider unavailable, rate limited, and local storage failure. Keep cached content available when safe, label it as stale, and show which actions are queued. Offer a next step for every recoverable error.

## Cross-platform adaptation

Support Windows 11 25H2+, macOS 15+, and Ubuntu 24.04 LTS+ x86-64. Respect platform window controls, keyboard conventions, safe file pickers, system theme, notifications, and lifecycle. Mobile layouts and touch-first navigation are outside v1.

## Accessibility and localization

Core workflows target WCAG 2.2 AA. Verify contrast, keyboard access, focus visibility, assistive technology names/order, text scaling, reduced motion, and platform conventions as described in `BRAND_GUIDE.md` and `TESTING.md`.

- Give controls meaningful accessible names, roles, state, and focus order.
- Support keyboard-only operation, visible focus, screen readers, text scaling, high contrast, and reduced motion.
- Do not communicate status by color alone; provide announcements for send/sync results without stealing focus.
- Ensure message content can be zoomed/reflowed and that blocked content is explained.
- Externalize strings; use locale-aware date/time formatting, bidirectional layout, and plural rules.

## Content design

Use specific language for delivery state: “Saved on this device,” “Waiting to send,” “Sent,” and “Delivery not confirmed.” Avoid labels that conflate archive, delete, and local removal. Confirm destructive actions when recovery is not available and offer undo when the provider operation allows it.
