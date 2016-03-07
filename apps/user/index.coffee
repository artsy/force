express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/user/refresh', routes.refresh

app.get '/profile/edit', routes.settings
app.get '/user/edit', routes.settings
app.get '/user/delete', routes.settings
app.get '/user/saves', routes.settings
app.get '/user/payments', routes.settings

{ NODE_ENV } = require '../../config'
stagingOrDevelopmentOnly = (req, res, next) ->
  if NODE_ENV in ['development', 'staging']
    next()
  else
    err = new Error
    err.status = 403
    next err

app.get '/user/auctions', stagingOrDevelopmentOnly, routes.settings
