import { stitch } from "@artsy/stitch"
import { ModalType } from "v2/Components/Authentication/Types"
import { data as sd } from "sharify"
import {
  computeStitchOptions,
  getRedirectTo,
  isStaticAuthRoute,
} from "./routeHelpers"

export const login = async (req, res, next) => {
  const type = ModalType.login
  const pageTitle = "Login to Artsy"
  const canonical = `${sd.APP_URL}/login`

  try {
    const options = computeStitchOptions({
      canonical,
      pageTitle,
      req,
      res,
      type,
    })
    const layout = await stitch(options)
    res.send(layout)
  } catch (error) {
    next(error)
  }
}

export const signup = async (req, res, next) => {
  const type = ModalType.signup
  const pageTitle = "Signup for Artsy"
  const canonical = `${sd.APP_URL}/signup`

  try {
    const options = computeStitchOptions({
      canonical,
      pageTitle,
      req,
      res,
      type,
    })
    const layout = await stitch(options)
    res.send(layout)
  } catch (error) {
    next(error)
  }
}

export const forgotPassword = async (req, res, next) => {
  const type = ModalType.forgot
  const pageTitle = "Reset your password"
  const canonical = `${sd.APP_URL}/forgot`

  try {
    const options = computeStitchOptions({
      canonical,
      pageTitle,
      req,
      res,
      type,
    })
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
