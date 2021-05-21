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
  if (req.route.path === "/:id/overview") {
    return res.redirect(301, `/partner/${req.params.id}`)
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
