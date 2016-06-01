express = require 'express'
{ pick } = require 'underscore'

module.exports = app = express()

app.post '/confirmation', (req, res) ->
  req.session.confirmation = pick req.body, 'title', 'message', 'confirm', 'ignore'
  res.send req.body

app.get '/confirmation', (req, res) ->
  res.send req.session.confirmation

app.delete '/confirmation', (req, res) ->
  req.session.confirmation = null
  res.send 'ok'
