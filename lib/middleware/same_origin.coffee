#
# Makes sure that artsy.net cannot be embedded elsewhere
#

module.exports = (req, res, next) ->
  res.headers['X-Frame-Options'] = 'SAMEORIGIN'
