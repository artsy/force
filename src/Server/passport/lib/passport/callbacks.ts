import artsyXapp from "@artsy/xapp"
import ip from "ip"
import extend from "lodash/extend"
import {
  requestGravity,
  type GravityError,
  type GravityResponse,
} from "../http"
import type { OAuthProfile, PassportDone, PassportRequest } from "../types"

import opts from "../options"

//
// Passport.js callbacks.
// These are functions that run after an OAuth flow, or after submitting a
// username/password form to login, signup, or link an account.
//

interface AccessTokenParams extends Record<string, unknown> {
  apple_uid?: string
  email?: string
  id_token?: string
  name?: string | null
  oauth_token?: string
  provider?: string
}

interface DecodedAppleIdToken {
  email?: string
  sub?: string
}

const resolveIPv4 = (ipAddress: string) => {
  if (ip.isV6Format(ipAddress) != null && ipAddress.indexOf("::ffff") >= 0) {
    return ipAddress.split("::ffff:")[1]
  }
  return ipAddress
}

const resolveProxies = (req: PassportRequest) => {
  const ipAddress = resolveIPv4(req.connection.remoteAddress)
  if (req && req.headers && req.headers["x-forwarded-for"]) {
    return `${req.headers["x-forwarded-for"]}, ${ipAddress}`
  }
  return ipAddress
}

const isHtmlResponse = (res?: GravityResponse) => {
  return /^\s*(<!doctype html|<html)\b/i.test(res?.text ?? "")
}

const genericAuthErrorMessage = (res?: GravityResponse) => {
  const status = res?.status != null ? ` (Error ${res.status})` : ""

  return `We couldn’t log you in. Please try again.${status}`
}

export const local = (
  req: PassportRequest,
  username: string,
  password: string,
  otp: string | null,
  done?: PassportDone,
) => {
  const payload: Record<string, unknown> = {
    client_id: opts.ARTSY_ID,
    client_secret: opts.ARTSY_SECRET,
    grant_type: "credentials",
    email: username,
    password,
  }

  if (req.body.otpRequired) {
    payload.otp_attempt = otp
  }

  requestGravity({
    body: payload,
    headers: {
      "User-Agent": req.get("user-agent"),
      ...(req && req.connection && req.connection.remoteAddress
        ? { "X-Forwarded-For": resolveProxies(req) }
        : {}),
    },
    method: "POST",
    url: `${opts.ARTSY_URL}/oauth2/access_token`,
  })
    .then(response => onAccessToken(req, done)(null, response))
    .catch((err: GravityError) => onAccessToken(req, done)(err, err.response))
}

export const facebook = (
  req: PassportRequest,
  token: string,
  refreshToken: string,
  profile: OAuthProfile,
  done?: PassportDone,
) => {
  if (profile && profile.emails && profile.emails[0]) {
    req.socialProfileEmail = profile.emails[0].value
  } else {
    req.socialProfileEmail = undefined
  }
  // Link Facebook account
  if (req.user) {
    return requestGravity({
      body: {
        oauth_token: token,
        access_token: req.user.accessToken,
      },
      headers: { "User-Agent": req.get("user-agent") },
      method: "POST",
      url: `${opts.ARTSY_URL}/api/v1/me/authentications/facebook`,
    })
      .then(() => done!(null, req.user))
      .catch((err: Error) => done!(err, req.user))
    // Login or signup with Facebook
  } else {
    requestGravity({
      body: {
        client_id: opts.ARTSY_ID,
        client_secret: opts.ARTSY_SECRET,
        grant_type: "oauth_token",
        oauth_token: token,
        oauth_provider: "facebook",
      },
      headers: {
        "User-Agent": req.get("user-agent"),
        ...(req && req.connection && req.connection.remoteAddress
          ? { "X-Forwarded-For": resolveProxies(req) }
          : {}),
      },
      method: "POST",
      url: `${opts.ARTSY_URL}/oauth2/access_token`,
    })
      .then(response =>
        onAccessToken(req, done, {
          oauth_token: token,
          provider: "facebook",
          name: profile != null ? profile.displayName : undefined,
        })(null, response),
      )
      .catch((err: GravityError) =>
        onAccessToken(req, done, {
          oauth_token: token,
          provider: "facebook",
          name: profile != null ? profile.displayName : undefined,
        })(err, err.response),
      )
  }
}

export const google = (
  req: PassportRequest,
  accessToken: string,
  refreshToken: string,
  profile: OAuthProfile,
  done?: PassportDone,
) => {
  // Link Google account
  if (req.user) {
    return requestGravity({
      body: {
        oauth_token: accessToken,
        access_token: req.user.accessToken,
      },
      headers: { "User-Agent": req.get("user-agent") },
      method: "POST",
      url: `${opts.ARTSY_URL}/api/v1/me/authentications/google`,
    })
      .then(() => done!(null, req.user))
      .catch((err: Error) => done!(err, req.user))
    // Login or signup with Google
  } else {
    requestGravity({
      body: {
        client_id: opts.ARTSY_ID,
        client_secret: opts.ARTSY_SECRET,
        grant_type: "oauth_token",
        oauth_token: accessToken,
        oauth_provider: "google",
      },
      headers: {
        "User-Agent": req.get("user-agent"),
        ...(req && req.connection && req.connection.remoteAddress
          ? { "X-Forwarded-For": resolveProxies(req) }
          : {}),
      },
      method: "POST",
      url: `${opts.ARTSY_URL}/oauth2/access_token`,
    })
      .then(response =>
        onAccessToken(req, done, {
          oauth_token: accessToken,
          provider: "google",
          name: profile != null ? profile.displayName : undefined,
        })(null, response),
      )
      .catch((err: GravityError) =>
        onAccessToken(req, done, {
          oauth_token: accessToken,
          provider: "google",
          name: profile != null ? profile.displayName : undefined,
        })(err, err.response),
      )
  }
}

export const apple = (
  req: PassportRequest,
  idToken: string,
  decodedIdToken: DecodedAppleIdToken,
  accessToken: string,
  refreshToken: string,
  done?: PassportDone,
) => {
  const user = req.appleProfile

  let displayName: string | null = null
  if (user && user.name && user.name.firstName && user.name.lastName) {
    displayName = `${user.name.firstName} ${user.name.lastName}`
  }

  // Link Apple account
  if (req.user) {
    return requestGravity({
      body: {
        name: displayName,
        email: decodedIdToken.email,
        apple_uid: decodedIdToken.sub,
        id_token: idToken,
        oauth_token: accessToken,
        access_token: req.user.accessToken,
      },
      headers: { "User-Agent": req.get("user-agent") },
      method: "POST",
      url: `${opts.ARTSY_URL}/api/v1/me/authentications/apple`,
    })
      .then(() => done!(null, req.user))
      .catch((err: Error) => done!(err, req.user))
  } else {
    requestGravity({
      body: {
        client_id: opts.ARTSY_ID,
        client_secret: opts.ARTSY_SECRET,
        grant_type: "apple_uid",
        name: displayName,
        id_token: idToken,
        email: decodedIdToken.email,
        apple_uid: decodedIdToken.sub,
      },
      headers: {
        "User-Agent": req.get("user-agent"),
        ...(req && req.connection && req.connection.remoteAddress
          ? { "X-Forwarded-For": resolveProxies(req) }
          : {}),
      },
      method: "POST",
      url: `${opts.ARTSY_URL}/oauth2/access_token`,
    })
      .then(response =>
        onAccessToken(req, done, {
          provider: "apple",
          apple_uid: decodedIdToken.sub,
          name: displayName,
          id_token: idToken,
          email: decodedIdToken.email,
        })(null, response),
      )
      .catch((err: GravityError) =>
        onAccessToken(req, done, {
          provider: "apple",
          apple_uid: decodedIdToken.sub,
          name: displayName,
          id_token: idToken,
          email: decodedIdToken.email,
        })(err, err.response),
      )
  }
}

const onAccessToken =
  (
    req: PassportRequest,
    done: PassportDone | undefined,
    params?: AccessTokenParams,
  ) =>
  (err: Error | null, res?: GravityResponse) => {
    // Treat bad responses from Gravity as errors and get the most relavent
    // error message.
    let accessTokenError = err
    let msg: string | undefined
    if (
      (accessTokenError && !(res != null ? res.body : undefined)) ||
      (!accessTokenError && Number(res != null ? res.status : undefined) > 400)
    ) {
      accessTokenError = new Error(genericAuthErrorMessage(res))
    }
    if (
      !accessTokenError &&
      (res != null ? res.body.access_token : undefined) == null
    ) {
      accessTokenError = new Error(
        "Gravity returned no access token and no error",
      )
    }
    if (accessTokenError != null) {
      if (res && res.body && res.body.error_description) {
        msg = res.body.error_description
      } else if (res && res.body && res.body.error) {
        msg = res.body.error
      } else if (isHtmlResponse(res)) {
        msg = genericAuthErrorMessage(res)
      } else if (res && res.text) {
        msg = res.text
      } else if (accessTokenError && accessTokenError.stack) {
        msg = accessTokenError.stack
      } else if (accessTokenError) {
        msg = accessTokenError.toString()
      }

      ;(accessTokenError as { message?: string }).message = msg
    }
    // No errors—create the user from the access token.
    if (!accessTokenError) {
      return done!(null, { accessToken: res!.body.access_token })
      // If there's no user linked to this account, create the user via the POST
      // /user API. Then attempt to fetch the access token again from Gravity and
      // recur back into this onAcccessToken callback.
    } else if (msg!.match("no account linked") != null) {
      if ((req != null ? req.session : undefined) != null && params != null) {
        const {
          sign_up_intent,
          sign_up_referer,
          agreed_to_receive_emails,
          accepted_terms_of_service,
        } = req.session
        extend(params, {
          sign_up_intent,
          sign_up_referer,
          agreed_to_receive_emails,
          accepted_terms_of_service,
        })
      }

      req.artsyPassportSignedUp = true
      return requestGravity({
        body: params,
        headers: {
          Referer: req.get("referer"),
          "User-Agent": req.get("user-agent"),
          "X-Xapp-Token": artsyXapp.token,
        },
        method: "POST",
        url: `${opts.ARTSY_URL}/api/v1/user`,
      })
        .then(() => {
          let auth_params: AccessTokenParams = {}
          if (params!.provider === "apple") {
            auth_params = extend(params, {
              grant_type: "apple_uid",
            })
          } else {
            auth_params = extend(params, {
              grant_type: "oauth_token",
              oauth_provider: params!.provider,
            })
          }

          requestGravity({
            body: extend(auth_params, {
              client_id: opts.ARTSY_ID,
              client_secret: opts.ARTSY_SECRET,
            }),
            headers: {
              "User-Agent": req.get("user-agent"),
              ...(req && req.connection && req.connection.remoteAddress
                ? { "X-Forwarded-For": resolveProxies(req) }
                : {}),
            },
            method: "POST",
            url: `${opts.ARTSY_URL}/oauth2/access_token`,
          })
            .then(response => onAccessToken(req, done, params!)(null, response))
            .catch((err: GravityError) =>
              onAccessToken(req, done, params!)(err, err.response),
            )
        })
        .catch((err: Error) => done!(err))
      // Uncaught Exception.
    } else {
      console.warn(`Error requesting an access token from Artsy '${msg}'`)
      done!(accessTokenError)
    }
  }
