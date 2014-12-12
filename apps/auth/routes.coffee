request = require 'superagent'
CurrentUser = require '../../models/current_user.coffee'
{ API_URL, ARTSY_ID, ARTSY_SECRET, APP_URL } = require '../../config'
{ parse } = require 'url'
qs = require 'querystring'
sanitizeRedirect = require '../../components/sanitize_redirect/index'

@resetPassword = (req, res) ->
  if req.query.reset_password_token?
    req.session.reset_password_token = req.query.reset_password_token
    res.redirect '/reset_password'
  else
    res.render 'reset_password', reset_password_token: req.session.reset_password_token

@loginWithTrustToken = (req, res, next) ->
  request.post(API_URL + '/oauth2/access_token').send(
    grant_type: 'trust_token'
    client_id: ARTSY_ID
    client_secret: ARTSY_SECRET
    code: req.query['token']
  )
  .on('error', next)
  .end (response) ->
    # Delete all connect cookies - we have some under artsy.net and others under .artsy.net.
    res.clearCookie 'connect.sess'
    req.login new CurrentUser(accessToken: response?.body.access_token), ->
      next()

@twitterLastStep = (req, res) ->
  res.render 'twitter_email'

@redirectBack = (req, res, next) ->
  url = req.body['redirect-to'] or
        req.query['redirect-to'] or
        req.param('redirect_uri') or
        parse(req.get('Referrer') or '').path or
        '/'
  res.redirect sanitizeRedirect(url)

@logout = (req, res, next) ->
  res.send 200, { msg: "success" }
