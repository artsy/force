express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/auction-new/:id', routes.index
app.get '/auction-new/:id/confirm-registration', routes.index
