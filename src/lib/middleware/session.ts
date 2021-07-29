import type { RequestHandler } from "express"

import session from "cookie-session"
import {
  COOKIE_DOMAIN,
  NODE_ENV,
  SESSION_COOKIE_KEY,
  SESSION_COOKIE_MAX_AGE,
  SESSION_SECRET,
} from "../../config"

export function sessionMiddleware(): RequestHandler {
  return session({
    secret: SESSION_SECRET,
    domain: process.env.NODE_ENV === "development" ? "" : COOKIE_DOMAIN,
    name: SESSION_COOKIE_KEY,
    maxAge: SESSION_COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production" || NODE_ENV === "staging",
    httpOnly: false,
  })
}
