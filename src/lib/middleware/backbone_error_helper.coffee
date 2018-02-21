module.exports = (req, res, next) ->
  res.backboneError = (model, err) ->
    try
      message = JSON.parse(err.text).error
    catch e
      message = err?.text or err?.response?.text or err?.stack or err?.message
      message ?= try JSON.stringify(err) catch e; 'Unknown Error'
    if err?.status in [404, 403, 401]
      status = 404
      message = 'Not Found'
    else
      status = err?.status or 500
    err = new Error
    err.message = message
    err.status = status
    next err
  next()
