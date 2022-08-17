import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { NODE_ENV } from "Server/config"

/**
 * Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).
 */
export function localsMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  const ua = req.get("user-agent") || ""

  // Cache views if production or staging
  if (NODE_ENV === "production" || NODE_ENV === "staging") {
    res.locals.cache = true
  }

  // TOOD: Determine where/if this is used.
  res.locals.sd.REQUEST_TIMESTAMP = Date.now()
  res.locals.sd.NOTIFICATION_COUNT =
    req.cookies != null ? req.cookies["notification-count"] : undefined
  res.locals.sd.USER_AGENT = res.locals.userAgent = escape(ua)
  res.locals.sd.REQUEST_ID = req.id

  next()
}
