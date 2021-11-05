export const isStaticAuthRoute = ({ req }) => {
  const { parse } = require("url")
  const pathname = req.path || parse(req.url || "").pathname
  const isStaticAuthRoute = [
    "/log_in",
    "/login",
    "/sign_up",
    "/signup",
  ].includes(pathname)
  return isStaticAuthRoute
}
