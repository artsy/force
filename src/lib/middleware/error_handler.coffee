path = require 'path'
{ NODE_ENV } = require '../../config'

module.exports = (err, req, res, next) ->
  file = path.resolve(
    __dirname,
    '../../desktop/components/error_handler/index.jade'
  )
  isDevelopment = NODE_ENV is 'development'
  code = 504 if req.timedout
  code ||= err.status || 500
  message = err.message || err.text || err.toString() if isDevelopment
  detail = err.stack if isDevelopment
  res.status(code).render(file, { message, detail, code })
