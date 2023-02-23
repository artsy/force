import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { getENV } from "Utils/getENV"

export const redirectPostAuth = ({
  req,
  res,
}: {
  req: ArtsyRequest
  res: ArtsyResponse
}) => {
  const redirectTo = req.query["redirectTo"]

  const configuredAllowedHosts =
    getENV("ALLOWED_REDIRECT_HOSTS")?.split(",") || []

  // verify that this is a *.artsy.net domain
  const allowedHosts = configuredAllowedHosts.filter(url => {
    if (url === "localhost" && getENV("NODE_ENV") === "development") return true

    const splitHostname = url.split(".")
    splitHostname.shift()
    return splitHostname.join(".") === "artsy.net"
  })

  let redirectURL = new URL(redirectTo)

  if (
    !allowedHosts.includes(redirectURL.hostname) &&
    redirectURL.origin !== getENV("APP_URL") &&
    redirectURL.origin !== getENV("API_URL")
  ) {
    redirectURL = new URL("/", getENV("APP_URL"))
  }

  res.redirect(redirectURL.href)
}
