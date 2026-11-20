# Contributing

## Change workflow

1. Identify the product requirement and owning design document before changing behavior.
2. For a cross-cutting or hard-to-reverse choice, propose an ADR and wait for it to be accepted before depending on it.
3. Implement the smallest coherent change with account boundaries, offline behavior, accessibility, and failure states considered.
4. Add or update verification for the changed behavior and run relevant project checks.
5. Update docs when behavior, provider support, platform support, data handling, or operational procedures change.
6. Summarize user-visible changes, verification performed, limitations, migrations, and security/privacy implications in the review.

## Definition of done

- Requirements and acceptance criteria are met on every affected supported platform.
- Loading, empty, offline, error, and success states are handled.
- Accessibility and localization implications are addressed.
- Account scoping and sensitive-data handling are reviewed.
- Relevant automated and manual verification is recorded.
- Documentation and release notes are updated when needed.

## Documentation maintenance

Keep each product fact authoritative in one document and link to it elsewhere. Mark unresolved choices **Open** and avoid recording assumptions as facts. Update `README.md` when adding/removing documentation. Verify internal links when moving or renaming a document. Keep synced files under `sources/` as reference material; maintain project documentation outside that directory.
