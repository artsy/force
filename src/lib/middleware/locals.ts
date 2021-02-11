import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { string } from "underscore"
import moment from "moment"
import * as helpers from "../template_helpers"
import config from "../../config"
import * as templateModules from "../../desktop/lib/template_modules"

const { NODE_ENV } = config

/**
 * Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).
 */
export function localsMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  const ua = req.get("user-agent") || ""

  // Attach libraries to locals, many of these are used in jade templates
  res.locals._s = string //
  res.locals.moment = moment
  res.locals.helpers = helpers
  for (let key in templateModules) {
    const helper = templateModules[key]
    res.locals[key] = helper
  }

  // Cache views if production or staging
  if (NODE_ENV === "production" || NODE_ENV === "staging") {
    res.locals.cache = true
  }

  // HTML class middleware used by mobile
  res.locals.htmlClass = ""
  if (ua.match(/Artsy-Mobile/)) {
    res.locals.htmlClass += " layout-artsy-mobile-app"
  }
  if (req.user != null) {
    res.locals.htmlClass += " layout-logged-in"
  }

  res.locals.sd.REFLECTION = ua.match("Artsy/Reflection") != null
  // TOOD: Determine where/if this is used.
  res.locals.sd.REQUEST_TIMESTAMP = Date.now()
  res.locals.sd.NOTIFICATION_COUNT =
    req.cookies != null ? req.cookies["notification-count"] : undefined
  res.locals.sd.USER_AGENT = res.locals.userAgent = escape(ua)
  res.locals.sd.REQUEST_ID = req.id

  next()
}
