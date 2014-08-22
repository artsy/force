#
# Makes sure that artsy.net cannot be embedded elsewhere
#

module.exports = (req, res, next) ->
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  next()
