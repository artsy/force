// @ts-ignore
import { DISABLE_FAIRS_UPDATE_SLUGS, ENABLE_FAIRS_UPDATE } from "../../config"

export const redirectFairRequests = (req, res, next) => {
  const isFairProfile = res.locals?.profile?.get("owner_type") === "Fair"
  if (!isFairProfile) return next()

  // TODO: some time after launch of the updated fairs experience
  // this conditional can be reduced to just the res.redirect
  if (shouldRedirectToNewFairPage(req)) {
    res.redirect(301, redirectPath(req, res))
  } else {
    next()
  }
}

const shouldRedirectToNewFairPage = req => {
  if (isNewFairPageDisabledForThisFair(req)) return false
  if (shouldUserSeeNewFairPage(req)) return true

  return false
}

const isNewFairPageDisabledForThisFair = req => {
  // Comes in as `id` via desktop routes and `profileId` via mobile routes
  const fairSlug = req.params.id || req.params.profileId
  return !!DISABLE_FAIRS_UPDATE_SLUGS?.split(/\s*,\s*/).includes(fairSlug)
}

const shouldUserSeeNewFairPage = req => {
  const userHasLabFeature = !!req.user?.hasLabFeature("Fairs experience update")
  const featureIsEnabledSitewide = ENABLE_FAIRS_UPDATE

  return userHasLabFeature || featureIsEnabledSitewide
}

const redirectPath = (req, res) => {
  const fairSlug = res.locals.profile.get("owner")?.id
  const defaultPath = `/fair/${fairSlug}`

  // this matches all /:id/info/* requests
  const isInfoRequest =
    req.route.path === "/:id/:tab*" && res.locals.tab === "info"

  // this matches /:id/browse/artworks, but not /:id/browse/exhibitors
  const isBrowseArtworksRequest =
    req.route.path === "/:id/browse/*" && req.params["0"] === "artworks"

  if (isInfoRequest) {
    return `/fair/${fairSlug}/info`
  }

  if (isBrowseArtworksRequest) {
    return `/fair/${fairSlug}/artworks`
  }

  return defaultPath
}
