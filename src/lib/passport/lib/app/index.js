// @ts-check
//
// Sets up the express application to be mounted. Includes mounting
// Artsy flow related callbacks like sending people to / after signup,
// throwing edge case errors that our API returns, and more.
//

const express = require("express")
const csrf = require("csurf")
const passport = require("passport")
const app = express()
const opts = require("../options")
const {
  onLocalLogin,
  onLocalSignup,
  beforeSocialAuth,
  afterSocialAuth,
  onError,
  ssoAndRedirectBack,
} = require("./lifecycle")
const { denyBadLogoutLinks, logout } = require("./logout")
const { headerLogin, trustTokenLogin } = require("./token_login")
const addLocals = require("./locals")

module.exports = function () {
  // Mount passport and ensure CSRF protection across GET requests
  app.use(passport.initialize(), passport.session())
  app.get("*", csrf({ cookie: true }))

  // Local email/password auth
  app.post(
    opts.loginPagePath,
    csrf({ cookie: true }),
    onLocalLogin,
    ssoAndRedirectBack
  )
  app.post(opts.signupPagePath, onLocalSignup, onLocalLogin, ssoAndRedirectBack)

  // Apple OAuth
  app.get(opts.applePath, beforeSocialAuth("apple"))
  app.post(opts.appleCallbackPath, afterSocialAuth("apple"), ssoAndRedirectBack)

  // Facebook OAuth
  app.get(opts.facebookPath, beforeSocialAuth("facebook"))
  app.get(
    opts.facebookCallbackPath,
    afterSocialAuth("facebook"),
    ssoAndRedirectBack
  )

  // Google OAuth
  app.get(opts.googlePath, beforeSocialAuth("google"))
  app.get(
    opts.googleCallbackPath,
    afterSocialAuth("google"),
    ssoAndRedirectBack
  )

  // Logout middleware
  app.get(opts.logoutPath, denyBadLogoutLinks, logout)
  app.delete(opts.logoutPath, logout)

  // Convenience middleware for token login and locals like sd.CURRENT_USER
  app.use(headerLogin, trustTokenLogin, addLocals, onError)

  // Return the app
  return app
}
