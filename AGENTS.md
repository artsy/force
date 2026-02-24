# Agent Guidelines

Force is Artsy's public-facing web application.

Our best practices are documented in detail in @docs/best_practices.md

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

- Write tests for any new functionality; ensure tests pass
- Write correctly typed code; avoid adding `@ts-expect-error`
- Prefer named exports; avoid default exports
- Prefer explicit returns; avoid implicit returns
- Force follows conventional typographical style and prefers curly typographic single quotes(`‘` and `’`) and double quotes (`“` and `”`) in user-facing texts. Consider this when generating or updating code, including tests

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

- **UI**: Use Artsy's design system `@artsy/palette` for UI components
- **Data**: Use Relay hooks for data fetching
- **Analytics**: Use react-tracking with Artsy's event schema `@artsy/cohesion`
- **Tests**
  - Use Jest, but avoid snapshot tests
  - Use React Testing Library to test user-facing behavior rather than implementation details
  - Use Playwright for high-level smoke tests in `playwright/e2e`

## File Organization

- Apps go in `src/Apps/`
- Shared components in top-level `/Components`
- Avoid index files (breaks VSCode auto-import)
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

## Cursor Cloud specific instructions

### Environment setup

- **Watchman** is required for `yarn relay --watch` (used by `yarn start`). The system apt package (v4.9) is too old; install a recent release from [facebook/watchman GitHub releases](https://github.com/facebook/watchman/releases) (the `watchman-vXXXX.XX.XX.XX-linux.zip` binary). After installing, ensure the state directory exists: `sudo mkdir -p /usr/local/var/run/watchman/$(whoami)-state && sudo chown $(whoami) /usr/local/var/run/watchman/$(whoami)-state && chmod 0700 /usr/local/var/run/watchman/$(whoami)-state`.
- Environment files: copy `.env.oss` to `.env.shared` and `.env.example` to `.env` for OSS development (connects to Artsy staging APIs).
- `enableScripts: false` in `.yarnrc.yml` disables third-party postinstall scripts. Native tools like `@biomejs/biome` still work because Yarn resolves platform-specific optional dependencies.

### Running the dev server

- `yarn start` runs the Relay compiler in watch mode and the Express dev server concurrently (port 4000).
- The server connects to Artsy's staging Metaphysics/API endpoints configured in `.env.shared`.

### Common verification commands

See `AGENTS.md` "Common commands" section above for `yarn type-check`, `yarn relay`, `yarn lint`, and `yarn jest`.
