import type { RequestHandler } from "express"

import session from "cookie-session"
import config from "../../config"

const {
  COOKIE_DOMAIN,
  NODE_ENV,
  SESSION_COOKIE_KEY,
  SESSION_COOKIE_MAX_AGE,
  SESSION_SECRET,
} = config

export function sessionMiddleware(): RequestHandler {
  return session({
    domain: process.env.NODE_ENV === "development" ? "" : COOKIE_DOMAIN,
    httpOnly: false,
    maxAge: SESSION_COOKIE_MAX_AGE,
    name: SESSION_COOKIE_KEY,
    secret: SESSION_SECRET,
    secure: process.env.NODE_ENV === "production" || NODE_ENV === "staging",
  })
}
