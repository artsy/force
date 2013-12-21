request = require 'superagent'
CurrentUser = require '../../models/current_user.coffee'
{ ARTSY_ID, ARTSY_SECRET, SECURE_ARTSY_URL } = require('../../config')

@index = (req, res) ->
  res.render 'template'

@submitLogin = (req, res) ->
  res.send { success: true, user: req.user?.toJSON() }

@logout = (req, res) ->
  req.logout()
  res.redirect '/'

@redirectAfterLogin = (req, res) ->
  res.redirect req.body['redirect-to'] or req.get('Referrer') or '/'

@loginWithTrustToken = (req, res) ->
  request.post(SECURE_ARTSY_URL + '/oauth2/access_token').send(
    grant_type    : 'trust_token'
    client_id     : ARTSY_ID
    client_secret : ARTSY_SECRET
    code          : req.query['token']
    ).end((err, response) ->
      (err or response?.body.error_description)
      # Delete all connect cookies - we have some under artsy.net and others under .artsy.net.
      res.clearCookie 'connect.sess'
      req.login new CurrentUser(accessToken: response?.body.access_token), ->
        res.redirect req.query['redirect-to'] or req.get('Referrer') or '/'
  )
