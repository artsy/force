import { match } from "path-to-regexp"

const USER_REQUIRED_ROUTES = [
  "/orders(.*)",
  "/user/conversations(.*)",
  "/settings/purchases(.*)",
  "/settings/payments",
  "/settings/shipping",
  "/settings/alerts",
]

const isRequestRequiringUser = req => {
  return USER_REQUIRED_ROUTES.map(route => match(route)).some(matcher =>
    matcher(req)
  )
}

export const userRequiredMiddleware = (req, res, next) => {
  if (isRequestRequiringUser(req.path)) {
    if (!res.locals.sd.CURRENT_USER) {
      return res.redirect(
        `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
      )
    }
  }

  next()
}
