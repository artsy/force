//
// Logout helpers.
//
const request = require("superagent")
const opts = require("../options")
const { parse } = require("url")
const redirectBack = require("./redirectBack")
const forwardedFor = require("./forwarded_for")

module.exports.denyBadLogoutLinks = function (req, _res, next) {
  if (parse(req.get("Referrer")).hostname.match("artsy.net")) {
    return next()
  }
  next(new Error("Malicious logout link."))
}

module.exports.logout = function (req, res, _next) {
  const accessToken = req.user != null ? req.user.accessToken : undefined
  req.logout()
  req.session = null
  request
    .del(`${opts.ARTSY_URL}/api/v1/access_token`)
    .set({
      "X-Access-Token": accessToken,
      "X-Forwarded-For": forwardedFor(req),
    })
    .end(function () {
      if (req.xhr) {
        return res.status(200).send({ msg: "success" })
      } else {
        return redirectBack(req, res)
      }
    })
}
