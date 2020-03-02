import { getPageType } from "./getPageType"

const USER_REQUIRED_PAGES = [
  "orders",
  "identity-verification",
  "auction-registration",
  "auction-registration2",
]

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
