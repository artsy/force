import * as crypto from "crypto"
// @ts-ignore
import { INTERCOM_BUYER_APP_SECRET } from "../../config"

export function addIntercomUserHash(req, res, next) {
  if (req.user && INTERCOM_BUYER_APP_SECRET) {
    res.locals.sd.INTERCOM_BUYER_HASH = crypto
      .createHmac("sha256", INTERCOM_BUYER_APP_SECRET)
      .update(req.user.get("email"))
      .digest("hex")
  }
  return next()
}
