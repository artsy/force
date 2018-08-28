path = require 'path'
{ NODE_ENV } = require '../../config'
{ argv } = require('yargs') # --verbose flag, passed in on boot
{ IpDeniedError } = require('express-ipfilter')

module.exports = (err, req, res, next) ->
  file = path.resolve(
    __dirname,
    '../../desktop/components/error_handler/index.jade'
  )
  isDevelopment = argv.verbose or NODE_ENV is 'development'
  code = 504 if req.timedout
  code ||= err.status || 500

  code = 401 if err instanceof IpDeniedError

  if isDevelopment
    message = err.message || err.text || err.toString()
    detail = err.stack

    if err.status isnt 404
      console.log detail

  res.status(code).render(file, { message, detail, code })
