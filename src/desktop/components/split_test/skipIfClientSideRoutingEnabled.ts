export const skipIfClientSideRoutingEnabled = (_req, res, next) => {
  // Remove once A/B test completes
  if (res.locals.sd.CLIENT_NAVIGATION_V5 === "experiment") {
    return next("route")
  }
  return next()
}
