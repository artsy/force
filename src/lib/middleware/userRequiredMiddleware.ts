import { match } from "path-to-regexp"

const USER_REQUIRED_ROUTES = [
  "/identity-verification(.*)",
  "/orders(.*)",
  "/user/conversations(.*)",
  "/user/purchases(.*)",
  "/user/payments",
  "/user/shipping",
  "/user/alerts",
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
