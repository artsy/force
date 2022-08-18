import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { APP_URL } from "Server/config"
import { parse } from "url"

/**
 * Makes sure that any http requests get redirected to https
 */
export function ensureSslMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  const protocol = req.get("X-Forwarded-Proto") || req.protocol
  if (protocol !== "https" && parse(APP_URL).protocol === "https:") {
    res.redirect(301, APP_URL + req.url)
  } else {
    next()
  }
}
