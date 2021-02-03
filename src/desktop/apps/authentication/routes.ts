import { stitch } from "@artsy/stitch"
import { ModalType } from "v2/Components/Authentication/Types"
import {
  computeCopy,
  computeStitchOptions,
  getRedirectTo,
  isStaticAuthRoute,
} from "./routeHelpers"

export const index = async (req, res, next) => {
  let type: ModalType

  switch (req.path) {
    case "/signup":
      type = ModalType.signup
      break
    case "/sign_up":
      type = ModalType.signup
      break
    case "/forgot":
      type = ModalType.forgot
      break
    default:
      type = ModalType.login
      break
  }

  let pageTitle = ""
  switch (type) {
    case ModalType.login:
      pageTitle = "Login to Artsy"
      break
    case ModalType.signup:
      pageTitle = "Signup for Artsy"
      break
    case ModalType.forgot:
      pageTitle = "Reset your password"
      break
  }

  const { action, kind, objectId, intent } = req.query

  const copy = computeCopy(req, intent, pageTitle, type, res)
  const redirectTo = getRedirectTo(req)
  const destination = req.query.destination || (isStaticAuthRoute && "/")
  const signupReferer = req.header("Referer") || req.hostname

  if (action) {
    res.cookie("afterSignUpAction", JSON.stringify({ action, kind, objectId }))
  }

  try {
    const options = computeStitchOptions(
      pageTitle,
      copy,
      destination,
      redirectTo,
      signupReferer,
      type,
      req,
      res
    )

    const layout = await stitch(options)
    res.send(layout)
  } catch (error) {
    next(error)
  }
}

export const resetPassword = (req, res) => {
  if (req.query.reset_password_token) {
    req.session.reset_password_token = req.query.reset_password_token
    req.session.set_password = req.query.set_password
    req.session.reset_password_redirect_to =
      req.query.reset_password_redirect_to
    res.redirect("/reset_password")
  } else {
    res.locals.sd.RESET_PASWORD_REDIRECT_TO =
      req.session.reset_password_redirect_to
    res.render("reset_password", {
      reset_password_token: req.session.reset_password_token,
      set_password: req.session.set_password,
    })
  }
}

export const redirectLoggedInHome = (req, res, next) => {
  if (req.user) {
    const isStaticAuth = isStaticAuthRoute(req)
    if (isStaticAuth) {
      req.query["redirect-to"] = req.query["redirect-to"] || "/"
    }
    res.redirect(getRedirectTo(req))
  } else {
    next()
  }
}
