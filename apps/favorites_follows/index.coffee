#
# The following page.
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/following/:type', routes.follows
app.get '/favorites', routes.favorites