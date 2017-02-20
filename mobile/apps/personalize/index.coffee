express = require 'express'
routes = require './routes'

app = module.exports = express()

app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/personalize', (req, res) -> res.redirect '/personalize/collect'
app.get '/personalize/collect', routes.index
app.get '/personalize/location', routes.index
app.get '/personalize/artists', routes.index
app.get '/personalize/price_range', routes.index
