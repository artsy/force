import { getENV } from "v2/Utils/getENV"

export function redirectPostAuth({ req, res }) {
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
    redirectURL.origin !== getENV("APP_URL")
  ) {
    redirectURL = new URL("/", getENV("APP_URL"))
  }

  res.redirect(redirectURL.href)
}
