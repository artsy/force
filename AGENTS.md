# Agent Guidelines

Force is Artsy's public-facing web application.

Shared Artsy frontend conventions are in [`.claude/rules/artsy-frontend-conventions.md`](.claude/rules/artsy-frontend-conventions.md), auto-synced from [artsy/claude-config](https://github.com/artsy/claude-config) — edit them there, not here. This file holds **Force-specific** guidance and takes precedence on any conflict. Fuller Force docs: @docs/best_practices.md

## Tech Stack

- **React** - Component framework
- **TypeScript** - Strict type checking (no migration flags)
- **Relay** - GraphQL client for Metaphysics API
- **Palette** - Artsy's design system ([docs](https://palette.artsy.net/))
- **Found** - Routing framework (SSR-enabled)
- **Jest + @testing-library/react** - Testing

## Common commands

Use the following commands to verify the quality of uncommitted code:

- **Type-checking**
  - `yarn type-check`
- **Relay compiler**
  - `yarn relay`
- **Linting** (on changed files)
  - `yarn lint $(git ls-files --modified --others --exclude-standard)`
- **Running tests** (on changed files)
  - `yarn jest $(git ls-files --modified --others --exclude-standard)`

## Code Style

> Shared style rules (explicit JSX returns, named exports, object params, no nested ternaries, naming, imports) come from the shared conventions. Force-specific additions:

- Write tests for any new functionality; ensure tests pass
- Write correctly typed code; avoid adding `@ts-expect-error`
- Force follows conventional typographical style and prefers curly typographic single quotes (`‘` and `’`) and double quotes (`“` and `”`) in user-facing texts. Consider this when generating or updating code, including tests

## Commit Style

**CRITICAL: Before every commit, you MUST verify code quality:**

Ensure the following commands produce no warnings or errors for pending files:

```sh
yarn type-check
yarn jest $(git ls-files --modified --others --exclude-standard)
yarn lint $(git ls-files --modified --others --exclude-standard)
```

**Only after all checks pass** should you create the commit:

- Use Conventional Commits style when writing commit messages
- Add yourself as co-author

**Never commit code that fails type-checking or linting, or has failing tests.**

## Common Patterns

- **Data**: Use Relay hooks for data fetching against Metaphysics (see shared conventions for fragment/connection naming)
- **Analytics**: Use react-tracking with Artsy's event schema `@artsy/cohesion`
- **Tests**
  - Use Jest, but avoid snapshot tests
  - Use React Testing Library to test user-facing behavior rather than implementation details
  - Use Playwright for high-level smoke tests in `playwright/e2e`

## File Organization

- Apps go in `src/Apps/`
- Shared components in top-level `/Components`
- Routes mounted in [src/routes.tsx](src/routes.tsx)

```
src/
├── Apps/                    # Sub-applications
│   └── MyApp/
│       ├── routes.tsx       # Route definitions
│       ├── Components/      # Shared within app
│       └── Routes/          # Route-specific code
│           └── Home/
│               ├── HomeApp.tsx
│               ├── Components/
│               └── Utils/
├── Components/              # Shared across apps
└── System/                  # Framework code
```

## Skills

If you have a matching skill for a user request, be sure to use it.

The documentation below may augment your knowledge, but the skill should be your first resort.

## Further documentation

- [Best Practices (Full)](docs/best_practices.md)
- [Adding New Apps](docs/adding_new_app.md)
- [Architecture](docs/architecture.md)
- [Caching](docs/architecture-caching.md)
- And more in @docs
