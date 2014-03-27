request = require 'superagent'
CurrentUser = require '../../models/current_user.coffee'
{ SECURE_ARTSY_URL, ARTSY_ID, ARTSY_SECRET, APP_URL } = require('../../config')
{ parse } = require 'url'
qs = require 'querystring'

getRedirectTo = (req) ->
  req.body['redirect-to'] or req.query['redirect-to'] or req.query['redirect_uri'] or parse(req.get('Referrer') or '').path or '/'

@submitLogin = (req, res) ->
  res.send { success: true, error: res.authError, user: req.user?.toJSON() }

@logout = (req, res) ->
  req.logout()
  res.redirect "#{SECURE_ARTSY_URL}/users/sign_out?" +
               "redirect_uri=#{APP_URL + (parse(req.get('Referrer') or '').path or '')}"

@resetPassword = (req, res) ->
  res.render 'templates/reset_password'

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
        res.redirect getRedirectTo(req)
  )

@twitterLastStep = (req, res) ->
  res.render 'templates/twitter_email'

@submitTwitterLastStep = (req, res) ->
  redirectTo = qs.parse(parse(req.get 'referrer').query)['redirect-to']
  url = "/users/auth/twitter?email=#{req.body.email}&redirect-to=#{redirectTo}"
  res.redirect url

@submitEmailForTwitter = (req, res, next) ->
  unless req.user
    return res.redirect '/log_in?error=no-user'

  req.user.save {
    email: req.query.email
    email_confirmation: req.query.email
  }, {
    success: (m, r) -> next()
    error: (m, e) ->
      return next() if e.text.match 'Error from MailChimp API'
      res.backboneError arguments...
  }

@submitFacebook = (req, res, next) ->
  res.redirect getRedirectTo(req)