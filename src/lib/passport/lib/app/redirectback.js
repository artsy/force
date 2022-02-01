//
// Redirects back based on query params, session, or w/e else.
// Code stolen from Force, thanks @dzucconi!
//
const opts = require("../options")
const sanitizeRedirect = require("./sanitize_redirect")

module.exports = function (req, res) {
  const url = sanitizeRedirect(
    req.session.redirectTo ||
      (req.artsyPassportSignedUp && !req.session.skipOnboarding
        ? opts.afterSignupPagePath
        : undefined) ||
      req.body["redirect-to"] ||
      req.query["redirect-to"] ||
      req.params.redirect_uri ||
      "/"
  )
  delete req.session.redirectTo
  delete req.session.skipOnboarding
  if (res != null) {
    res.redirect(url)
  }
  return url
}
