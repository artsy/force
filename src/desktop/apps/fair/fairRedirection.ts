export const redirectFairRequests = (req, res, next) => {
  const isFairProfile = res.locals?.profile?.get("owner_type") === "Fair"
  if (!isFairProfile) return next()

  res.redirect(301, redirectPath(req, res))
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
