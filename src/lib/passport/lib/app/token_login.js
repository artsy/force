//
// Middleware to allow log in by passing x-access-token in the headers or
// trust_token in the query params.
//

const forwardedFor = require("./forwarded_for")
// TODO: Remove let added for 'rewire'
let opts = require("../options")
const qs = require("querystring")
// TODO: Remove let added for 'rewire'
let request = require("superagent")
const omit = require("lodash/omit")
const isEmpty = require("lodash/isEmpty")

module.exports.headerLogin = function (req, _res, next) {
  if (req.path === opts.logoutPath) {
    return next()
  }

  const token = req.get("X-Access-Token") || req.query.access_token

  if (token) {
    return req.login({ accessToken: token }, next)
  } else {
    return next()
  }
}

module.exports.trustTokenLogin = function (req, res, next) {
  let token
  if ((token = req.query.trust_token) == null) {
    return next()
  }

  const settings = {
    grant_type: "trust_token",
    client_id: opts.ARTSY_ID,
    client_secret: opts.ARTSY_SECRET,
    code: token,
  }

  request
    .post(`${opts.ARTSY_URL}/oauth2/access_token`)
    .set({ "X-Forwarded-For": forwardedFor(req) })
    .send(settings)
    .end(function (err, response) {
      if (err != null || !response.ok) {
        return next()
      }

      const user = { accessToken: response.body.access_token }

      req.login(user, function (err) {
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
    })
}
