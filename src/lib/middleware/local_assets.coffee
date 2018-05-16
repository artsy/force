#
# Serves assets from CDN_URL pointing to /public/assets
#

{ CDN_URL } = require '../../config'

module.exports = (req, res, next) ->
  res.locals.asset = (filename) -> return filename # no-op for now
  next()