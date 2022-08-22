import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { APP_URL } from "Server/config"
import { parse } from "url"

/**
 * HSTS allows for a more effective implementation of TLS by ensuring
 * all communication takes place over a secure transport layer on the client side.
 * See https://scotthelme.co.uk/hsts-the-missing-link-in-tls.
 */
export function hstsMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  const protocol = req.get("X-Forwarded-Proto") || req.protocol
  if (protocol === "https" && parse(APP_URL).protocol === "https:") {
    if (!res.headersSent) {
      res.set("Strict-Transport-Security", "max-age=31536000")
    }
  }
  next()
}
