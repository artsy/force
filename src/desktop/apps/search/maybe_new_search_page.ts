module.exports = (req, _res, next) => {
  const shouldShowNewPage =
    req.user && req.user.hasLabFeature("New Search Results")

  if (shouldShowNewPage) {
    return next("route")
  } else {
    return next()
  }
}
