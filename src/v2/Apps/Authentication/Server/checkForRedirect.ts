import { isStaticAuthRoute } from "./isStaticAuthRoute"

export const checkForRedirect = ({ req, res }) => {
  const { parse } = require("url")
  let referrer = parse(req.get("Referrer") || "").path || "/"
  const isStaticAuth = isStaticAuthRoute({ req })
  const redirectTo =
    req.query["redirectTo"] ||
    req.body["redirect-to"] ||
    req.query["redirect-to"] ||
    req.query["redirect_uri"] ||
    (!isStaticAuth ? referrer : undefined)

  let newRedirect
  if (redirectTo === ("/reset_password2" || "/user/delete")) {
    newRedirect = "/"
  } else {
    newRedirect = redirectTo
  }

  res.locals.sd.AUTHENTICATION_REDIRECT_TO = newRedirect

  return { req, res }
}
