#
# Adds route helpers to the req or res objects.
#

{ NODE_ENV } = require '../../config'

module.exports = (req, res, next) ->
  res.backboneError = (m, r) ->
    try
      parsed = JSON.parse r?.text
      errorText = parsed.error
    catch e
      errorText = e.text
    errorText ?= r?.error?.toString()

    # 403s from the API should 404 in production
    if r?.error?.status == 403 and NODE_ENV is 'production'
      r?.error?.status = 404
      errorText = 'Not Found'

    console.warn errorText, r?.error?.toString(), r?.status
    err = new Error(errorText)
    err.status = r?.error?.status
    next err
  next()
