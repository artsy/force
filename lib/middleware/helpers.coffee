#
# Adds route helpers to the req or res objects.
#

module.exports = (req, res, next) ->
  res.backboneError = (m, res) ->
    res.statusCode = res.error.status
    try
      parsed = JSON.parse res.text
      errorText = parsed.error
    catch e
      errorText = e.text
    errorText ?= res.error?.toString()
    console.warn errorText
    next new Error(errorText)
  next()
