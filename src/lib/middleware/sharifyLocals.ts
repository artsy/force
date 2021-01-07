import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { parse } from "url"

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

  next()
}
