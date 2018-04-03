request = require 'superagent'
CurrentUser = require '../../models/current_user.coffee'
{ API_URL, ARTSY_ID, ARTSY_SECRET, APP_URL } = require '../../config'
{ parse } = require 'url'
qs = require 'querystring'
sanitizeRedirect = require '@artsy/passport/sanitize-redirect'

@resetPassword = (req, res) ->
  if req.query.reset_password_token?
    req.session.reset_password_token = req.query.reset_password_token
    res.redirect '/reset_password'
  else
    setPassword = req.query.set_password == 'true'
    redirectTo = req.query.redirect_to
    res.render 'reset_password', reset_password_token: req.session.reset_password_token, setPassword: setPassword, redirectTo: redirectTo

@twitterLastStep = (req, res) ->
  res.render 'twitter_email'

@signUp = (req, res) ->
  res.render 'sign_up'

@logIn = (req, res) ->
  res.render 'log_in'
