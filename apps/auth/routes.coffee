request = require 'superagent'
CurrentUser = require '../../models/current_user.coffee'
{ API_URL, ARTSY_ID, ARTSY_SECRET, APP_URL } = require('../../config')
{ parse } = require 'url'
qs = require 'querystring'
sanitizeRedirect = require '../../components/sanitize_redirect/index'

@logout = (req, res, next) ->
  req.logout()
  request
    .del("#{API_URL}/api/v1/access_token")
    .send(access_token: req.user?.get('accessToken'))
    .end (res) ->
      next()

@resetPassword = (req, res) ->
  res.render 'templates/reset_password'

@loginWithTrustToken = (req, res, next) ->
  request.post(API_URL + '/oauth2/access_token').send(
    grant_type: 'trust_token'
    client_id: ARTSY_ID
    client_secret: ARTSY_SECRET
    code: req.query['token']
  ).end (err, response) ->
    (err or response?.body.error_description)
    # Delete all connect cookies - we have some under artsy.net and others under .artsy.net.
    res.clearCookie 'connect.sess'
    req.login new CurrentUser(accessToken: response?.body.access_token), ->
      next()

@twitterLastStep = (req, res) ->
  res.render 'templates/twitter_email'

@redirectBack = (req, res, next) ->
  url = req.body['redirect-to'] or
        req.query['redirect-to'] or
        req.param('redirect_uri') or
        parse(req.get('Referrer') or '').path or
        '/'
  res.redirect sanitizeRedirect(url)
