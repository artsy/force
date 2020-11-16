import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

export function downcaseMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  const url = req._parsedUrl

  if (url.pathname.includes("/browse/booths/section/")) {
    next()
  } else if (/[A-Z]/.test(url.pathname)) {
    res.redirect(301, url.pathname.toLowerCase() + (url.search || ""))
  } else {
    next()
  }
}
