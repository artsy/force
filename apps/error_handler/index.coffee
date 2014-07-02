#
# Error pages and redirections
#

express = require 'express'
routes = require './routes'

app = module.exports.app = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

# app.use routes.pageNotFound
app.use '/users/sign_in', routes.loginError
app.use routes.socialAuthError
app.use routes.internalError

module.exports = (err, req, res, next) ->
  app(err, req, res, next)