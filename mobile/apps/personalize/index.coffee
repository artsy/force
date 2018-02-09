express = require 'express'
{ index } = require './routes.js'

app = module.exports = express()

app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/personalize', index
app.get '/personalize/collect', index
app.get '/personalize/location', index
app.get '/personalize/artists', index
app.get '/personalize/price_range', index
