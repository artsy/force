request = require 'superagent'
CurrentUser = require '../../models/current_user.coffee'
{ API_URL, ARTSY_ID, ARTSY_SECRET, APP_URL } = require '../../config'
{ parse } = require 'url'
qs = require 'querystring'
sanitizeRedirect = require '@artsy/passport/sanitize-redirect'

@resetPassword = (req, res) ->
  if req.query.reset_password_token?
    req.session.reset_password_token = req.query.reset_password_token
    req.session.set_password = req.query.set_password
    req.session.redirect_to = req.query.redirect_to
    res.redirect '/reset_password'
  else
    res.locals.sd.REDIRECT_TO = req.session.redirect_to
    res.render 'reset_password', reset_password_token: req.session.reset_password_token, set_password: req.session.set_password

@twitterLastStep = (req, res) ->
  res.render 'twitter_email'

@signUp = (req, res) ->
  res.render 'sign_up'

@logIn = (req, res) ->
  res.render 'log_in'
