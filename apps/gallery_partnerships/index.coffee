#
# About page requires different enough functionality from page app
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/gallery-partnerships', routes.index

app.use express.static __dirname + '/public'
