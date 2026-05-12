/**
 * Middleware functions that help control what happens before and after
 * logging in or signing up.
 */

import { parse, resolve } from "url"
import artsyXapp from "@artsy/xapp"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import opts from "Server/passport/lib/options"
import type { NextFunction } from "express"
import { get, isFunction, isString } from "lodash"
import passport from "passport"
import { type GravityError, requestGravity } from "../http"
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

export const onLocalSignup = async (
  req: Req,
  res: ArtsyResponse,
  next: NextFunction,
) => {
  req.artsyPassportSignedUp = true
  try {
    await requestGravity({
      body: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        sign_up_intent: req.body.signupIntent,
        sign_up_referer: req.body.signupReferer,
        accepted_terms_of_service: req.body.accepted_terms_of_service,
        agreed_to_receive_emails: req.body.agreed_to_receive_emails,
        recaptcha_token: req.body.recaptcha_token,
      },
      headers: {
        "X-Xapp-Token": artsyXapp.token,
        "X-Forwarded-For": forwardedFor(req),
        "User-Agent": req.get("user-agent"),
        Referer: req.get("referer"),
      },
      method: "POST",
      url: `${opts.ARTSY_URL}/api/v1/user`,
    })

    return next()
  } catch (error) {
    const err = error as GravityError
    const msg = signupErrorMessage(err)

    if (msg === "Email is invalid.") {
      if (req.xhr) {
        return res.status(403).send({ success: false, error: msg })
      } else {
        return res.redirect(`${opts.signupPagePath}?error=${msg}`)
      }
    } else if (err && req.xhr) {
      return res.status(500).send({ success: false, error: msg })
    } else if (err) {
      return next(new Error(err as any))
    }
  }
}

const signupErrorMessage = (err: GravityError) => {
  const { body } = err.response ?? {}

  if (isString(body?.error)) {
    return body.error
  }

  if (isString(body?.message)) {
    return body.message
  }

  if (isString(body?.error_description)) {
    return body.error_description
  }

  if (isString(err.message)) {
    return err.message
  }

  return ""
}

type Provider = "facebook" | "apple" | "google" | "google-one-tap"
const UNKNOWN_AUTH_ERROR = "An unknown error occurred. Please try again."

const ONE_TAP_SUPPRESS_COOKIE = "g_one_tap_suppress"
const ONE_TAP_SUPPRESS_DURATION_MS = 30 * 60 * 1000

const suppressOneTapPrompt = (provider: Provider, res: ArtsyResponse) => {
  if (provider === "google-one-tap") {
    res.cookie(ONE_TAP_SUPPRESS_COOKIE, "1", {
      maxAge: ONE_TAP_SUPPRESS_DURATION_MS,
    })
  }
}
const SOCIAL_LOGIN_TWO_FACTOR_AUTH_ERROR =
  "Please log in with email and password to use two-factor authentication."
const SOCIAL_LINKING_TWO_FACTOR_AUTH_ERROR =
  "Social account linking is not available while two-factor authentication is enabled on your Artsy account."

const redirectWithQuery = (
  path: string,
  params: Record<string, string | undefined>,
) => {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      query.set(key, value)
    }
  })

  return `${path}?${query.toString()}`
}

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
        suppressOneTapPrompt(provider, res)
        return res.redirect(
          redirectWithQuery(redirectPath, {
            email: req.socialProfileEmail,
            error_code: "ALREADY_EXISTS",
            provider,
          }),
        )
      }

      if (err?.response?.body?.error === "User Already Exists") {
        // Provider account previously linked to Artsy.
        // Log in to your Artsy account via email and password and link the provider in your settings instead.
        // Redirect back to login page.
        suppressOneTapPrompt(provider, res)
        return res.redirect(
          redirectWithQuery(redirectPath, {
            error_code: "PREVIOUSLY_LINKED_SETTINGS",
            provider,
          }),
        )
      }

      if (err?.response?.body?.error === "Another Account Already Linked") {
        // Provider account previously linked to Artsy. Redirect back to settings page.
        suppressOneTapPrompt(provider, res)
        return res.redirect(
          redirectWithQuery(redirectPath, {
            error_code: "PREVIOUSLY_LINKED",
            provider,
          }),
        )
      }

      if (err?.message?.match("Unauthorized source IP address")) {
        // Your IP address was blocked by the provider. Redirect back to login page.
        suppressOneTapPrompt(provider, res)
        return res.redirect(
          redirectWithQuery(redirectPath, {
            error_code: "IP_BLOCKED",
            provider,
          }),
        )
      }

      if (err != null) {
        const message = extractError(err)

        if (message.includes("missing two-factor authentication code")) {
          suppressOneTapPrompt(provider, res)
          return res.redirect(
            redirectWithQuery(redirectPath, {
              error: SOCIAL_LOGIN_TWO_FACTOR_AUTH_ERROR,
              error_code: "TWO_FACTOR_AUTHENTICATION_REQUIRED",
              provider,
            }),
          )
        }

        if (
          message.includes(
            "Unable to link third-party authentication if account has Artsy two-factor authentication enabled",
          )
        ) {
          suppressOneTapPrompt(provider, res)
          return res.redirect(
            redirectWithQuery(redirectPath, {
              error: SOCIAL_LINKING_TWO_FACTOR_AUTH_ERROR,
              error_code: "TWO_FACTOR_AUTHENTICATION_ENABLED",
              provider,
            }),
          )
        }

        // Unknown error. Redirect back to login page. Do not show error message to user; log to console.
        console.warn(`Error authenticating with ${provider}: ${message}`)
        suppressOneTapPrompt(provider, res)
        return res.redirect(
          redirectWithQuery(redirectPath, {
            error: UNKNOWN_AUTH_ERROR,
            error_code: "UNKNOWN",
          }),
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

export const ssoAndRedirectBack = async (
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
    parsed = parse(resolve(opts.APP_URL as string, parsed.path || ""))
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

  try {
    const sres = await requestGravity({
      headers: {
        "X-Access-Token": req.user.accessToken,
        "X-Forwarded-For": forwardedFor(req),
      },
      method: "POST",
      url: `${opts.ARTSY_URL}/api/v1/me/trust_token`,
    })

    const params = new URLSearchParams({
      redirect_uri: parsed.href,
      trust_token: sres.body.trust_token,
    })

    res.redirect(`${opts.ARTSY_URL}/users/sign_in?${params.toString()}`)
  } catch {
    return res.redirect(parsed.href)
  }
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
