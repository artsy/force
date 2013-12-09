#
# Middleware that fetches an xapp token, stores it in [sharify](https://github.com/artsy/sharify)
# data, and expires it when necessary. Use like so...
#
# app.use require('artsy-xapp-middlware')
#   artsyUrl: 'http://artsy.net'
#   clientId: '133fsa3'
#   clientSecret: 'f32j13f'
#   sharifyData: require('sharify').data
#

request = require 'superagent'
moment = require 'moment'

@token = null

module.exports = (options) =>

  fetch = (callback) =>
    request.get("#{options.artsyUrl}/api/v1/xapp_token").query(
      client_id: options.clientId
      client_secret: options.clientSecret
    ).end (err, res) =>
      return callback err if err
      callback null, res.body.xapp_token
      expireTokenIn res.body.expires_in

  expireTokenIn = (expiresIn) =>
    setTimeout (=> @token = null), moment(expiresIn).unix() - moment().unix()

  (req, res, next) =>
    unless @token?
      fetch (err, token) =>
        res.locals.artsyXappToken = @token = token
        next()
    else
      res.locals.artsyXappToken = @token
      next()