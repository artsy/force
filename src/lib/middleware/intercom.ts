import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import * as crypto from "crypto"
import config from "../../config"

const { INTERCOM_BUYER_APP_SECRET } = config

export function intercomMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  if (req.user && INTERCOM_BUYER_APP_SECRET) {
    res.locals.sd.INTERCOM_BUYER_HASH = crypto
      .createHmac("sha256", INTERCOM_BUYER_APP_SECRET)
      .update(req.user.get("email"))
      .digest("hex")
  }
  next()
}
