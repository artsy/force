#
# /login, /sign_up and /forgot
# Render the homepage but force open the appropriate modals
#

express = require 'express'
routes = require './routes'
adminOnly = require '../../lib/middleware/admin_only'
{ twitterLastStepPath } = require('artsy-passport').options

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/reset_password', routes.resetPassword
app.get '/signup', adminOnly, routes.signUp
app.get '/login', adminOnly, routes.logIn
app.get twitterLastStepPath, routes.twitterLastStep
