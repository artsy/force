# Error Handling Architecture

This document describes Force's two-tier error boundary system and how route-level errors are handled.

## Problem

When a route's `@principalField` query returns a 404, the error previously escaped the React tree, and Express rendered `LayoutLogoOnly` (just the Artsy mark). No NavBar, no footer, no search. The only way to keep browsing was the browser back button.

## Two-Tier Error Boundary

Force uses two error boundaries so that most errors render inside the normal layout with nav and footer preserved.

```
Boot.tsx
|
+-- ErrorBoundary (outer)
|   |   Catches: chunk load failures, Layout crashes.
|   |   Replaces entire page. Last resort.
|   |
|   +-- Providers -> Router -> AppShell
|       |
|       +-- Layout (NavBar + footer)
|           |
|           +-- ContentErrorBoundary (inner)
|               |   Catches: component crashes, HttpErrors.
|               |   Only replaces content area. Nav stays.
|               |   Resets on pathname change.
|               |
|               +-- Route content
```

### Outer ErrorBoundary (Boot.tsx)

The last-resort boundary. Catches errors that escape the layout entirely:

- Chunk load failures (`AsyncChunkLoadError`) -- triggers a full page reload
- Layout/NavBar crashes

When this boundary catches an error, the full page is replaced with a minimal error screen (no nav).

### Inner ContentErrorBoundary (AppShell.tsx)

The content-area boundary. Wraps route content inside the Layout so that nav and footer are always preserved:

- Catches component crashes during rendering
- Reports errors to Sentry with `content_error_boundary` tag
- Resets automatically on pathname change (SPA navigation)
- Re-throws `AsyncChunkLoadError` to the outer boundary (chunk failures need a full reload)

## Error Flow

```
  @principalField query fails -> HttpError
            |
            v
  found-relay passes error to route render()
            |
     +------+------+
     |              |
  Has error      No error
     |              |
     v              v
  renderRouteError()   <Component {...props} />
  -> ErrorPage          renders inside Layout
  inside Layout              |
  (Nav preserved)      Component crash?
                             |
                        +----+----+
                        No       Yes
                        |         |
                        v         v
                     Works   ContentErrorBoundary
                     fine    catches -> ErrorPage
                             (Nav preserved)
```

## Error Types

| Error type              | Caught by                                 | Nav preserved? | HTTP code |
| ----------------------- | ----------------------------------------- | -------------- | --------- |
| `@principalField` 404   | Route `render()` via `renderRouteError()` | Yes            | 404       |
| Component crash         | `ContentErrorBoundary`                    | Yes            | 200\*     |
| Chunk load failure      | Outer `ErrorBoundary` (bubbled up)        | No             | 200\*     |
| Layout crash            | Outer `ErrorBoundary`                     | No             | 200\*     |
| Unmatched Express route | `errorHandlerMiddleware`                  | No             | 404       |

\*Client-side -- page already delivered.

## Adding Error Handling to a New Route

Error handling for simple routes is **automatic**. `buildAppRoutes` (in `src/System/Router/Utils/buildAppRoutes.tsx`) injects `defaultErrorRender` on any route that has a `query` but no custom `render` function. This means most routes need no extra configuration -- errors from `@principalField` queries are handled out of the box.

You only need to handle errors manually when your route has a **custom `render` function** (which overrides the automatic default).

### Routes with canonical slug redirects

Use `canonicalSlugRedirect()` which handles errors internally:

```tsx
import { canonicalSlugRedirect } from "System/Router/Utils/canonicalSlugRedirect"

{
  path: "/my-route/:slug",
  render: canonicalSlugRedirect({
    entityName: "entity",
    paramName: "slug",
    basePath: "/my-route",
  }),
  query: graphql`...`,
}
```

### Routes with custom render logic

Call `renderRouteError()` at the top of your render function:

```tsx
import { renderRouteError } from "System/Router/Utils/renderRouteError"

{
  render: ({ Component, props, match, error }) => {
    const errorPage = renderRouteError(error)
    if (errorPage) return errorPage

    if (!(Component && props)) return undefined

    // Custom logic here...
    return <Component {...props} />
  },
}
```

## Key Files

| File                                                | Purpose                                               |
| --------------------------------------------------- | ----------------------------------------------------- |
| `src/System/Router/Utils/renderRouteError.tsx`      | `renderRouteError()` and `defaultErrorRender` helpers |
| `src/System/Router/Utils/canonicalSlugRedirect.tsx` | Canonical slug redirect with built-in error handling  |
| `src/System/Components/ContentErrorBoundary.tsx`    | Inner error boundary (preserves nav)                  |
| `src/System/Boot.tsx`                               | Outer error boundary (last resort)                    |
| `src/Apps/Components/AppShell.tsx`                  | Where `ContentErrorBoundary` is mounted               |
