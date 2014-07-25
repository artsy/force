#
# About page requires different enough functionality from page app
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
routes.initClient()

app.get '/about2', routes.index
app.all '/about2*', routes.adminOnly
app.get '/about2/edit', routes.edit
app.post '/about2/edit', routes.upload