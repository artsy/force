import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"

export const partnerRedirectionMiddleware = (
  req: Partial<ArtsyRequest>,
  res: Partial<ArtsyResponse>,
  next: NextFunction
) => {
  if (!res.locals?.profile?.isPartner() || !res.redirect) return next()

  const href: string | null = `/partner${req.path}`

  // /:id/overview -> /partner/:id
  // /:id/about -> /partner/:id
  if (req.route.path === "/:id/overview" || req.route.path === "/:id/about") {
    return res.redirect(301, `/partner/${req.params.id}`)
  }

  // /:id/collection -> /partner/:id/works
  // /:id/shop -> /partner/:id/works
  if (req.route.path === "/:id/collection" || req.route.path === "/:id/shop") {
    return res.redirect(301, `/partner/${req.params.id}/works`)
  }

  // /:id/artist/:artistId -> /partner/:id/artists/:artistId
  if (req.route.path === "/:id/artist/:artistId" && req.params?.artistId) {
    return res.redirect(
      301,
      `/partner/${req.params.id}/artists/${req.params.artistId}`
    )
  }

  return res.redirect(301, href)
}
