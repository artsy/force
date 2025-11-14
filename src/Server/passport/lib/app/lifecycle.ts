/**
 * Middleware functions that help control what happens before and after
 * logging in or signing up.
 */

import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import opts from "Server/passport/lib/options"
import artsyXapp from "@artsy/xapp"
import type { NextFunction } from "express"
import { get, isFunction, isString } from "lodash"
import passport from "passport"
// biome-ignore lint/style/noRestrictedImports: Server authentication setup
import request from "superagent"
import { parse, resolve } from "url"
import forwardedFor from "./forwarded_for"
import redirectBack from "./redirectBack"

interface Req extends ArtsyRequest {
  artsyPassportSignedUp?: boolean
  socialProfileEmail?: string
}

export const onLocalLogin = (
  req: Req,
  res: ArtsyResponse,
  next: NextFunction,
) => {
  if (req.user && !req.xhr) {
    return next()
  }

  passport.authenticate("local-with-otp")(req, res, (err: any) => {
    if (req.xhr) {
      if (err) {
        switch (true) {
          case err.message?.includes("invalid email or password"): {
            return res.status(401).send({ success: false, error: err.message })
          }
          case err.message?.includes(
            "missing two-factor authentication code",
          ): {
            return res.status(401).send({ success: false, error: err.message })
          }
          case err.message?.includes(
            "invalid two-factor authentication code",
          ): {
            return res.status(401).send({ success: false, error: err.message })
          }
          case err.message?.includes(
            "account locked, try again in a few minutes",
          ): {
            return res.status(403).send({ success: false, error: err.message })
          }
          case err.message?.includes("Unexpected token"): {
            return res.status(500).send({
              success: false,
              error: "An error occurred. Please try again.",
            })
          }
          default: {
            return res.status(500).send({ success: false, error: err.message })
          }
        }
      } else {
        return next()
      }
    } else {
      if (
        err &&
        err.response &&
        err.response.body &&
        err.response.body.error_description === "invalid email or password"
      ) {
        return res.redirect(
          `${opts.loginPagePath}?error=Invalid email or password.`,
        )
      } else if (err) {
        return next(err)
      } else {
        return next()
      }
    }
  })
}

export const onLocalSignup = (
  req: Req,
  res: ArtsyResponse,
  next: NextFunction,
) => {
  req.artsyPassportSignedUp = true
  request
    .post(`${opts.ARTSY_URL}/api/v1/user`)
    .set({
      "X-Xapp-Token": artsyXapp.token,
      "X-Forwarded-For": forwardedFor(req),
      "User-Agent": req.get("user-agent"),
      Referer: req.get("referer"),
    })
    .send({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      sign_up_intent: req.body.signupIntent,
      sign_up_referer: req.body.signupReferer,
      accepted_terms_of_service: req.body.accepted_terms_of_service,
      agreed_to_receive_emails: req.body.agreed_to_receive_emails,
      recaptcha_token: req.body.recaptcha_token,
    })
    .end((err, _sres) => {
      let msg = ""
      if (err && err.message === "Email is invalid.") {
        msg = "Email is invalid."
        if (req.xhr) {
          return res.status(403).send({ success: false, error: msg })
        } else {
          return res.redirect(`${opts.signupPagePath}?error=${msg}`)
        }
      } else if (err && req.xhr) {
        if (
          err &&
          err.response &&
          err.response.body &&
          err.response.body.error
        ) {
          msg = err.response.body.error
        } else if (
          err &&
          err.response &&
          err.response.body &&
          err.response.body.message
        ) {
          msg = err.response.body.message
        } else if (err.message) {
          msg = err.message
        }
        return res.status(500).send({ success: false, error: msg })
      } else if (err) {
        return next(new Error(err))
      } else {
        return next()
      }
    })
}

type Provider = "facebook" | "apple" | "google"

export const beforeSocialAuth =
  (provider: Provider) =>
  (req: Req, res: ArtsyResponse, next: NextFunction) => {
    let options

    req.session.redirectTo = req.query["redirect-to"]
    req.session.skipOnboarding = req.query["skip-onboarding"]
    req.session.sign_up_intent = req.query["signup-intent"]
    req.session.sign_up_referer = req.query["signup-referer"]
    // accepted_terms_of_service and agreed_to_receive_emails use underscores
    req.session.accepted_terms_of_service =
      req.query["accepted_terms_of_service"]
    req.session.agreed_to_receive_emails = req.query["agreed_to_receive_emails"]

    if (provider === "apple") {
      options = {}
    } else if (provider === "google") {
      options = { scope: ["email", "profile"] }
    } else {
      options = { scope: "email" }
    }
    passport.authenticate(provider, options)(req, res, next)
  }

export const afterSocialAuth =
  (provider: Provider) =>
  (req: Req, res: ArtsyResponse, next: NextFunction) => {
    if (req.query.denied) {
      return next(new Error(`${provider} denied`))
    }

    // Determine if we're linking the account and handle any Gravity errors
    // that we can do a better job explaining and redirecting for.
    const linkingAccount = req.user != null
    const redirectPath = req.user ? opts.settingsPagePath : opts.loginPagePath

    passport.authenticate(provider)(req, res, (err: any) => {
      if (
        err?.response?.body?.error === "User Already Exists" &&
        req.socialProfileEmail
      ) {
        // A user with the email address <req.socialProfileEmail> already exists.
        // Log in to Artsy via email and password and link ${providerName} in your settings instead.
        // Redirect back to login page.
        return res.redirect(
          `${redirectPath}?error_code=ALREADY_EXISTS&email=${req.socialProfileEmail}&provider=${provider}`,
        )
      }

      if (err?.response?.body?.error === "User Already Exists") {
        // Provider account previously linked to Artsy.
        // Log in to your Artsy account via email and password and link the provider in your settings instead.
        // Redirect back to login page.
        return res.redirect(
          `${redirectPath}?error_code=PREVIOUSLY_LINKED_SETTINGS&provider=${provider}`,
        )
      }

      if (err?.response?.body?.error === "Another Account Already Linked") {
        // Provider account previously linked to Artsy. Redirect back to settings page.
        return res.redirect(
          `${redirectPath}?error_code=PREVIOUSLY_LINKED&provider=${provider}`,
        )
      }

      if (err?.message?.match("Unauthorized source IP address")) {
        // Your IP address was blocked by the provider. Redirect back to login page.
        return res.redirect(
          `${redirectPath}?error_code=IP_BLOCKED&provider=${provider}`,
        )
      }

      if (err != null) {
        const message = extractError(err)

        // Unknown error. Redirect back to login page. Do not show error message to user; log to console.
        return res.redirect(
          `${redirectPath}?error_code=UNKNOWN&error=${message}`,
        )
      }

      if (linkingAccount) {
        // Successful. Redirect back to settings page.
        return res.redirect(opts.settingsPagePath)
      }

      return next()
    })
  }

export const ensureLoggedInOnAfterSignupPage = (
  req: Req,
  res: ArtsyResponse,
  next: NextFunction,
) => {
  const toLogin = `${opts.loginPagePath}?redirect-to=${opts.afterSignupPagePath}`
  if (req.user == null) {
    res.redirect(toLogin)
  }
  next()
}

export const onError = (
  err: Error,
  _req: Req,
  _res: ArtsyResponse,
  next: NextFunction,
) => next(err)

export const ssoAndRedirectBack = (
  req: Req,
  res: ArtsyResponse,
  _next: NextFunction,
) => {
  if (req.xhr) {
    return res.send({
      success: true,
      user: req.user,
    })
  }

  let parsed = parse(redirectBack(req))

  if (!parsed.hostname) {
    parsed = parse(resolve(opts.APP_URL, parsed.path || ""))
  }

  const domain =
    parsed.hostname != null
      ? parsed.hostname.split(".").slice(1).join(".")
      : undefined

  if (domain !== "artsy.net") {
    return redirectBack(req, res)
  }

  delete req.session.redirectTo
  delete req.session.skipOnboarding

  request
    .post(`${opts.ARTSY_URL}/api/v1/me/trust_token`)
    .set({
      "X-Access-Token": req.user.accessToken,
      "X-Forwarded-For": forwardedFor(req),
    })
    .end((err, sres) => {
      if (err) {
        return res.redirect(parsed.href)
      }
      res.redirect(
        `${opts.ARTSY_URL}/users/sign_in` +
          `?trust_token=${sres.body.trust_token}` +
          `&redirect_uri=${parsed.href}`,
      )
    })
}

export const extractError = (err: unknown): string => {
  if (isString(err)) {
    return err
  }

  const response = get(err, "response.body.message", null)
  if (isString(response)) {
    return response
  }

  const message = get(err, "message", null)
  if (isString(message)) {
    return message
  }

  if (err instanceof Error) {
    return err.message
  }

  if (isFunction((err as any)?.toString)) {
    return (err as any).toString()
  }

  return "Unknown error"
}
