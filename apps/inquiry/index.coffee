express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/inquiry/development', routes.development
app.get '/inquiry/debug/:artwork_id', routes.index
app.get '/inquiry/debug/:artwork_id/*', routes.index
app.get '/inquiry/:artwork_id', routes.index
app.get '/inquiry/:id/user_outcome', routes.user_outcome
