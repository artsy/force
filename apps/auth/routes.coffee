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

@twitterLastStep = (req, res) ->
  res.render 'twitter_email'

@redirectBack = (req, res, next) ->
  url = req.body['redirect-to'] or
        req.query['redirect-to'] or
        req.params.redirect_uri or
        req.session.redirectTo or
        '/'

  res.redirect sanitizeRedirect(url)

@logout = (req, res, next) ->
  res.status(200).send msg: 'success'
