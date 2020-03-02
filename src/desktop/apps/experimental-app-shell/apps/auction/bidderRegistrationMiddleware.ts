import { getPageType } from "../../utils/getPageType"

export const bidderRegistrationMiddleware = (req, res, next) => {
  const { pageType } = getPageType(req)

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
    }
  }

  next()
}
