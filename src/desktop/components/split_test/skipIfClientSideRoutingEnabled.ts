export const skipIfClientSideRoutingEnabled = (_req, res, next) => {
  if (res.locals.sd.CLIENT_NAVIGATION_V3 === "experiment") {
    return next("route")
  } else {
    return next()
  }
}
