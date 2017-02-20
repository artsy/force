emailTypes = require './email_types'

module.exports.index = (req, res, next) ->
  authToken = req.query.authentication_token
  res.locals.sd.UNSUB_TOKEN = authToken
  res.render 'index', emailTypes: emailTypes
