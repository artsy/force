import { getPageType } from "./getPageType"

const userRequiredPages = ["orders", "identity-verification"]

export const userRequiredMiddleware = (req, res, next) => {
  const { pageType } = getPageType(req)

  // if this page is not in the userRequiredPages, require user
  if (userRequiredPages.includes(pageType)) {
    if (!res.locals.sd.CURRENT_USER) {
      return res.redirect(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
    }
  }

  next()
}
