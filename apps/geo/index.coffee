express = require 'express'
timeout = require 'connect-timeout'
routes = require './routes'

module.exports = app = express()

app.set 'trust proxy', true

app.get '/geo/ip', timeout('25s'), routes.ip
app.get '/geo/nearest', timeout('25s'), routes.nearest
