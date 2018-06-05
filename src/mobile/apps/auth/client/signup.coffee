sd = require('sharify').data
qs = require 'querystring'
Backbone = require "backbone"
bootstrap = require "../../../components/layout/bootstrap.coffee"

module.exports.SignUpView = class SignUpView extends Backbone.View

  initialize: ->
    @$error = @$(".auth-page-error-message")

  events:
    "blur input": "check"
    'submit form': 'submit'

  check: (e) ->
    $target = $(e.target)
    message = if $target.val() is ""
      "Please enter your #{$target.attr('placeholder').toLowerCase()}"

    @$error.text(message)

  login: (data) ->
    options =
      url: sd.AP.loginPagePath
      error: @onError
      success: =>
        window.location = data.redirectTo
    new Backbone.Model().save data, options

  signup: (data) ->
    options =
      url: sd.AP.signupPagePath
      error: @onError
      success: (m, res) =>
        @login(data)
        analyticsHooks.trigger 'auth:signup', data, res
    new Backbone.Model().save data, options

  onError: (m, res) =>
    @$error.text res?.responseJSON?.error or "Unknown Error"

  submit: (e) ->
    e.preventDefault()
    data =
      name: @$("input[name='name']").val()
      email: @$("input[name='email']").val()
      password: @$("input[name='password']").val()
      acquisition_initiative: qs.parse(location.search).acquisition_initiative
      redirectTo: @$("input[name='redirect-to']").val()
      _csrf: @$("input[name='_csrf']").val()
      accepted_terms_of_service: true
      agreed_to_receive_emails: true
    @signup data
    false

module.exports.SignUpOptionsView = class SignUpOptionsView extends Backbone.View
  SIGNUP_URLS = {
    facebook: '/users/auth/facebook',
    email: '/sign_up?email=1'
  }

  events:
    'click #auth-page-signup-social a': 'acceptTermsBeforeSignup'

  acceptTermsBeforeSignup: (e) ->
    e.preventDefault()

    redirectTo = $(e.currentTarget).data('redirect-to')
    signupMethod = $(e.currentTarget).data('signup-method')
    $checkbox = $('.gdpr-signup__form__checkbox__accept-terms input')

    if $checkbox.is(':checked')
      $('.gdpr-signup__form__checkbox__accept-terms').removeClass('tos-error')
      redirectStr = if signupMethod is 'facebook' then "?#{redirectTo}" else "&#{redirectTo}"
      window.location = SIGNUP_URLS[signupMethod] + redirectStr
    else
      $('.gdpr-signup__form__checkbox__accept-terms').addClass('tos-error')

module.exports.init = ->
  bootstrap()

  if window.location.search?.indexOf('email') > -1
    new SignUpView(el: $("#auth-page"))
  else
    new SignUpOptionsView(el: $("#auth-page"))
