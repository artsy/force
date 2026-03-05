import { Spacer } from "@artsy/palette"
import { ErrorPage } from "Components/ErrorPage"
import { updateContext } from "Server/context"
import { RedirectException } from "found"
import type { Match } from "found"

interface CanonicalSlugRedirectConfig {
  /** The entity field name in the props (e.g., "artist", "gene", "partner") */
  entityName: string
  /** The param name from the route (e.g., "artistID", "slug", "partnerId") */
  paramName: string
  /** The base path for the redirect URL (e.g., "/artist", "/gene", "/partner") */
  basePath: string
}

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
 * Creates a render function that redirects to the canonical slug if the URL
 * param doesn't match the entity's canonical slug.
 *
 * This ensures old or alternate slugs redirect to the current canonical slug
 * with a 301 permanent redirect.
 *
 * @example
 * ```typescript
 * // In artistRoutes.tsx
 * {
 *   path: "/artist/:artistID",
 *   render: canonicalSlugRedirect({
 *     entityName: "artist",
 *     paramName: "artistID",
 *     basePath: "/artist",
 *   }),
 *   query: graphql`
 *     query artistRoutes_ArtistAppQuery($artistID: String!) @cacheable {
 *       artist(id: $artistID) @principalField {
 *         slug  # Required for canonical redirect
 *         ...ArtistApp_artist
 *       }
 *     }
 *   `,
 * }
 * ```
 */
export function canonicalSlugRedirect(config: CanonicalSlugRedirectConfig) {
  const { entityName, paramName, basePath } = config

  return ({ Component, props, match, error }: RenderArgs) => {
    const errorPage = renderRouteError(error)
    if (errorPage) return errorPage

    if (!Component || !props) return

    const entity = props[entityName] as { slug: string } | null | undefined
    const paramValue = match.params[paramName]

    // Redirect to canonical slug if URL param doesn't match
    if (entity?.slug && entity.slug !== paramValue) {
      // Preserve the full path structure (including subpaths), query string, and hash
      const pathname = match.location?.pathname || `${basePath}/${paramValue}`
      const newPathname = pathname.replace(paramValue, entity.slug)
      const search = match.location?.search || ""
      const hash = match.location?.hash || ""
      throw new RedirectException(`${newPathname}${search}${hash}`, 301)
    }

    return <Component {...props} />
  }
}

/**
 * Checks if a redirect to canonical slug is needed and throws RedirectException if so.
 * Use this when you need to add canonical slug redirect logic to an existing
 * render function that has additional logic.
 *
 * @example
 * ```typescript
 * // In partnerRoutes.tsx - composing with existing render logic
 * render: ({ Component, props, match }) => {
 *   if (!(Component && props)) return
 *
 *   const { partner } = props as any
 *   if (!partner) return
 *
 *   // Check for canonical slug redirect first
 *   checkForCanonicalSlugRedirect({
 *     entity: partner,
 *     paramValue: match.params.partnerId,
 *     basePath: "/partner",
 *     match,
 *   })
 *
 *   // Continue with additional route-specific logic...
 *   if (!partner.displayFullPartnerPage) {
 *     throw new RedirectException(`/partner/${match.params.partnerId}`, 302)
 *   }
 *
 *   return <Component {...props} />
 * }
 * ```
 */
export function checkForCanonicalSlugRedirect(config: {
  entity: { slug: string } | null | undefined
  paramValue: string
  basePath: string
  match: Match
}): void {
  const { entity, paramValue, basePath, match } = config

  if (entity?.slug && entity.slug !== paramValue) {
    // Preserve the full path structure (including subpaths), query string, and hash
    const pathname = match.location?.pathname || `${basePath}/${paramValue}`
    const newPathname = pathname.replace(paramValue, entity.slug)
    const search = match.location?.search || ""
    const hash = match.location?.hash || ""
    throw new RedirectException(`${newPathname}${search}${hash}`, 301)
  }
}
