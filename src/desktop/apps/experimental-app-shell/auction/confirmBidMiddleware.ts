export const confirmBidMiddleware = (req, res, next) => {
  const pageParts = req.path.split("/")
  const pageType = pageParts[1]

  if (pageType === "auction") {
    if (!res.locals.sd.CURRENT_USER) {
      return res.redirect(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
    }
  }

  next()
}
