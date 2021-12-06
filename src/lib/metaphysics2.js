/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const qs = require("qs")
const request = require("superagent")
const extend = require("lodash/extend")
const some = require("lodash/some")
const {
  METAPHYSICS_ENDPOINT,
  API_REQUEST_TIMEOUT,
  REQUEST_ID,
} = require("sharify").data
const { isV6Format } = require("./ip")

const resolveIPv4 = function (ipAddress) {
  if (isV6Format(ipAddress) != null && ipAddress.indexOf("::ffff") >= 0) {
    return ipAddress.split("::ffff:")[1]
  }
  return ipAddress
}

const resolveProxies = function (req) {
  const ipAddress = resolveIPv4(req.connection.remoteAddress)
  if (
    __guard__(
      req != null ? req.headers : undefined,
      x => x["x-forwarded-for"]
    ) != null
  ) {
    return req.headers["x-forwarded-for"] + ", " + ipAddress
  }
  return ipAddress
}

export const metaphysics2 = function (param) {
  if (param == null) {
    param = {}
  }
  const { query, variables, req } = param
  const sentRequestId =
    REQUEST_ID || (req != null ? req.id : undefined) || "implement-me"
  return new Promise(function (resolve, reject) {
    let token
    const post = request
      .post(`${METAPHYSICS_ENDPOINT}/v2`)
      .set("Accept", "application/json")
      .set("X-Request-Id", sentRequestId)
      .timeout(API_REQUEST_TIMEOUT)

    if (
      (token =
        __guardMethod__(req != null ? req.user : undefined, "get", o =>
          o.get("accessToken")
        ) ||
        __guard__(req != null ? req.user : undefined, x => x.accessToken)) !=
      null
    ) {
      post.set({ "X-ACCESS-TOKEN": token })
      post.set({ "X-USER-ID": req.user.id })
    }

    if (
      __guard__(
        req != null ? req.connection : undefined,
        x1 => x1.remoteAddress
      ) != null
    ) {
      post.set("X-Forwarded-For", resolveProxies(req))
    }

    return post
      .send({
        query,
        variables,
      })
      .end(function (err, response) {
        if (err != null) {
          let errorObject = err
          if (
            __guard__(err != null ? err.response : undefined, x2 => x2.text) !=
            null
          ) {
            try {
              errorObject = JSON.parse(
                __guard__(err != null ? err.response : undefined, x3 => x3.text)
              )
            } catch (error1) {
              console.error("Failed to JSON.parse `err.response.text`")
            }
          }

          const formattedError = JSON.stringify(errorObject, null, 2)
          console.error(formattedError)
          return reject(err)
        }

        if (response.body.errors != null) {
          const error = new Error(JSON.stringify(response.body.errors))
          if (
            some(response.body.errors, ({ message }) =>
              message.match(/Not Found/)
            )
          ) {
            error.status = 404
          }
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

    res.redirect(`${METAPHYSICS_ENDPOINT}/v2?${qs.stringify(get)}`)

    return true
  }
}

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}

function __guardMethod__(obj, methodName, transform) {
  if (
    typeof obj !== "undefined" &&
    obj !== null &&
    typeof obj[methodName] === "function"
  ) {
    return transform(obj, methodName)
  } else {
    return undefined
  }
}
