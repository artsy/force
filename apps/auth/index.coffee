#
# /login, /sign_up and /forgot
# Render the homepage but force open the appropriate modals
#

express = require 'express'
routes = require './routes'
{ loginPath, signupPath, twitterCallbackPath,
  twitterLastStepPath, facebookCallbackPath } = require('artsy-passport').options

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/reset_password', routes.resetPassword

# Auth submission handlers
app.post loginPath, routes.submitLogin
app.post signupPath, routes.submitLogin
app.get twitterCallbackPath, routes.redirectBack
app.get facebookCallbackPath, routes.redirectBack
app.post '/users/sign_in_trust_token', routes.loginWithTrustToken, routes.redirectBack

# Log out
app.get '/users/sign_out', routes.logout, routes.redirectBack

# Twitter "One last Step" UI to enter email and login
app.get twitterLastStepPath, routes.twitterLastStep