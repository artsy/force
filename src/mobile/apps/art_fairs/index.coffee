#
# The art-fairs listing page
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'pug'
app.get '/art-fairs', routes.index
app.get '/fairs', routes.index
