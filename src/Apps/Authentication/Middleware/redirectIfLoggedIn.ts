import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { checkForRedirect } from "./checkForRedirect"
import { isStaticAuthRoute } from "./isStaticAuthRoute"

export const redirectIfLoggedIn = ({
  req,
  res,
}: {
  req: ArtsyRequest
  res: ArtsyResponse
}) => {
  if (!req.user) {
    return
  }

  const isStaticAuth = isStaticAuthRoute({ req })
  if (isStaticAuth) {
    req.query["redirect-to"] = req.query["redirect-to"] || "/"
  }

  const { redirectTo } = checkForRedirect({ req, res })

  if (!redirectTo) {
    return
  }

  res.redirect(redirectTo)
}
