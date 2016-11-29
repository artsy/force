#
# Makes sure that artsy.net cannot be embedded elsewhere
#

module.exports = (req, res, next) ->
  res.set('X-Frame-Options', 'SAMEORIGIN')
  res.set('Access-Control-Allow-Origin', 'https://artsy-vanity-files-production.s3.amazonaws.com')
  next()
