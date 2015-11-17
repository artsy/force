express = require 'express'
routes = require './routes'

module.exports = app = express()

app.get '/geo/ip', routes.ip
app.get '/geo/nearest', routes.nearest