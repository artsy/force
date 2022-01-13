export function redirectPostAuth({ req, res }) {
  const redirectTo = req.query["redirectTo"]

  const configuredAllowedHosts =
    process.env.AUTH_REDIRECT_ALLOWED_HOSTS?.split(",") || []

  // verify that this is a *.artsy.net domain
  const allowedHosts = configuredAllowedHosts.filter(url => {
    if (url === "localhost" && process.env.NODE_ENV === "development")
      return true

    const splitHostname = url.split(".")
    splitHostname.shift()
    return splitHostname.join(".") === "artsy.net"
  })

  let redirectURL = new URL(redirectTo)

  if (!allowedHosts.includes(redirectURL.hostname)) {
    redirectURL = new URL("/", res.locals.sd.APP_URL)
  }

  res.redirect(redirectURL.href)
}
