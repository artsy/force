express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artwork/:id/checkout', routes.index
app.get '/artwork/:id/thank-you', routes.thankYou
