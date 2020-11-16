import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

export function escapedFragmentMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  res.locals.sd.INCLUDE_ESCAPED_FRAGMENT = !(
    req.query && Object.keys(req.query).length > 0
  )
  next()
}
