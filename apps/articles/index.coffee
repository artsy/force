#
# /article/:id
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/articles', routes.index
app.get '/articles/:id/:slug', routes.show
