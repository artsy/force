#
# Makes sure that artsy.net cannot be embedded elsewhere
#

module.exports = (req, res, next) ->
  if !res.headersSent
    res.set('X-Frame-Options', 'SAMEORIGIN')

  next()
