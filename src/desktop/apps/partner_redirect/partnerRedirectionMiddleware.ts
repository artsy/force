import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"

export const partnerRedirectionMiddleware = (
  req: Partial<ArtsyRequest>,
  res: Partial<ArtsyResponse>,
  next: NextFunction
) => {
  if (!res.locals?.profile?.isPartner() || !res.redirect) return next()

  const partnerSlug: string | null = res.locals.profile.get("owner")?.id

  if (!partnerSlug || !req.path) return next()

  const href: string = `/partner${req.path.replace(req.params.id, partnerSlug)}`

  // /:id/overview -> /partner/:id
  // /:id/about -> /partner/:id
  if (req.route.path === "/:id/overview" || req.route.path === "/:id/about") {
    return res.redirect(301, `/partner/${partnerSlug}`)
  }

  // /:id/collection -> /partner/:id/works
  // /:id/shop -> /partner/:id/works
  if (req.route.path === "/:id/collection" || req.route.path === "/:id/shop") {
    return res.redirect(301, `/partner/${partnerSlug}/works`)
  }

  // /:id/artist/:artistId -> /partner/:id/artists/:artistId
  if (req.route.path === "/:id/artist/:artistId" && req.params?.artistId) {
    return res.redirect(
      301,
      `/partner/${partnerSlug}/artists/${req.params.artistId}`
    )
  }

  return res.redirect(301, href)
}
