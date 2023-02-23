import { ArtsyRequest } from "Server/middleware/artsyExpress"

export const isStaticAuthRoute = ({ req }: { req: ArtsyRequest }) => {
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
