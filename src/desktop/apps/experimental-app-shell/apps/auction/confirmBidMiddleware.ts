import { getPageType } from "../../utils/getPageType"

export const confirmBidMiddleware = (req, res, next) => {
  const { pageType } = getPageType(req)

  if (pageType === "auction") {
    if (!res.locals.sd.CURRENT_USER) {
      return res.redirect(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
    }
  }

  next()
}
