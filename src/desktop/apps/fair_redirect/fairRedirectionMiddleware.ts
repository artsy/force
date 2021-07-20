import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"

export const fairRedirectionMiddleware = (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
): void => {
  const isFairProfile = res.locals?.profile?.get("owner_type") === "Fair"

  if (!isFairProfile) return next()

  const fairSlug: string | null = res.locals.profile.get("owner")?.id

  if (!fairSlug) {
    return res.redirect(302, "/art-fairs")
  }

  const basePath = `/fair/${fairSlug}`

  // this matches all /:id/info/* requests
  if (req.route.path === "/:id/:tab*" && res.locals.tab === "info") {
    return res.redirect(301, `/fair/${fairSlug}/info`)
  }

  // this matches /:id/browse/artworks, but not /:id/browse/exhibitors
  if (req.route.path === "/:id/browse/*" && req.params["0"] === "artworks") {
    return res.redirect(301, `/fair/${fairSlug}/artworks`)
  }

  return res.redirect(301, basePath)
}
