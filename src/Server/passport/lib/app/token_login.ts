import type { NextFunction } from "express"
import type { PassportRequest, PassportResponse } from "../types"

import qs from "querystring"
import isEmpty from "lodash/isEmpty"
import omit from "lodash/omit"
import { requestGravity } from "../http"
import forwardedFor from "./forwarded_for"

import opts from "../options"

//
// Middleware to allow log in by passing x-access-token in the headers or
// trust_token in the query params.
//
export const headerLogin = (
  req: PassportRequest,
  _res: PassportResponse,
  next: NextFunction,
) => {
  if (req.path === opts.logoutPath) {
    return next()
  }

  const token = req.get("X-Access-Token") || req.query.access_token

  if (token) {
    return req.login({ accessToken: token as string }, next)
  } else {
    return next()
  }
}

export const trustTokenLogin = async (
  req: PassportRequest,
  res: PassportResponse,
  next: NextFunction,
) => {
  const token = req.query.trust_token
  if (token == null) {
    return next()
  }

  const settings = {
    grant_type: "trust_token",
    client_id: opts.ARTSY_ID,
    client_secret: opts.ARTSY_SECRET,
    code: token,
  }

  try {
    const response = await requestGravity({
      body: settings,
      headers: { "X-Forwarded-For": forwardedFor(req) },
      method: "POST",
      url: `${opts.ARTSY_URL}/oauth2/access_token`,
    })

    if (!response.ok) {
      return next()
    }

    const user = { accessToken: response.body.access_token }

    req.login(user, err => {
      if (err != null) {
        return next()
      }

      let path = req.url.split("?")[0]
      const params = omit(req.query, "trust_token")

      if (!isEmpty(params)) {
        path += `?${qs.stringify(params)}`
      }

      res.redirect(path)
    })
  } catch {
    return next()
  }
}
