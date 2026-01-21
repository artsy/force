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

interface RenderArgs {
  Component?: React.ComponentType<any>
  props?: Record<string, any>
  match: Match
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

  return ({ Component, props, match }: RenderArgs) => {
    if (!Component || !props) return

    const entity = props[entityName] as { slug: string } | null | undefined

    // Redirect to canonical slug if URL param doesn't match
    if (entity?.slug && entity.slug !== match.params[paramName]) {
      // Preserve query string and hash from original URL
      const search = match.location?.search || ""
      const hash = match.location?.hash || ""
      throw new RedirectException(
        `${basePath}/${entity.slug}${search}${hash}`,
        301,
      )
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
    // Preserve query string and hash from original URL
    const search = match.location?.search || ""
    const hash = match.location?.hash || ""
    throw new RedirectException(
      `${basePath}/${entity.slug}${search}${hash}`,
      301,
    )
  }
}
