import { getPageType } from "../utils/getPageType"

const USER_REQUIRED_PAGES = ["identity-verification", "orders"]

export const userRequiredMiddleware = (req, res, next) => {
  const { pageType } = getPageType(req)

  if (USER_REQUIRED_PAGES.includes(pageType)) {
    if (!res.locals.sd.CURRENT_USER) {
      return res.redirect(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
    }
  }

  next()
}
