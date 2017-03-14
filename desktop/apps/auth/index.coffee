#
# /login, /sign_up and /forgot
# Render the homepage but force open the appropriate modals
#

express = require 'express'
routes = require './routes'
{ twitterLastStepPath } = require('artsy-passport').options

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/reset_password', routes.resetPassword
app.get '/signup', routes.signUp
app.get '/login', routes.logIn
app.get twitterLastStepPath, routes.twitterLastStep
