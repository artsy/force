import { Router, Response, Request, NextFunction } from "express"
import { fetchQuery } from "react-relay"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { ENABLE_FAIR_ORGANIZER_REDIRECT } from "lib/config"
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
    const { shortcut } = await fetchQuery<RedirectsShortcutsQuery>(
      relayEnvironment,
      REDIRECTS_SHORTCUTS_QUERY,
      { id: short }
    )

    res.redirect(301, shortcut.long)
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
    const { profile } = await fetchQuery<RedirectsProfileQuery>(
      relayEnvironment,
      REDIRECTS_PROFILE_QUERY,
      { id: req.params.id }
    )

    res.locals.profile = profile
    res.locals.tab = req.params.tab

    next()
  } catch {
    next()
  }
}

export const handlePartner = (
  req: Request,
  res: ResWithProfile,
  next: NextFunction
) => {
  if (res.locals.profile?.owner.__typename !== "Partner") return next()

  const partnerSlug = res.locals.profile.owner.slug

  if (!partnerSlug || !req.path) return next()

  const href: string = `/partner${req.path.replace(req.params.id, partnerSlug)}`

  // /:id/overview => /partner/:id
  // /:id/about => /partner/:id
  if (req.route.path === "/:id/overview" || req.route.path === "/:id/about") {
    return res.redirect(301, `/partner/${partnerSlug}`)
  }

  // /:id/collection => /partner/:id/works
  // /:id/shop => /partner/:id/works
  if (req.route.path === "/:id/collection" || req.route.path === "/:id/shop") {
    return res.redirect(301, `/partner/${partnerSlug}/works`)
  }

  // /:id/artist/:artistId => /partner/:id/artists/:artistId
  if (req.route.path === "/:id/artist/:artistId" && req.params?.artistId) {
    return res.redirect(
      301,
      `/partner/${partnerSlug}/artists/${req.params.artistId}`
    )
  }

  return res.redirect(301, href)
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
  // Shortcuts
  .get("/:short", handleShort)

  // Fetch profile for remaining routes
  .get(["/:id", "/:id/:tab*"], handleProfile)

  // Partners
  .get(
    [
      "/:id",
      "/:id/overview",
      "/:id/about",
      "/:id/shows",
      "/:id/works",
      "/:id/collection",
      "/:id/shop",
      "/:id/artists",
      "/:id/artist/:artistId",
      "/:id/articles",
      "/:id/contact",
    ],
    handlePartner
  )

  // Fairs
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
      "/:id/browse/artworks",
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

export { redirectsServerRoutes }
