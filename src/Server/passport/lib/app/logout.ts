import type { NextFunction } from "express"
import type { PassportRequest, PassportResponse } from "../types"

import { parse } from "url"
import { requestGravity } from "../http"
import opts from "../options"
import forwardedFor from "./forwarded_for"
import redirectBack from "./redirectBack"

//
// Logout helpers.
//
const isArtsyReferrer = (referrer?: string) => {
  const hostname = parse(referrer || "").hostname

  return hostname === "artsy.net" || hostname?.endsWith(".artsy.net")
}

export const denyBadLogoutLinks = (
  req: PassportRequest,
  _res: PassportResponse,
  next: NextFunction,
) => {
  if (isArtsyReferrer(req.get("Referrer"))) {
    return next()
  }
  next(new Error("Malicious logout link."))
}

export const logout = async (
  req: PassportRequest,
  res: PassportResponse,
  _next: NextFunction,
) => {
  const accessToken = req.user != null ? req.user.accessToken : undefined
  req.logout()
  ;(req as unknown as { session: null }).session = null
  await requestGravity({
    headers: {
      "X-Access-Token": accessToken,
      "X-Forwarded-For": forwardedFor(req),
    },
    method: "DELETE",
    url: `${opts.ARTSY_URL}/api/v1/access_token`,
  }).catch(() => {})

  if (req.xhr) {
    return res.status(200).send({ msg: "success" })
  } else {
    return redirectBack(req, res)
  }
}
