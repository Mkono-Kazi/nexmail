# Nexmail brand and design guide

**Status:** Accepted direction for the first release. This is a product design brief, not an implemented visual system. Use it with `UX.md`, `PRODUCT.md`, and `DECISIONS.md`.

## Brand idea

**Nexmail gives people a calmer, more capable place to work with the email they already own.** It should feel open, dependable, quietly confident, and considerate of the user's attention. Its advantage is not novelty for novelty's sake: it is a well-made, trustworthy tool that stays out of the way and makes user choice practical.

### Brand principles

- **User agency:** clearly show which account is active, where data lives, and what each action will do.
- **Calm focus:** give messages room to be read; keep chrome compact and secondary.
- **Open by default:** the identity should feel independent and welcoming, never like a gatekeeper or an account ecosystem.
- **Craft through clarity:** align details, states, copy, and behavior so the app feels predictable and finished.
- **Warm competence:** professional and friendly, without corporate coldness, cute mascots, or forced playfulness.

## Design lineage

Use Material Design 3 as a reference for adaptive layouts, role-based tokens, legible type hierarchy, components with complete interaction states, and motion that explains change. Do not copy Google's logo, four-color palette, product-specific screen patterns, or distinctive assets. Nexmail has its own colors, name, iconography, and visual identity. See the official [Material Design 3 system](https://m3.material.io/) and its [theming guidance](https://developer.android.com/codelabs/m3-design-theming).

## Visual identity

### Color direction

The signature is **deep teal, ink, and warm paper**. Teal signals continuity and control; ink keeps dense mail readable; warm neutrals soften long reading sessions. Use color through semantic roles and preserve contrast. Color never carries status alone.

| Role | Light theme | Dark theme | Use |
| --- | --- | --- | --- |
| Brand / primary | `#176B63` | `#83D5C8` | Primary actions, selected navigation, key focus accents |
| On primary | `#FFFFFF` | `#082B28` | Text/icons on primary fills |
| Primary container | `#D7F0EB` | `#174640` | Selected surfaces, subtle emphasis |
| App background | `#F5F7F6` | `#111918` | Main window canvas |
| Surface | `#FFFFFF` | `#192220` | Lists, panes, menus, dialogs |
| Raised surface | `#FFFFFF` | `#202B28` | Popovers and elevated surfaces |
| Main text | `#172321` | `#E8EFEC` | Message subjects and primary content |
| Secondary text | `#53635F` | `#B3C1BC` | Metadata and supporting labels |
| Divider / outline | `#DCE4E1` | `#35423E` | Boundaries, separators, control outlines |
| Warm accent | `#A65F16` | `#F2B96F` | Sparing emphasis, never a second primary |
| Success | `#24734F` | `#79D5A3` | Confirmed success with text/icon |
| Warning | `#855400` | `#F0C36D` | Caution and delayed states with text/icon |
| Error | `#B3261E` | `#FFB4AB` | Failure and destructive context with text/icon |

These are starting design tokens. Before release, calculate and verify text, icon, focus, and control contrast for every role and state against WCAG 2.2 AA. Do not lighten text or lower contrast to make the interface feel softer. Do not use Google's red/yellow/green/blue brand combination or derive app-wide colors from desktop wallpaper.

### Typography

- Use **Inter** for interface text and controls, with system sans-serif fallbacks. Bundle the font only if redistribution terms are compatible and its performance impact is measured.
- Use a clear, compact scale: 12 px supporting metadata, 14 px dense controls/list metadata, 15–16 px default interface and message text, 20 px pane headings, 28 px occasional page/onboarding title.
- Prefer regular and medium weights. Use bold for unread message subjects and genuinely important headings, not every control.
- Preserve the original message's font choices only inside the isolated message-content renderer; app chrome follows Nexmail typography.
- Respect OS text scaling, browser zoom, and user text-size preferences without clipping controls or mail content.

### Shape, space, and icons

- Use a 4 px base spacing grid; common gaps are 8, 12, 16, 24, and 32 px.
- Keep utility controls compact but comfortably targetable. Interactive targets should meet the applicable WCAG 2.2 target-size requirements or use the spacing exception intentionally.
- Use restrained radii: 8 px for controls, 12 px for cards and menus, 16 px for larger containers. Reserve pill shapes for chips, toggles, and selected compact filters.
- Use a consistent outline icon set with 1.75–2 px strokes. Label ambiguous or high-impact actions. Do not use decorative icon sets that impersonate Google's Material Symbols library identity.
- Favor fine dividers and tonal surface changes over persistent shadows. Elevation should explain layer order, not decorate every pane.

## Product layout and interaction language

- Default to an adaptive three-pane desktop workspace: navigation/accounts, message list, and message reader. Let users resize or collapse panes where the window permits.
- Keep compose prominent and easy to reach. Keep search visible and scoped. Keep account identity and sync condition legible without requiring a settings visit.
- Offer comfortable and compact density. Comfortable is the default; compact is user-selected and must remain readable.
- Support system, light, and dark themes. Honor OS theme by default; never change the brand palette based on wallpaper.
- Build each control with default, hover, focus-visible, pressed, selected, disabled, loading, success, and error states as applicable. Keyboard focus must remain visible and unobscured.
- Prefer direct manipulation only when it has a clear keyboard-accessible alternative. Drag-and-drop is optional convenience, never the sole way to organize mail.
- Explain pending, offline, and confirmed states in text. A small color or animation change may reinforce a state but cannot be its only signal.
- Use progressive disclosure for advanced provider settings. Keep core tasks—read, organize, compose, search, and recover—immediately understandable.

## Motion and feedback

Motion confirms what changed, preserves spatial context, and helps users understand layered surfaces. It is never a substitute for status text.

- Keep frequent interactions nearly immediate: no animation for keyboard navigation or repeated list actions; use brief 100–180 ms feedback for pointer press, hover, and color changes.
- Use 150–240 ms ease-out for occasional menus and popovers; 180–260 ms for dialogs or pane transitions. Keep ordinary UI motion below 300 ms.
- Animate opacity and transform when useful; avoid layout-wide movement, decorative looping, spring bounce, and staggered inbox rows.
- Respect `prefers-reduced-motion`; remove movement and preserve only necessary fades or state cues.
- Acknowledge a click immediately. If an operation takes time, show stable progress and a truthful result rather than a fake completion animation.

## Content and voice

Write like a capable colleague: plain, specific, calm, and honest. Prefer verbs and concrete outcomes. Explain data consequences before irreversible actions. Preserve account context in confirmations and errors.

- Say “Saved on this device,” “Waiting to send,” “Sent,” and “Delivery not confirmed” when those are the actual states.
- Use “Move to Trash” or “Delete from this device” precisely; never collapse archive, trash, account removal, and local cache removal into one vague “delete.”
- Explain unsupported provider behavior at the point it matters and offer an available next step.
- Do not imply that Nexmail hosts mail, guarantees provider delivery, or can retrieve uncached messages while offline.
- Avoid jokes, hype, alarmist warnings, and blaming users for connection or provider failures.

## Brand mark and imagery

Use the wordmark **Nexmail** in sentence case. The application icon should be a simple original geometric mark suggesting an open envelope and a forward path, drawn as a single coherent shape; it must work at small sizes and in monochrome. Do not use a shield, lock, globe, or paper-plane stock symbol as the primary identity. There is no approved final logo artwork yet.

Use product screenshots and simple explanatory diagrams rather than stock photos. Empty states should be useful and quiet, with a clear next action and no mascot required. Illustrations must not depict private message content.

## Release design gates

Before general release:

1. Verify all theme tokens and component states for WCAG 2.2 AA contrast and keyboard access.
2. Test the three-pane layout at compact and wide window sizes and with OS text scaling.
3. Review real, long, malformed, multilingual, and attachment-heavy messages for readability and overflow.
4. Check reduced-motion behavior and screen reader names/order on each supported desktop platform.
5. Measure first-use and repeated-use performance; animations must not delay input or inbox navigation.
6. Run a distinctiveness review to ensure the final icon, palette, and screen styling do not imply Google ownership or endorsement.

## References

- [Material Design 3](https://m3.material.io/) and [Material 3 theming guidance](https://developer.android.com/codelabs/m3-design-theming) inform the adaptable, role-based visual system.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) is the W3C accessibility conformance reference for the AA target.

