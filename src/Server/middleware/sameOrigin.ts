import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

/**
 * Makes sure that artsy.net cannot be embedded elsewhere
 */
export function sameOriginMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  if (!res.headersSent) {
    res.set("X-Frame-Options", "SAMEORIGIN")
  }

  next()
}
