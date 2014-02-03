#
# Adds route helpers to the req or res objects.
#

module.exports = (req, res, next) ->
  res.backboneError = (m, r) ->
    try
      parsed = JSON.parse r.text
      errorText = parsed.error
    catch e
      errorText = e.text
    errorText ?= r.error?.toString()
    console.warn errorText
    res.status(r.error.status)
    next new Error(errorText)
  next()
