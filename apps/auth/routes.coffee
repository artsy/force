request = require 'superagent'
CurrentUser = require '../../models/current_user.coffee'
{ SECURE_ARTSY_URL, ARTSY_ID, ARTSY_SECRET, APP_URL } = require('../../config')
{ parse } = require 'url'
qs = require 'querystring'

@submitLogin = (req, res) ->
  res.send { success: true, error: res.authError, user: req.user?.toJSON() }

@logout = (req, res, next) ->
  req.logout()
  next()

@resetPassword = (req, res) ->
  res.render 'templates/reset_password'

@loginWithTrustToken = (req, res, next) ->
  request.post(SECURE_ARTSY_URL + '/oauth2/access_token').send(
    grant_type    : 'trust_token'
    client_id     : ARTSY_ID
    client_secret : ARTSY_SECRET
    code          : req.query['token']
  ).end (err, response) ->
    (err or response?.body.error_description)
    # Delete all connect cookies - we have some under artsy.net and others under .artsy.net.
    res.clearCookie 'connect.sess'
    req.login new CurrentUser(accessToken: response?.body.access_token), ->
      next()

@twitterLastStep = (req, res) ->
  res.render 'templates/twitter_email'

@submitTwitterLastStep = (req, res) ->
  redirectTo = qs.parse(parse(req.get 'referrer').query)['redirect-to']
  url = "/users/auth/twitter?email=#{req.body.email}&redirect-to=#{redirectTo}"
  res.redirect url

@submitEmailForTwitter = (req, res, next) ->
  return res.redirect '/log_in?error=no-user' unless req.user
  return next() unless req.query.email?
  req.user.save {
    email: req.query.email
    email_confirmation: req.query.email
  }, {
    success: (m, r) -> next()
    error: (m, e) ->
      return next() if e.text.match 'Error from MailChimp API'
      res.backboneError arguments...
  }

@redirectBack = (req, res, next) ->
  url = req.body['redirect-to'] or
        req.query['redirect-to'] or
        req.param('redirect_uri') or
        parse(req.get('Referrer') or '').path or
        '/'
  res.redirect url