#
# /login, /sign_up and /forgot
# Render the homepage but force open the appropriate modals
#

express = require 'express'
routes = require './routes'
{ loginPagePath, signupPagePath,
  twitterLastStepPath } = require('@artsy/passport').options

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# Twitter "One last Step" UI to enter email and login
app.get twitterLastStepPath, routes.twitterLastStep

# Forgot/reset password
app.get '/forgot_password', routes.forgotPassword
app.post '/forgot_password', routes.submitForgotPassword
app.get '/reset_password', routes.resetPassword

# Login and signup pages
app.get '/log_in', routes.login
app.get loginPagePath, routes.login
app.get signupPagePath, routes.signUp
