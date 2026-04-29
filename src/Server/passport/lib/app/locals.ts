import type { NextFunction } from "express"
import type { PassportRequest, PassportResponse } from "../types"

import pick from "lodash/pick"
import { escapeHTML } from "underscore.string"
import opts from "../options"

const addLocals = (
  req: PassportRequest,
  res: PassportResponse,
  next: NextFunction,
) => {
  if (req.user) {
    res.locals.user = req.user
    if (res.locals.sd != null) {
      res.locals.sd.CURRENT_USER = req.user
    }
  }
  if (res.locals.sd != null) {
    res.locals.csrfToken =
      typeof req.csrfToken === "function" ? req.csrfToken() : undefined
    res.locals.sd.CSRF_TOKEN = res.locals.csrfToken
  }
  if (res.locals.sd != null) {
    res.locals.error = escapeHTML(req.query.error as string)
    res.locals.sd.ERROR = res.locals.error
  }
  if (res.locals.sd != null) {
    res.locals.ap = pick(
      opts,
      "applePath",
      "appleCallbackPath",
      "facebookPath",
      "facebookCallbackPath",
      "googlePath",
      "googleCallbackPath",
      "loginPagePath",
      "signupPagePath",
      "settingsPagePath",
      "afterSignupPagePath",
      "logoutPath",
    )
    res.locals.sd.AP = res.locals.ap
  }
  next()
}

export default addLocals

module.exports = addLocals
