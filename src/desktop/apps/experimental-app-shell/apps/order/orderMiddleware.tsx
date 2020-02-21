import { getPageType } from "../../utils/getPageType"

export const orderMiddleware = (req, res, next) => {
  const { pageType } = getPageType(req)

  if (pageType === "orders") {
    if (!res.locals.sd.CURRENT_USER) {
      return res.redirect(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
    }
  }

  next()
}
