express = require 'express'
{ NODE_ENV } = require '../../config'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/blank', (req, res, next) ->
  res.render 'index',
    env: NODE_ENV
    view_cache_enabled: app.enabled 'view cache'

app.get '/blank.json', (req, res, next) ->
  res.send {}
