path = require 'path'
{ NODE_ENV, VERBOSE_LOGGING } = require '../../config'
{ argv } = require('yargs') # --verbose flag, passed in on boot
{ IpDeniedError } = require('express-ipfilter')

module.exports = (err, req, res, next) ->
  file = path.resolve(
    __dirname,
    '../../desktop/components/error_handler/index.pug'
  )

  enableLogging = NODE_ENV is 'development' or argv.verbose or VERBOSE_LOGGING is true
  code = 504 if req.timedout
  code ||= err.status || 500

  code = 401 if err instanceof IpDeniedError

  if enableLogging
    message = err.message || err.text || err.toString()
    detail = err.stack

    if err.status isnt 404
      console.log detail

  res.status(code).render(file, { message, detail, code })
