request = require 'superagent'
CurrentUser = require '../../models/current_user.coffee'
{ SECURE_ARTSY_URL, ARTSY_ID, ARTSY_SECRET, APP_URL } = require('../../config')
{ parse } = require 'url'
qs = require 'querystring'

@index = (req, res) ->
  res.render 'template'

@submitLogin = (req, res) ->
  res.send { success: true, user: req.user?.toJSON() }

@loginToArtsy = (req, res) ->
  redirectTo = req.body['redirect-to'] or req.query['redirect-to'] or
               parse(req.get('Referrer') or '').path or '/'
  request
    .post("#{SECURE_ARTSY_URL}/api/v1/me/trust_token")
    .send(access_token: req.user.get 'accessToken')
    .end (trustRes) ->
      res.redirect "#{SECURE_ARTSY_URL}/users/sign_in?" +
                   "trust_token=#{trustRes.body.trust_token}&" +
                   "redirect_uri=#{APP_URL + redirectTo}"

@logout = (req, res) ->
  req.logout()
  res.redirect "#{SECURE_ARTSY_URL}/users/sign_out?" +
               "redirect_uri=#{APP_URL + (parse(req.get('Referrer') or '').path or '')}"

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

@twitterLastStep = (req, res) ->
  res.render 'twitter_email'

@submitTwitterLastStep = (req, res) ->
  redirectTo = qs.parse(parse(req.get 'referrer').query)['redirect-to']
  url = "/force/users/auth/twitter?email=#{req.body.email}&redirect-to=#{redirectTo}"
  res.redirect url

@submitEmailForTwitter = (req, res, next) ->
  req.user.save {
    email: req.query.email
    email_confirmation: req.query.email
  }, {
    success: (m, r) -> next()
    error: (m, e) ->
      return next() if e.text.match 'Error from MailChimp API'
      res.backboneError arguments...
  }
