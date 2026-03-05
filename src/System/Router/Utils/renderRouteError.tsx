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
 * found-relay only passes `error` to a route's `render` function — routes
 * without one silently swallow errors and return HTTP 200 with blank content.
 * Add this as `render: defaultErrorRender` to any route with @principalField
 * that doesn't need custom render logic.
 */
export function defaultErrorRender({
  Component,
  props,
  error,
}: RenderArgs): React.JSX.Element | undefined {
  const errorPage = renderRouteError(error)
  if (errorPage) return errorPage

  if (!(Component && props)) return undefined

  return <Component {...props} />
}
