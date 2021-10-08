import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { ENABLE_FAIR_ORGANIZER_REDIRECT } from "../../../config"

export const fairOrganizerRedirectionMiddleware = (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
): void => {
  if (!ENABLE_FAIR_ORGANIZER_REDIRECT) {
    return next()
  }

  const isFairOrganizerProfile =
    res.locals?.profile?.get("owner_type") === "FairOrganizer"

  if (!isFairOrganizerProfile) return next()

  const fairOrganizerSlug: string | null = res.locals.profile.get("owner")?.id

  if (!fairOrganizerSlug) {
    return res.redirect(302, "/art-fairs")
  }

  const basePath = `/fair-organizer/${fairOrganizerSlug}`

  return res.redirect(301, basePath)
}
