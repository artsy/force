//
// Makes sure that artsy.net cannot be embedded elsewhere
//

module.exports = function sameOrigin(req, res, next) {
  if (!res.headersSent) {
    res.set("X-Frame-Options", "SAMEORIGIN")
  }

  next()
}
