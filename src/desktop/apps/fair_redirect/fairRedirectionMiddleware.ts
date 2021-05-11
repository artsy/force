import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"

export const fairRedirectionMiddleware = (
  req: Partial<ArtsyRequest>,
  res: Partial<ArtsyResponse>,
  next: NextFunction
): void => {
  const isFairProfile = res.locals?.profile?.get("owner_type") === "Fair"

  if (!isFairProfile) return next()

  const fairSlug: string | null = res.locals.profile.get("owner")?.id

  if (!fairSlug) {
    // @ts-expect-error STRICT_NULL_CHECK
    return res.redirect(302, "/art-fairs")
  }

  const basePath = `/fair/${fairSlug}`

  // this matches all /:id/info/* requests
  if (req.route.path === "/:id/:tab*" && res.locals.tab === "info") {
    // @ts-expect-error STRICT_NULL_CHECK
    return res.redirect(301, `/fair/${fairSlug}/info`)
  }

  // this matches /:id/browse/artworks, but not /:id/browse/exhibitors
  if (req.route.path === "/:id/browse/*" && req.params["0"] === "artworks") {
    // @ts-expect-error STRICT_NULL_CHECK
    return res.redirect(301, `/fair/${fairSlug}/artworks`)
  }

  // @ts-expect-error STRICT_NULL_CHECK
  return res.redirect(301, basePath)
}
