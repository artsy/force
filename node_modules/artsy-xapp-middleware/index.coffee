request = require 'superagent'
moment = require 'moment'

module.exports.token = null

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
    setTimeout (=> module.exports.token = null), moment(expiresIn).unix() - moment().unix()

  (req, res, next) =>
    unless module.exports.token?
      fetch (err, token) =>
        res.locals.artsyXappToken = module.exports.token = token
        next()
    else
      res.locals.artsyXappToken = module.exports.token
      next()
