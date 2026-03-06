/**
 * Route error handling for @principalField queries.
 *
 * found-relay only passes errors to routes that define a `render` function.
 * Routes without one silently swallow @principalField errors and return
 * HTTP 200 with blank content.
 *
 * For simple routes, this is handled automatically: `buildAppRoutes` injects
 * `defaultErrorRender` on any route with a `query` but no custom `render`.
 * Routes with custom render functions must call `renderRouteError()` manually.
 *
 * See docs/error-handling.md for the full error handling architecture.
 */
import { Spacer } from "@artsy/palette"
import { ErrorPage } from "Components/ErrorPage"
import { updateContext } from "Server/context"
import type { Match } from "found"

export interface RenderArgs {
  Component?: React.ComponentType<any>
  props?: Record<string, any>
  match: Match
  error?: { status?: number; data?: any } | null
}

/**
 * Handles a route-level error by setting the HTTP status code and rendering
 * an ErrorPage. Use this in route render functions that check the `error` arg.
 *
 * Returns JSX if there's an error (caller should return it), or null if no error.
 */
export function renderRouteError(
  error: RenderArgs["error"],
): React.JSX.Element | null {
  if (!error) return null

  const status = error.status || 500
  updateContext("statusCode", status)
  return (
    <>
      <Spacer y={4} />
      <ErrorPage code={status} />
    </>
  )
}

/**
 * Default render function for routes with @principalField queries.
 *
 * Automatically injected by `buildAppRoutes` on routes that have a `query`
 * but no custom `render` function. You generally don't need to use this
 * directly -- it's only exported for use by the router infrastructure.
 */
export function defaultErrorRender({
  Component,
  props,
  error,
}: RenderArgs): React.JSX.Element | undefined {
  if (error) return renderRouteError(error)!

  if (!(Component && props)) return undefined

  return <Component {...props} />
}
