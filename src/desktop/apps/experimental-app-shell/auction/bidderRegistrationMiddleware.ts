export const bidderRegistrationMiddleware = (req, res, next) => {
  const pageParts = req.path.split("/")
  const pageType = pageParts[1]
  console.log(req.params)

  if (
    pageType === "auction-registration" ||
    pageType === "auction-registration2"
  ) {
    /**
     * If this request is from a registration modal (trying to create a bidder),
     * defer to the auction_support app router.
     *
     * @see Force: src/desktop/apps/auction_support/index.coffee
     */
    if (req.query["accepted-conditions"] === "true") {
      const newUrl = req.url.replace(
        "/auction-registration/",
        "/auction-registration-modal/"
      )
      return res.redirect(newUrl)
    } else if (!res.locals.sd.CURRENT_USER) {
      return res.redirect(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
    }
  }

  next()
}
