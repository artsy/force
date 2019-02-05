_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
User = require '../../models/user'
{ parse } = require 'url'
qs = require 'querystring'
{ API_URL } = require '../../config'
sanitizeRedirect = require '../../components/sanitize_redirect'

redirectUrl = (req) ->
  url = req.body['redirect-to'] or
  req.query['redirect-to'] or
  req.query['redirect_uri'] or
  req.params['redirect_uri'] or

  if (referrer = req.get('Referrer')) && (referrer.indexOf('/log_in') > -1) and (referrer.indexOf('/sign_up') > -1)
    url ?= req.get('Referrer')

  return if not url
  sanitizeRedirect(url)

module.exports.login = (req, res) ->
  locals = _.extend {}, req.query,
    redirectTo: redirectUrl(req)

  res.redirect "/login?#{qs.stringify(locals)}"

module.exports.forgotPassword = (req, res) ->
  res.redirect '/forgot'

module.exports.submitForgotPassword = (req, res, next) ->
  new Backbone.Model().save null,
    url: "#{sd.API_URL}/api/v1/users/send_reset_password_instructions?email=#{req.body.email}"
    success: ->
      res.render 'forgot_password_confirmation'
    error: (m, { response }) ->
      msg = response?.body?.error or 'Failed to reset password, try again.'
      res.render 'forgot_password', error: msg

module.exports.resetPassword = (req, res) ->
  res.render 'reset_password'

module.exports.signUp = (req, res) ->
  locals = _.extend {}, req.query,
    redirectTo: redirectUrl(req)
    action: req.query.action
    error: err?.body.error
    prefill: req.query.prefill
    intent: req.query.intent
    signupIntent: req.query.signupIntent
    trigger: req.query.trigger
    contextModule: req.query.contextModule

  res.redirect "/signup?#{qs.stringify(locals)}"

module.exports.twitterLastStep = (req, res) ->
  res.render 'twitter_email'
