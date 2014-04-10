#
# The home page
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.get '/', routes.index
app.get '/log_in', routes.redirectLoggedInHome, routes.index
app.get '/sign_up', routes.redirectLoggedInHome, routes.index
app.get '/forgot', routes.index
app.get '/users/invitation/accept', routes.redirectLoggedInHome, routes.redirectToSignup
# Cache busting route for hero units
app.get '/hero_units/bust_cache', routes.bustHeroCache
