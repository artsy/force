path = require 'path'
{ NODE_ENV } = require '../../config'

module.exports = (err, req, res, next) ->
  file = path.resolve(
    __dirname,
    '../../desktop/components/error_handler/index.jade'
  )
  isNotProduction = NODE_ENV isnt 'production'
  console.log err if isNotProduction
  code = 504 if req.timedout
  code ||= err.status || 500
  message = err.message || err.text || err.toString() if isNotProduction
  detail = err.stack if isNotProduction
  res.status(code).render(file, { message, detail, code })
