import { parse } from "url"
import useragent from "useragent"

export const unsupportedBrowserCheck = (req, res, next) => {
  const ua = useragent.parse(req.headers["user-agent"])
  if (!res.locals.sd.BROWSER) {
    res.locals.sd.BROWSER = ua
  }
  if (
    req.path !== "/unsupported-browser" &&
    isUnsupported(ua, req) &&
    !/\/unsupported-browser|assets|fonts|images/.test(req.path)
  ) {
    res.locals.sd.UNSUPPORTED_BROWSER_REDIRECT = getRedirectTo(req)
    return res.redirect("/unsupported-browser")
  }
  next()
}

export const isUnsupported = (ua, req) => {
  return (
    !req.cookies.continue_with_bad_browser &&
    ((ua.family === "IE" && ua.major <= 11) ||
      (ua.family === "Safari" && ua.major <= 10))
  )
}

export const getRedirectTo = req => {
  return (
    req.body["redirect-to"] ||
    req.query["redirect-to"] ||
    req.query["redirect_uri"] ||
    parse(req.get("Referrer") || "").path ||
    "/"
  )
}
