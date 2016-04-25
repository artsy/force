express = require 'express'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/blank', (req, res, next) ->
  res.render 'index'

app.get '/blank.json', (req, res, next) ->
  res.send {}
