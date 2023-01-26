import { checkForRedirect } from "./checkForRedirect"
import { isStaticAuthRoute } from "./isStaticAuthRoute"

export function redirectIfLoggedIn({ req, res }) {
  if (!req.user) {
    return
  }

  const isStaticAuth = isStaticAuthRoute({ req })
  if (isStaticAuth) {
    req.query["redirect-to"] = req.query["redirect-to"] || "/"
  }

  const { redirectTo } = checkForRedirect({ req, res })

  res.redirect(redirectTo)
}
