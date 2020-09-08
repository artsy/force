//
// HSTS allows for a more effective implementation of TLS by ensuring
// all communication takes place over a secure transport layer on the client side.
// See https://scotthelme.co.uk/hsts-the-missing-link-in-tls.
//

const { APP_URL } = require("../../config")
const { parse } = require("url")

module.exports = function hsts(req, res, next) {
  const protocol = req.get("X-Forwarded-Proto") || req.protocol
  if (protocol === "https" && parse(APP_URL).protocol === "https:") {
    if (!res.headersSent) {
      res.set("Strict-Transport-Security", "max-age=31536000")
    }
  }
  next()
}
