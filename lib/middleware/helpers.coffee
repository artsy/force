#
# Adds route helpers to the req or res objects.
#

module.exports = (req, res, next) ->
  res.backboneError = (m, r) ->
    try
      parsed = JSON.parse r?.text
      errorText = parsed.error
    catch e
      errorText = e.text
    errorText ?= r?.error?.toString()

    # 403s from the API should 404
    if r?.error?.status == 403
      r?.error?.status = 404
      errorText = 'Not Found'

    console.warn errorText
    res.status(r?.error?.status) if r?.error?.status
    next new Error(errorText)
  next()
