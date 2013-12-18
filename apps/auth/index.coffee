#
# /login, /sign_up and /forgot
# Render the homepage but force open the appropriate modals
#

express = require 'express'
routes = require './routes'
{ loginPath, signupPath, twitterCallbackPath,
  facebookCallbackPath } = require('artsy-passport').options

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

# we should just proxy to Gravity until we build the homepage in Force
# app.get '/log_in', routes.index
# app.get '/sign_up', routes.index
# app.get '/forgot', routes.index

# Artsy Passport auth handlers
app.post '/force/users/sign_in', routes.submitLogin
app.get '/force/users/sign_out', routes.logout

# Auth submission handlers
app.post loginPath, routes.redirectAfterLogin
app.post signupPath, routes.redirectAfterLogin
app.get twitterCallbackPath, routes.redirectAfterLogin
app.get facebookCallbackPath, routes.redirectAfterLogin
