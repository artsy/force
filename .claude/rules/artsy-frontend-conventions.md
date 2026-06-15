---
paths:
  - "**/*.{ts,tsx,js,jsx}"
---

# Artsy Frontend Conventions

<!-- Synced from artsy/claude-config (shared/frontend-conventions.md). Do not edit here — open a PR there instead. -->

Shared conventions for Artsy & Artnet frontend apps. Repo-specific guidance (build commands, state management, local component libraries) lives in each repo's own `CLAUDE.md`.

## Pull requests

- PR titles use the conventional commit format: `type(optional-scope): Description` (allowed types: `fix`, `feat`, `chore`, `build`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`, `revert`)

## TypeScript / JavaScript

- **No for loops**: use functional patterns (`map`, `filter`, `reduce`, `some`, `every`, `forEach`)
- **Arrow functions** over `function` declarations for new code
- **Object parameters**: functions with multiple arguments take a single object parameter — never positional arguments beyond the first

  ```tsx
  // ✓ Top-level functions use interfaces
  interface UpdateUserParams {
    id: string
    name: string
    email?: string
  }
  const updateUser = ({ id, name, email }: UpdateUserParams) => {}

  // ✓ Single parameter is fine
  const deleteUser = (id: string) => {}

  // ✗ Multiple unnamed parameters
  const updateUser = (id: string, name: string, email?: string) => {}
  ```

- **No nested ternaries**: extract complex assignments to a variable or getter function with early returns
- **Early exit**: prefer guard clauses over nested conditional blocks
- **Types**: TypeScript for all new code, explicit return types on exports

## React & JSX

- **Functional components with hooks**; prop drilling is fine — reach for context only when drilling becomes unwieldy
- **ALWAYS use explicit return statements with curly braces when returning JSX** — never implicit/parenthesized returns, including render props and `map` callbacks. Zero-tolerance rule.

  ```tsx
  // ✓
  const Component = () => {
    return <div>Content</div>
  }
  {items.map(item => {
    return <ListItem key={item.id}>{item.name}</ListItem>
  })}

  // ✗
  const Component = () => <div>Content</div>
  const Component = () => (
    <div>Content</div>
  )
  {items.map(item => <ListItem key={item.id}>{item.name}</ListItem>)}
  ```

- **No components inside components**: never define a component inside another component's body — extract to module top level or its own file
- **One component per file**; only small helpers exclusively used by the main component may share a file, defined below it
- **Custom hooks** co-locate in a `hooks/` subfolder within the feature folder, not a global `hooks/` directory
- **Error handling**: surface async errors to the user (toast) and `console.error` them; use error boundaries for render errors

## Naming

- **Event handlers**: props use `on*` (`onClose`); internal handlers use `handle*` (`handleClose`)
- **Booleans**: prefix with `is`, `has`, or `should` (`isLoading`, `hasError`)
- **Constants**: `UPPER_SNAKE_CASE`; use `Record<EnumType, string>` for enum-like label maps
- **Props interfaces**: `[ComponentName]Props`, defined immediately above the component, exported if callers need it

## UI components

- **Prefer Palette** (`Box`, `Text`, `Flex`, `Button`, ...) over custom styled components; if the repo has a local `DesignSystem` wrapper, prefer that over raw Palette
- **Use Palette style props** (`p`, `m`, `color`, `bg`) over the `style` prop or Styled Components when possible
- **Use the `mono` scale** for black/white (`mono0` not `"white"`, `mono100` not `"black"`) — these adapt to dark mode

## GraphQL / Relay

- Keep fragment definitions close to the components that use them
- **Fragment naming**: `ComponentName_fieldName` (e.g. `EmailCampaignEditor_partner`)
- **`@connection` keys**: `ComponentName_parentField_connectionField`
- **`@refetchable` queries**: `ComponentNamePaginationQuery` (paginated) / `ComponentNameRefetchQuery` (refetchable)
- **Pagination**: `usePaginationFragment` for paginated data, `useFragment` otherwise
- **Connections**: always unwrap with `extractNodes`, never access `.edges` manually

## Mutations

- **Naming**: file and hook are `use[Action]` (e.g. `useUpdateArtwork`); the GraphQL operation appends `Mutation` (`useUpdateArtworkMutation`)
- **Return a named domain function** (`return { updateArtwork, isMutating }`) instead of exposing the raw submit function
- Handle the Success/Failure (`...OrError`) union pattern in the mutation definition
- Use the repo's standard mutation hook where one exists (see the repo's `CLAUDE.md`)

## File structure

- **Avoid index files**: no `index.ts(x)` re-export barrels — they hurt refactoring and auto-imports
- **Helpers**: shared or non-trivial helpers go in a `utils` subfolder next to the feature; trivial component-only helpers live below the component in the same file
