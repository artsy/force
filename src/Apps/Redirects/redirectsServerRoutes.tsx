import { Router, Response, Request, NextFunction } from "express"
import { fetchQuery } from "react-relay"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { ENABLE_FAIR_ORGANIZER_REDIRECT } from "Server/config"
import { REDIRECTS_SHORTCUTS_QUERY } from "./queries/RedirectsShortcutsQuery"
import { RedirectsShortcutsQuery } from "__generated__/RedirectsShortcutsQuery.graphql"
import { REDIRECTS_PROFILE_QUERY } from "./queries/RedirectsProfileQuery"
import { RedirectsProfileQuery } from "__generated__/RedirectsProfileQuery.graphql"

const redirectsServerRoutes = Router()

export interface ResWithProfile extends Response {
  locals: {
    profile: RedirectsProfileQuery["response"]["profile"]
    tab: string
  }
}

export const handleShort = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const short = req.params.short.toLowerCase()

  const relayEnvironment = createRelaySSREnvironment({
    userAgent: req.header("User-Agent"),
  })

  try {
    const data = await fetchQuery<RedirectsShortcutsQuery>(
      relayEnvironment,
      REDIRECTS_SHORTCUTS_QUERY,
      { id: short }
    ).toPromise()

    if (data?.shortcut) return res.redirect(301, data?.shortcut.long)

    next()
  } catch {
    next()
  }
}

export const handleProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const relayEnvironment = createRelaySSREnvironment({
    userAgent: req.header("User-Agent"),
  })

  try {
    const data = await fetchQuery<RedirectsProfileQuery>(
      relayEnvironment,
      REDIRECTS_PROFILE_QUERY,
      { id: req.params.id }
    ).toPromise()

    res.locals.profile = data?.profile
    res.locals.tab = req.params.tab

    next()
  } catch {
    next()
  }
}

export const handlePartnerOverview = (
  req: Request,
  res: ResWithProfile,
  next: NextFunction
) => {
  if (res.locals.profile?.owner.__typename !== "Partner") return next()

  const partnerSlug = res.locals.profile.owner.slug

  if (!partnerSlug || !req.path) return next()

  // /:id/overview => /partner/:id
  // /:id/about => /partner/:id
  return res.redirect(301, `/partner/${partnerSlug}`)
}

export const handlePartnerWorks = (
  req: Request,
  res: ResWithProfile,
  next: NextFunction
) => {
  if (res.locals.profile?.owner.__typename !== "Partner") return next()

  const partnerSlug = res.locals.profile.owner.slug

  if (!partnerSlug || !req.path) return next()

  return res.redirect(301, `/partner/${partnerSlug}/works`)
}

export const handlePartnerArtist = (
  req: Request,
  res: ResWithProfile,
  next: NextFunction
) => {
  if (res.locals.profile?.owner.__typename !== "Partner") return next()

  const partnerSlug = res.locals.profile.owner.slug

  if (!partnerSlug || !req.path) return next()

  return res.redirect(
    301,
    `/partner/${partnerSlug}/artists/${req.params.artistId}`
  )
}

export const handlePartnerGenericRedirect = (
  req: Request,
  res: ResWithProfile,
  next: NextFunction
) => {
  if (res.locals.profile?.owner.__typename !== "Partner") return next()

  const partnerSlug = res.locals.profile.owner.slug

  if (!partnerSlug || !req.path) return next()

  const href: string = `/partner${req.path.replace(req.params.id, partnerSlug)}`
  return res.redirect(301, href)
}

export const handleFairArtworks = (
  req: Request,
  res: ResWithProfile,
  next: NextFunction
) => {
  if (res.locals.profile?.owner.__typename !== "Fair") return next()

  const fairSlug = res.locals.profile.owner.slug

  if (!fairSlug) {
    return res.redirect(302, "/art-fairs")
  }

  return res.redirect(301, `/fair/${fairSlug}/artworks`)
}

export const handleFair = (
  req: Request,
  res: ResWithProfile,
  next: NextFunction
) => {
  if (res.locals.profile?.owner.__typename !== "Fair") return next()

  const fairSlug = res.locals.profile.owner.slug

  if (!fairSlug) {
    return res.redirect(302, "/art-fairs")
  }

  const basePath = `/fair/${fairSlug}`
  return res.redirect(301, basePath)
}

export const handleFairOrganizer = (
  _req: Request,
  res: ResWithProfile,
  next: NextFunction
) => {
  if (!ENABLE_FAIR_ORGANIZER_REDIRECT) {
    return next()
  }

  if (res.locals.profile?.owner.__typename !== "FairOrganizer") return next()

  const fairOrganizerSlug = res.locals.profile.owner.slug

  if (!fairOrganizerSlug) {
    return res.redirect(302, "/art-fairs")
  }

  const basePath = `/fair-organizer/${fairOrganizerSlug}`

  return res.redirect(301, basePath)
}

redirectsServerRoutes
  // Fetch profile for remaining routes
  .get(["/:id", "/:id/:tab*"], handleProfile)

  // Partners

  // /:id/overview => /partner/:id
  // /:id/about => /partner/:id
  .get(["/:id/overview", "/:id/about"], handlePartnerOverview)

  // /:id/collection => /partner/:id/works
  // /:id/shop => /partner/:id/works
  .get(["/:id/collection", "/:id/shop"], handlePartnerWorks)

  // /:id/artist/:artistId => /partner/:id/artists/:artistId
  .get("/:id/artist/:artistId", handlePartnerArtist)

  .get(
    [
      "/:id",
      "/:id/shows",
      "/:id/works",
      "/:id/artists",
      "/:id/articles",
      "/:id/contact",
    ],
    handlePartnerGenericRedirect
  )

  // Fairs

  // /:id/browse/artworks => /fair/:id/artworks
  .get("/:id/browse/artworks", handleFairArtworks)

  .get(
    [
      // Legacy desktop routes
      "/:id",
      "/:id/:year([0-9]{4})",
      "/:id/articles",
      "/:id/browse",
      "/:id/browse/*",
      "/:id/browse/artworks/artworks",
      "/:id/browse/show/:partner_id",
      "/:id/capture",
      "/:id/capture/:action",
      "/:id/for-you",
      "/:id/overview",
      "/:id/programming",
      "/:id/search",
      "/:id/sign_up",
      "/:id/sign_up/:action",

      // Legacy mobile routes
      "/:id/article/:slug",
      "/:id/browse/artist/:artistId",
      "/:id/browse/artists",
      "/:id/browse/booths",
      "/:id/browse/booths/section",
      "/:id/browse/booths/section/:section",
      "/:id/browse/exhibitors",
      "/:id/browse/filter",
      "/:id/browse/show/:partnerId",
      "/:id/feed",
      "/:id/live",
    ],
    handleFair
  )

  // Fair Organziers
  .get("/:id", handleFairOrganizer)

  // Shortcuts
  .get("/:short", handleShort)

export { redirectsServerRoutes }
