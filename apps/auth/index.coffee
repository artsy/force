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

# Auth submission handlers
app.get '/force/users/sign_out', routes.logout
app.post '/force/users/sign_in_trust_token', routes.loginWithTrustToken
app.post loginPath, routes.submitLogin
app.post signupPath, routes.submitLogin
app.get '/force/log_in_to_artsy', routes.loginToArtsy
app.get twitterCallbackPath, routes.loginToArtsy, routes.submitEmailForTwitter
app.get facebookCallbackPath, routes.loginToArtsy

# Twitter "One last Step" UI to enter email and login
app.get '/force/users/auth/twitter/email', routes.twitterLastStep
app.post '/force/users/auth/twitter/email', routes.submitTwitterLastStep
