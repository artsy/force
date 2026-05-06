import express from "express"
import type { ErrorRequestHandler, RequestHandler } from "express"
import passport from "passport"
import opts from "../options"
import { setCampaign, trackLogin, trackSignup } from "./analytics"
import {
  afterSocialAuth,
  beforeSocialAuth,
  onError,
  onLocalLogin,
  onLocalSignup,
  ssoAndRedirectBack,
} from "./lifecycle"
import addLocals from "./locals"
import { denyBadLogoutLinks, logout } from "./logout"
import { headerLogin, trustTokenLogin } from "./token_login"

import csrf from "csurf"

const app = express()
const middleware = (handler: unknown) => handler as RequestHandler
const errorMiddleware = (handler: unknown) => handler as ErrorRequestHandler

//
// Sets up the express application to be mounted. Includes mounting
// Artsy flow related callbacks like sending people to / after signup,
// throwing edge case errors that our API returns, and more.
//
const setupApp = () => {
  // Mount passport and ensure CSRF protection across GET requests
  app.use(passport.initialize(), passport.session())
  app.get("*", csrf({ cookie: true }))

  // Local email/password auth
  app.post(
    opts.loginPagePath,
    csrf({ cookie: true }),
    middleware(onLocalLogin),
    middleware(trackLogin),
    middleware(ssoAndRedirectBack),
  )
  app.post(
    opts.signupPagePath,
    csrf({ cookie: true }),
    middleware(setCampaign),
    middleware(onLocalSignup),
    middleware(onLocalLogin),
    middleware(trackSignup("email")),
    middleware(ssoAndRedirectBack),
  )

  // Apple OAuth
  app.get(
    opts.applePath,
    middleware(setCampaign),
    middleware(beforeSocialAuth("apple")),
  )
  app.post(
    opts.appleCallbackPath,
    middleware(afterSocialAuth("apple")),
    middleware(trackSignup("apple")),
    middleware(ssoAndRedirectBack),
  )

  // Facebook OAuth
  app.get(
    opts.facebookPath,
    middleware(setCampaign),
    middleware(beforeSocialAuth("facebook")),
  )
  app.get(
    opts.facebookCallbackPath,
    middleware(afterSocialAuth("facebook")),
    middleware(trackSignup("facebook")),
    middleware(ssoAndRedirectBack),
  )

  // Google OAuth
  app.get(
    opts.googlePath,
    middleware(setCampaign),
    middleware(beforeSocialAuth("google")),
  )
  app.get(
    opts.googleCallbackPath,
    middleware(afterSocialAuth("google")),
    middleware(trackSignup("google")),
    middleware(ssoAndRedirectBack),
  )

  // Google One Tap
  app.post(
    opts.googleOneTapCallbackPath,
    middleware(afterSocialAuth("google_one_tap")),
    middleware(trackSignup("google_one_tap")),
    middleware(ssoAndRedirectBack),
  )

  // Logout middleware
  app.get(opts.logoutPath, middleware(denyBadLogoutLinks), middleware(logout))
  app.delete(opts.logoutPath, middleware(logout))

  // Convenience middleware for token login and locals like sd.CURRENT_USER
  app.use(
    middleware(headerLogin),
    middleware(trustTokenLogin),
    middleware(addLocals),
    errorMiddleware(onError),
  )

  // Return the app
  return app
}

export default setupApp

module.exports = setupApp
