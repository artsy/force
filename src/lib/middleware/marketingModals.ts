import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import { find } from "lodash"
const JSONPage = require("../../desktop/components/json_page/index.coffee")

export function marketingModalsMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  let slug
  if (!(slug = req.query["m-id"])) {
    res.locals.sd.MARKETING_SIGNUP_MODALS = []
    next()
  } else {
    const page = new JSONPage({ name: "marketing-signup-modals" })
    page
      .get()
      .then(function (data) {
        // Used by desktop
        res.locals.sd.MARKETING_SIGNUP_MODALS = data.modals

        const modalData = find(data.modals, { slug })
        if (modalData) {
          res.locals.modal = modalData
        }
        const loggedOut = req.user == null
        if (loggedOut && modalData != null && res.locals.sd.IS_MOBILE) {
          res.locals.showMarketingSignupModal = true
        }

        next()
      })
      .catch(next)
  }
}
