import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { parse } from "url"
import artsyXapp from "@artsy/xapp"
import uuid from "node-uuid"

/**
 * Contains the subset of sharify locals that are required for all force routes.
 */
export function sharifyLocalsMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  const ua = req.get("user-agent") || ""

  res.locals.sd.CURRENT_PATH = parse(req.url).pathname
  res.locals.sd.EIGEN = ua.match("Artsy-Mobile") != null

  // Inject some project-wide sharify data such as the session id, the current
  // path and the xapp token.
  res.locals.sd.SESSION_ID =
    req.session != null
      ? req.session.id != null
        ? req.session.id
        : (req.session.id = uuid.v1())
      : undefined
  res.locals.sd.ARTSY_XAPP_TOKEN = artsyXapp.token

  next()
}
