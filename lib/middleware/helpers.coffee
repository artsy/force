#
# Adds route helpers to the req or res objects.
#

module.exports = (req, res, next) ->
  res.backboneError = (m, e) ->
    res.statusCode  = e.error.status
    try
      parsed        = JSON.parse e.text
    catch e
      parsed        = e.text

    next new Error(parsed.error)
  next()
