const path = require("path")
const { NODE_ENV, VERBOSE_LOGGING } = require("../../config")
const { argv } = require("yargs") // --verbose flag, passed in on boot
const { IpDeniedError } = require("express-ipfilter")

module.exports = function errorHandler(err, req, res, next) {
  let code, detail, message
  const file = path.resolve(
    __dirname,
    "../../desktop/components/error_handler/index.jade"
  )

  const enableLogging =
    NODE_ENV === "development" || argv.verbose || VERBOSE_LOGGING === true
  if (req.timedout) {
    code = 504
  }
  if (!code) {
    code = err.status || 500
  }

  if (err instanceof IpDeniedError) {
    code = 401
  }

  if (enableLogging) {
    message = err.message || err.text || err.toString()
    detail = err.stack

    if (err.status !== 404) {
      console.log(detail)
    }
  }

  res.status(code).render(file, { message, detail, code })
}
