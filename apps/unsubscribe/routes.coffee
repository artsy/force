sd = require('sharify').data

emailTypes = require './email_types'

@unsubscribe = (req, res, next) ->
  auth_token = req.query.authentication_token
  res.locals.sd.UNSUB_AUTH_TOKEN = auth_token
  res.render 'index', emailTypes: emailTypes
