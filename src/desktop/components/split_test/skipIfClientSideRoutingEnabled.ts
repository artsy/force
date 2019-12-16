export const skipIfClientSideRoutingEnabled = (_req, res, next) => {
  if (
    process.env.EXPERIMENTAL_APP_SHELL &&
    res.locals.sd.CLIENT_SIDE_ROUTING === "experiment"
  ) {
    return next("route")
  } else {
    return next()
  }
}
