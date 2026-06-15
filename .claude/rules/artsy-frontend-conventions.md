# Frontend Development Guidelines

> **Precedence:** These are shared frontend conventions, synced from [artsy/claude-config](https://github.com/artsy/claude-config) — don't edit this file here, change it there. The repo's own `CLAUDE.md` always wins: if anything below conflicts with `CLAUDE.md`, or you're unsure which applies, follow `CLAUDE.md`. Repo-specific guidance (commands, paths, state management, tooling) lives in each repo's `CLAUDE.md`.

## Creating Pull Requests

- PR titles must follow format: `type(optional-scope): Description` (allowed types: `fix`, `feat`, `chore`, `build`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`, `revert`)

## Code Style

### Formatting

- **JavaScript/TypeScript**: Double quotes, no semicolons, Biome formatting
- **Ruby**: Standard Ruby style with Standard gem

### JavaScript/TypeScript Patterns

- **No for loops**: Always use functional patterns (map, filter, reduce, some, every, forEach, etc.) instead of for loops
- **Arrow functions**: Prefer arrow functions over `function` declarations for new code
- **Object parameters**: Always use object parameters for functions with multiple arguments. Never use unnamed/positional arguments beyond the first parameter. Similar to how react props work.

  ```tsx
  // ✓ CORRECT - Top level functions use interfaces
  interface UpdateUserParams {
    id: string
    name: string
    email?: string
  }

  const updateUser = ({ id, name, email }: UpdateUserParams) => {
    // ...
  }

  // ✓ CORRECT - Functions inside React components use inline destructuring
  const MyComponent = () => {
    const handleUpdate = ({
      id,
      name,
      email,
    }: {
      id: string
      name: string
      email?: string
    }) => {
      // ...
    }
  }

  // ✓ CORRECT - Single parameter is fine
  const deleteUser = (id: string) => {
    // ...
  }

  // ✗ INCORRECT - Multiple unnamed parameters
  const updateUser = (id: string, name: string, email?: string) => {
    // ...
  }
  ```

- **No nested ternaries**: Always avoid nested ternaries. Complex assignments should always be extracted to a variable or a getter function:

  ```tsx
  const getValue = () => {
    if (foo) {
      return 1
    }
    if (bar) {
      return 2
    }
    return 3
  }
  ```

- **Early exit**: Always exit early — prefer guard clauses over nested conditional blocks

  ```tsx
  // ✓ CORRECT - Early exit with guard clause
  if (!image) {
    return null
  }

  // ... do stuff with image

  // ✗ INCORRECT - Nested conditional block
  if (image) {
    // ... do stuff with image
  }

  return null
  ```

- **CSS**: Styled Components with Artsy Palette design system.
- **Imports**: Prefer absolute imports over relative paths.
- **Types**: TypeScript for all new code, explicit return types on exports

### React & JSX

- **React Components**: Functional components with hooks are preferred. Prop drilling is a normal part of React—feel free to use it. However, consider using context or state management when drilling becomes unwieldy, such as when there are many unrelated layers, not just passing a prop through 2 to 3 components.
- **JSX Returns**:

  ⚠️ **CRITICAL RULE**: **ALWAYS use explicit return statements with curly braces when returning JSX**. Never use implicit/parenthesized returns for JSX, even for simple one-liners or props/render functions. All functions that return JSX must use curly braces and explicit return statements.

  ```tsx
  // ✓ CORRECT - Explicit return with curly braces
  const Component = () => {
    return <div>Content</div>
  }

  // ✓ CORRECT - All render props and functions that return JSX also need explicit returns
  <Button
    renderIcon={(props) => {
      return <Icon {...props} />
    }}
  />

  // ✓ CORRECT - Map functions that return JSX need explicit returns too
  {items.map(item => {
    return <ListItem key={item.id}>{item.name}</ListItem>
  })}

  // ✗ INCORRECT - Implicit return without curly braces
  const Component = () => <div>Content</div>

  // ✗ INCORRECT - Implicit return in arrow function props
  <Button renderIcon={(props) => <Icon {...props} />} />

  // ✗ INCORRECT - Implicit return with parentheses
  const Component = () => (
    <div>Content</div>
  )

  // ✗ INCORRECT - Implicit return in map function
  {items.map(item => <ListItem key={item.id}>{item.name}</ListItem>)}
  ```

  This is a zero-tolerance rule. All new code must follow this pattern without exception.

- **No components inside components**: Never define a React component inside another component's function body. Extract it to the module's top level or to its own file. Components defined inside other components are re-created on every render, losing state and hurting performance.
- **One component per file**: Each component should live in its own file. The only exception is small, simple helper components that are exclusively used by the main component in that file — in that case, the main (primary) component must be defined first, with the helpers below it.
- **Custom hooks location**: Co-locate hooks near the feature that uses them in a `hooks/` subfolder within the feature folder. Don't put all hooks in a global `hooks/` directory. Only move the hook to the global `hooks/` directory if it's used in multiple features.
- **Error Handling**: Surface async errors to the user via a toast and log them with `console.error`. Use error boundaries in React for render errors.
- **Skeleton Components**: After design updates, look for the corresponding skeleton components and adjust them if needed.

### Naming

- **Event handlers**: Props use `on*` naming (`onClose`, `onToggle`). Internal handlers use `handle*` (`handleClose`, `handleToggle`).
- **Booleans**: Prefix boolean variables and props with `is`, `has`, or `should` (`isLoading`, `hasError`, `shouldApplyBrandKit`).
- **Constants**: Use `UPPER_SNAKE_CASE` for constants. Use `Record<EnumType, string>` for enum-like label maps.
- **Props interfaces**: Name them `[ComponentName]Props`. Define the interface immediately above the component. Export it if callers need the type.

## UI Components

- **Prefer Palette over custom styling**: Use Palette or DesignSystem components (`Box`, `Text`, `Flex`, `Button`, etc.) rather than writing custom styled components.
- **Prefer a local DesignSystem wrapper over Palette**: When your app has a component in its own DesignSystem, use it instead of the equivalent from Artsy Palette.
- **Avoid the `style` prop if possible**: Use Palette's style props (e.g. `p`, `m`, `color`, `bg`) over the `style` prop or Styled Components if possible
- **Use `mono` scale for black/white colors**: Prefer `mono0` over `"white"` and `mono100` over `"black"` — these adapt to dark mode, hardcoded names don't.

## GraphQL/Relay

- We use Relay.js for our graphql layer
- Use `useClientQuery` instead of `useLazyLoadQuery` for data fetching
- Keep fragment definitions close to components that use them
- **Fragment naming**: Follow the `ComponentName_fieldName` pattern (e.g. `EmailCampaignEditor_partner`, `CatalogApp_partner`).
- **`@connection` key naming**: Use `ComponentName_parentField_connectionField` (e.g. `@connection(key: "ListDetailApp_partner_filterArtworksConnection")`).
- **`@refetchable` query naming**: Use `ComponentNamePaginationQuery` for paginated fragments and `ComponentNameRefetchQuery` for refetchable fragments.
- **Pagination**: Use `usePaginationFragment` for paginated data — it returns `{ data, loadNext, hasNext, isLoadingNext, refetch }`. Use `useFragment` for non-paginated fragments.
- **Connections**: Always use `extractNodes` to unwrap connection edges/nodes rather than accessing `.edges` manually.

## Mutations

- **ALWAYS use the `useSystemMutation` hook for new mutations**. This provides automatic type inference and standardized error handling.
- **Mutation hook naming**: Name the file and exported hook `use[Action]` (e.g. `useUpdateArtwork`). Name the GraphQL operation `use[Action]Mutation` — append a `Mutation` suffix to the hook name (e.g. `mutation useUpdateArtworkMutation(...)`).
- **Mutation hook return value**: Return a named domain function instead of exposing `submitMutation` directly. Example: `return { updateArtwork, isMutating }` where `updateArtwork` calls `submitMutation` internally.
- Example usage:

  ```tsx
  import { graphql } from "react-relay"
  import { useSystemMutation } from "mutations/useSystemMutation"
  import type { useCreateWidgetMutation } from "z__generated__/useCreateWidgetMutation.graphql"

  export const useCreateWidget = () => {
    const { submitMutation, isMutating } = useSystemMutation<useCreateWidgetMutation>(graphql`
      mutation useCreateWidgetMutation($input: CreateWidgetInput!) {
        createWidget(input: $input) {
          createWidgetOrError {
            __typename
            ... on CreateWidgetSuccess {
              result {
                id
              }
            }
            ... on CreateWidgetFailure {
              mutationError {
                message
              }
            }
          }
        }
      }
    `)

    const createWidget = (input: CreateWidgetInput) => submitMutation({ variables: { input } })

    return { createWidget, isMutating }
  }
  ```

- Automatically handles Success/Failure union types (OrError pattern)
- No need for manual type extraction with `Extract<>` utility types
- Extract connection nodes with `extractNodes`

## File Structure

- **Avoid index files**: Do NOT create `index.ts` or `index.tsx` files that re-export multiple components/modules. They lead to refactoring nightmares, increase noise in the file structure, and interfere with VSCode's auto-import functionality.

## Helper Methods

- **Shared or non-trivial helpers**: Put them in a helper file under a `utils` subfolder next to the feature.
- **Simple, component-only helpers**: Define them below the component declaration in the same file when they are only used by that component and are not worth extracting.
