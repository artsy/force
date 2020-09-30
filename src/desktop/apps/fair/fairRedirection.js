import { DISABLE_FAIRS_UPDATE_SLUGS, ENABLE_FAIRS_UPDATE } from "../../config"

export const redirectFairRequests = (req, res, next) => {
  // TODO: some time after launch of the updated fairs experience
  // this entire function can be reduced to the res.redirect,
  // sans conditional logic
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
  return !!DISABLE_FAIRS_UPDATE_SLUGS?.split(/\s*,\s*/).includes(req.params.id)
}

const shouldUserSeeNewFairPage = req => {
  const userHasLabFeature = !!req.user?.hasLabFeature("Fairs experience update")
  const featureIsEnabledSitewide = ENABLE_FAIRS_UPDATE

  return userHasLabFeature || featureIsEnabledSitewide
}

const redirectPath = (req, res) => {
  const defaultPath = `/fair/${req.params.id}`

  try {
    // this matches all /:id/info/* requests
    const isInfoRequest =
      req.route.path === "/:id/:tab*" && res.locals.tab === "info"

    // this matches /:id/browse/artworks, but not /:id/browse/exhibitors
    const isBrowseArtworksRequest =
      req.route.path === "/:id/browse/*" && req.params["0"] === "artworks"

    if (isInfoRequest) {
      return `/fair/${req.params.id}/info`
    }

    if (isBrowseArtworksRequest) {
      return `/fair/${req.params.id}/artworks`
    }
  } catch (e) {
    return defaultPath
  }

  return defaultPath
}
