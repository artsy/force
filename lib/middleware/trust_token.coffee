_ = require 'underscore'
qs = require 'querystring'
request = require 'superagent'
{ API_URL, ARTSY_ID, ARTSY_SECRET } = require '../../config'

module.exports = (req, res, next) ->
  return next() unless (token = req.query.trust_token)?

  settings =
    grant_type: 'trust_token'
    client_id: ARTSY_ID
    client_secret: ARTSY_SECRET
    code: token

  request
    .post "#{API_URL}/oauth2/access_token"
    .send settings
    .end (err, response) ->
      return next() if err? or not response.ok

      CurrentUser = require '../../models/current_user'
      user = new CurrentUser accessToken: response.body.access_token

      req.login user, (err) ->
        return next() if err?

        path = req.url.split('?')[0]
        params = _.omit req.query, 'trust_token'
        path += "?#{qs.stringify params}" unless _.isEmpty params
        res.redirect path
