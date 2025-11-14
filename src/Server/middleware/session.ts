import type { RequestHandler } from "express"

import {
  COOKIE_DOMAIN,
  NODE_ENV,
  SESSION_COOKIE_KEY,
  SESSION_COOKIE_MAX_AGE,
  SESSION_LOCAL_INSECURE,
  SESSION_SECRET,
} from "Server/config"
import session from "cookie-session"

export function sessionMiddleware(): RequestHandler {
  return session({
    secret: SESSION_SECRET,
    domain: process.env.NODE_ENV === "development" ? "" : COOKIE_DOMAIN,
    name: SESSION_COOKIE_KEY,
    maxAge: SESSION_COOKIE_MAX_AGE,
    secure:
      (NODE_ENV === "production" || NODE_ENV === "staging") &&
      SESSION_LOCAL_INSECURE !== true,
    httpOnly: false,
  })
}
