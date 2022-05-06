import qs from "qs"
// eslint-disable-next-line no-restricted-imports
import request from "superagent"
import { some } from "lodash"
import { Request } from "express"
import { isV6Format } from "./ip"
import { getENV } from "v2/Utils/getENV"

const METAPHYSICS_ENDPOINT = getENV("METAPHYSICS_ENDPOINT")
const REQUEST_ID = getENV("REQUEST_ID")
const API_REQUEST_TIMEOUT = getENV("API_REQUEST_TIMEOUT")

const resolveIPv4 = function (ipAddress) {
  if (isV6Format(ipAddress) != null && ipAddress.indexOf("::ffff") >= 0) {
    ipAddress.split("::ffff:")[1]
  }
  return ipAddress
}

const resolveProxies = function (req) {
  const ipAddress = resolveIPv4(req.connection.remoteAddress)
  const hasHeaders = req && req.headers && req.headers["x-forwarded-for"]
  if (hasHeaders) {
    return req.headers["x-forwarded-for"] + ", " + ipAddress
  } else {
    return ipAddress
  }
}

interface ArtsyRequet extends Request {
  id?: string
  user?: any
}

interface MetaphysicsRequest {
  query: string
  variables?: any
  req?: ArtsyRequet
  method?: string
}

// FIXME: return value is typed any
export const metaphysics = function (
  { query, variables, req }: MetaphysicsRequest = {} as MetaphysicsRequest
): any {
  const sentRequestId = REQUEST_ID || req?.id || "implement-me"
  return new Promise(function (resolve, reject) {
    const post = request
      .post(METAPHYSICS_ENDPOINT)
      .set("Accept", "application/json")
      .set("X-Request-Id", sentRequestId)
      .timeout(API_REQUEST_TIMEOUT)

    const token =
      (req?.user?.get && req?.user?.get("accessToken")) ||
      req?.user?.accessToken
    const remoteAddress = req?.connection?.remoteAddress

    if (token) {
      post.set({ "X-ACCESS-TOKEN": token })
      post.set({ "X-USER-ID": req.user.id })
    }

    if (remoteAddress) {
      post.set("X-Forwarded-For", resolveProxies(req))
    }

    post
      .send({
        query,
        variables,
      })
      .end(function (err, response) {
        if (err != null) {
          return reject(err)
        }

        if (response.body.errors != null) {
          const error = new Error(JSON.stringify(response.body.errors))
          const isNotFound = some(response.body.errors, ({ message }) =>
            message.match(/Not Found/)
          )
          if (isNotFound) {
            // @ts-ignore
            error.status = 404
          }
          // @ts-ignore
          error.data = response.body.data
          return reject(error)
        }

        return resolve(response.body.data)
      })
  })
}

export const debug = function (req, res, send) {
  if (req.query.query != null) {
    const get = { query: send.query, variables: JSON.stringify(send.variables) }

    res.redirect(`${METAPHYSICS_ENDPOINT}?${qs.stringify(get)}`)

    return true
  }
}
