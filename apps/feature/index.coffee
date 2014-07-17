#
# /feature
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/feature/:id', routes.index
app.get '/feature/:id/:tab', routes.index
