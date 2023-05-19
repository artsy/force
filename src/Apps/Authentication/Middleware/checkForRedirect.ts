import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { isStaticAuthRoute } from "./isStaticAuthRoute"
import { sanitizeRedirect } from "Utils/sanitizeRedirect"

export const checkForRedirect = ({
  req,
  res,
}: {
  req: ArtsyRequest
  res: ArtsyResponse
}) => {
  const { parse } = require("url")

  let referrer = parse(req.get("Referrer") || "").path || "/"

  const isStaticAuth = isStaticAuthRoute({ req })

  const redirectTo =
    req.query["redirectTo"] ||
    req.body["redirect-to"] ||
    req.query["redirect-to"] ||
    req.query["redirect_uri"] ||
    (!isStaticAuth ? referrer : undefined)

  let newRedirect: string | undefined

  if (["/reset_password", "/user/delete"].includes(redirectTo)) {
    newRedirect = "/"
  } else if (!!redirectTo) {
    newRedirect = sanitizeRedirect(redirectTo)
  }

  res.locals.sd.AUTHENTICATION_REDIRECT_TO = newRedirect

  return { req, res, redirectTo: newRedirect }
}
