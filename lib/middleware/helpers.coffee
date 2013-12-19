#
# Adds route helpers to the req or res objects.
#

module.exports = (req, res, next) ->
  res.backboneError = (m, e) ->
    res.statusCode  = e.error.status
    parsed          = JSON.parse e.text

    next new Error(parsed.error)
  next()
