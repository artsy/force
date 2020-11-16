import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import _ from "underscore"
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

        // Used by mobile
        res.locals.sd.MOBILE_MARKETING_SIGNUP_MODALS = data.modals
        const modalData = _.findWhere(data.modals, { slug })
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
