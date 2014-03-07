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

app.get '/reset_password', routes.resetPassword

# Auth submission handlers
app.post loginPath, routes.submitLogin
app.post signupPath, routes.submitLogin
app.get twitterCallbackPath, routes.loginToArtsy, routes.submitEmailForTwitter
app.get facebookCallbackPath, routes.loginToArtsy

app.post '/force/users/sign_in_trust_token', routes.loginWithTrustToken
app.get '/force/log_in_to_artsy', routes.loginToArtsy

# Log out
app.get '/force/users/sign_out', routes.logout

# Twitter "One last Step" UI to enter email and login
app.get '/force/users/auth/twitter/email', routes.twitterLastStep
app.post '/force/users/auth/twitter/email', routes.submitTwitterLastStep
