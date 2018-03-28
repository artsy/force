_ = require 'underscore'
sd = require('sharify').data
splitTest = require('../../split_test/index')
Backbone = require 'backbone'
StepView = require './step.coffee'
Form = require '../../form/index.coffee'
FormMixin = require '../../mixins/form'
templates =
  register: -> require('../templates/account/register.jade') arguments...
  login: -> require('../templates/account/login.jade') arguments...
  forgot: -> require('../templates/account/forgot.jade') arguments...

module.exports = class Account extends StepView
  _.extend @prototype, FormMixin
  className: 'iq-account'

  template: ->
    templates[@mode()] arguments...

  __events__:
    'click button': 'submit'
    'click .js-mode': 'change'
    'click .js-iq-save-skip': 'next'
    'change #accepted_terms_of_service': 'checkAcceptedTerms'
    'click #signup-fb': 'fbSignup'

  initialize: ({ @user, @inquiry, @artwork, @state, @modal }) ->
    @modal?.dialog 'bounce-in'
    @active = new Backbone.Model mode: 'auth'

    # remove after gdpr compliance a/b test closes
    splitTest('gdpr_compliance_test').view()
    @gdprDisabled = sd.GDPR_COMPLIANCE_TEST is 'control'
   
    @listenTo @active, 'change:mode', @render
    @listenTo @active, 'change:mode', @forgot

    super

  setup: ->
    if @user.forgot?
      @sendResetOnce = _.once _.bind(@user.forgot, @user)

  mode: ->
    if (mode = @active.get('mode')) is 'auth'
      if @user.related().account.id then 'login' else 'register'
    else
      mode

  submit: (e) ->
    e.preventDefault()

    # remove after gdpr compliance test closes
    @checkAcceptedTerms() if !@gdprDisabled

    form = new Form model: @user, $form: @$('form'), $submit: @$('.js-form-submit')
    return unless form.isReady()

    form.state 'loading'

    @user.set form.data()
    @user[@mode()] # `login` or `signup`
      error: form.error.bind form
      trigger_login: false
      success: (model, { user }) =>
        @user.repossess user.id,
          error: form.error.bind form
          success: =>
            @state.get('inquiry').save {},
              success: =>
                @next()
              error: =>
                @next()

  forgot: (active, mode) ->
    return unless mode is 'forgot'
    @sendResetOnce()

  change: (e) ->
    e.preventDefault()
    @active.set 'mode', $(e.currentTarget).data 'mode'

  checkAcceptedTerms: () ->
    input = $('input#accepted_terms_of_service').get(0)
    input.setCustomValidity? ''
    if $(input).prop('checked')
      $('.tos-error').text ''
      $boxContainer = $('.gdpr-signup__form__checkbox__accept-terms')
      $boxContainer.attr('data-state', null)
      true
    else
      $boxContainer = $('.gdpr-signup__form__checkbox__accept-terms')
      $boxContainer.attr('data-state', 'error')
      input = $('input#accepted_terms_of_service').get(0)
      input.setCustomValidity('')
      $('.tos-error').text 'Please agree to our terms to continue'
      false

  fbSignup: (e) ->
    e.preventDefault()
    queryData =
      'signup-intent': @signupIntent
      'redirect-to': @afterAuthPath
    queryString = $.param(queryData)
    fbUrl = sd.AP.facebookPath + '?' + queryString
    return window.location.href = fbUrl if @gdprDisabled

    if @checkAcceptedTerms()
      gdprString = $.param(@gdprData(@serializeForm()))
      gdprFbUrl = fbUrl + "&" + gdprString
      window.location.href = gdprFbUrl

  # accomodate AB test for checkboxes
  gdprData: (formData) ->
    return {} if @gdprDisabled
    if sd.GDPR_COMPLIANCE_TEST is 'separated_checkboxes'
      'receive_emails': !!formData['receive_emails']
      'accepted_terms_of_service': !!formData['accepted_terms_of_service']
    else if sd.GDPR_COMPLIANCE_TEST is 'combined_checkboxes'
      'receive_emails': !!formData['accepted_terms_of_service']
      'accepted_terms_of_service': !!formData['accepted_terms_of_service']