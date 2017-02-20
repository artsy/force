express = require 'express'
routes = require './routes'

app = module.exports = express()

app.post '/flash', routes.index
