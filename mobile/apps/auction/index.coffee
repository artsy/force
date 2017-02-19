express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/auction/:id', routes.index
app.get '/auction/:id/confirm-registration', routes.index
app.post '/auction/:id/subscribe', routes.subscribe
