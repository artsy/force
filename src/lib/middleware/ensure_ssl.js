//
// Makes sure that any http requests get redirected to https
//

const { APP_URL } = require("../../config")
const { parse } = require("url")

module.exports = function ensureSsl(req, res, next) {
  const protocol = req.get("X-Forwarded-Proto") || req.protocol
  if (protocol !== "https" && parse(APP_URL).protocol === "https:") {
    res.redirect(301, APP_URL + req.url)
  } else {
    next()
  }
}
