export const skipIfClientSideRoutingEnabled = (_req, res, next) => {
  return next("route")
}
