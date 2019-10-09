#
# /feature
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'pug'

app.get '/feature/city-guide*', routes.redirectCityGuide
app.get '/feature/:id', routes.index
app.get '/feature/:id/:tab', routes.index
