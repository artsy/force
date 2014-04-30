_                   = require 'underscore'
_.str               = require 'underscore.string'
sd                  = require('sharify').data
Backbone            = require 'backbone'
PasswordEdit        = require '../models/password_edit.coffee'
ErrorHelpers        = require './error_handling.coffee'
qs                  = require 'querystring'

module.exports = class AccountForm extends Backbone.View

  _.extend @prototype, ErrorHelpers

  initialize: (options) ->
    throw 'This view requires a UserEdit model' unless @model and @model.errorMessages
    { @profileEdit } = options

    # Reference to frequently accessed DOM elements
    @$name = @$ '#user-name'
    @$email = @$ '#user-email'
    @$emailConfirmation = @$ '#user-email-confirmation'
    @$emailSupport = @$ '.settings-email-support'
    @$newPassword = @$ '#user-new-password'
    @$passwordSupport = @$ '.settings-password-support'
    @$currentPassword = @$ '#user-current-password'
    @$passwordConfirmation = @$ '#user-password-confirmation'
    @$newPasswordMessage = @$ ".settings-form-error[data-attr='new_password']"
    @$phone = @$ '#user-phone'
    @$profession = @$ '#user-profession'
    @$submitButton = @$ '#user-edit-submit'

    # Password Edit model
    @passwordEdit = new PasswordEdit()

    # Model events
    @listenTo @model, 'invalid', @renderErrors
    @listenTo @model, 'request', @renderPending
    @listenTo @model, 'sync', @renderSuccess
    @listenTo @model, 'error', @parseErrors
    @listenTo @passwordEdit, 'error', @parseErrors
    @listenTo @passwordEdit, 'invalid', @renderErrors
    @

  parseErrors: (model, resp, options) ->
    @renderErrors model, resp.responseJSON?.detail or resp.responseJSON?.error

  clearErrors: ->
    @$('.settings-form-error')
      .removeClass('settings-form-message').text ''

  renderErrors: (model, errors, options) ->
    _.each errors, (error, key, list) =>
      error = error[0] if _.isArray error
      @$(".settings-form-error[data-attr='#{key}']").text error

  renderPending: (model, xhr, options) =>
    @$submitButton.addClass 'is-loading'

  renderSuccess: (model, resp, options) =>
    @$submitButton.removeClass 'is-loading'

  events:
    'blur #user-name'                 : 'onNameBlur'
    'click .artsy-toggle'             : 'onToggle'
    'click .artsy-toggle-label'       : 'onToggle'
    'keyup #user-email'               : 'onEmailKeyup'
    'blur #user-email'                : 'onEmailBlur'
    'blur #user-email-confirmation'   : 'onEmailConfirmBlur'
    'keyup #user-new-password'        : 'onPasswordKeyup'
    'blur #user-new-password'         : 'onPasswordBlur'
    'blur #user-password-confirmation': 'onPasswordSupportBlur'
    'blur #user-current-password'     : 'onPasswordSupportBlur'
    'click #user-edit-submit'         : 'onSubmit'
    'click #user-link-facebook'       : 'toggleFacebookLinked'
    'click #user-link-twitter'        : 'toggleTwitterLinked'
    'change .publish_to_facebook'     : 'togglePublishToFacebook'
    'form'                            : 'onSubmit'
    # Add specific toggle handlers to trigger on label click
    'click #user-link-facebook + .artsy-toggle-label': 'toggleFacebookLinked'
    'click #user-link-twitter + .artsy-toggle-label' : 'toggleTwitterLinked'

  # TODO: compontent
  onToggle: (event) ->
    event.preventDefault()
    $target = $(event.target)
    if $target.is '.artsy-toggle-label'
      $toggle = $target.prev()
    else
      $toggle = $target.closest 'a.artsy-toggle'

    if $toggle.is "[data-state='on']"
      $toggle.attr 'data-state', 'off'
    else
      $toggle.attr 'data-state', 'on'

  #
  # Name
  #
  onNameBlur: ->
    # Restore the name if made blank
    if _.clean(@$name.val()).length is 0
      @$name.val @model.get 'name'

  #
  # Email
  #
  # On change, if a email is being entered, reveal the rest of
  # the required fields by setting height to auto
  onEmailKeyup: ->
    unless _.clean(@$email.val()) is @model.get('email')
      @$emailSupport.slideDown 'slow'

  # On blur, hide the confirm email field
  onEmailBlur: ->
    cleanValue = _.clean @$email.val()
    if cleanValue.length is 0
      @$email.val @model.get 'email'
    if @$email.val() is @model.get('email')
      @$emailSupport.slideUp('slow')
    return

  onEmailConfirmBlur: ->
    errors = @model.validate { email: @$email.val(), email_confirmation: @$emailConfirmation.val() }
    @renderErrors @model, errors if errors
    return

  #
  # Password
  #
  # On keyup, if a password is being entered, reveal the rest of
  # the required fields by setting height to auto
  onPasswordKeyup: (event) ->
    unless @$newPassword.val() is ''
      @$passwordSupport.slideDown('slow')
      errors = @passwordEdit.validate { new_password: @$newPassword.val() }
      if errors
        @renderErrors @passwordEdit, errors
      else
        @$newPasswordMessage.text ''

  # On blur, if the password value is empty, hide the rest of the password fields again
  onPasswordBlur: ->
    if @$newPassword.val() is ''
      @$passwordSupport.slideUp 'slow'
      @$currentPassword.val ''
      @$passwordConfirmation.val ''

  onPasswordSupportBlur: ->
    errors = @passwordEdit.validate
      new_password: @$newPassword.val()
      password_confirmation: @$passwordConfirmation.val()
      current_password: @$currentPassword.val()
    @renderErrors @passwordEdit, errors if errors
    return

  submitPassword: ->
    values = {}
    unless @$newPassword.val() is ''
      values.new_password = @$newPassword.val()
      values.password_confirmation = @$passwordConfirmation.val()
      values.current_password = @$currentPassword.val()
      @passwordEdit.save values, trigger: true

  #
  # Social Toggles
  #
  toggleFacebookLinked: ->
    if @model.hasLabFeature('Facebook Timeline Integration') && @model.isLinkedTo('facebook')
      @model.set({publish_to_facebook: false}, {silent: true})  # update model to match server-side setting propagation
      @$('.publish_to_facebook').hide()
    @toggleLinked('facebook')

  toggleTwitterLinked: -> @toggleLinked('twitter')

  toggleLinked: (provider) ->
    if @model.isLinkedTo(provider)
      @model.unlinkAccount provider,
        error: (m, res) =>
          @$(".settings-form-error[data-attr='new_password']")
            .removeClass('settings-form-message').text res.responseJSON.error
          @$("#user-link-#{provider}").attr 'data-state', 'on'
    else
      authUrl = "/users/auth/#{provider}"
      params = {}
      params.scope = "publish_actions" if @model.hasLabFeature('Facebook Timeline Integration')
      params['redirect-to'] = location.href
      authUrl += '?' + qs.stringify(params)
      window.location = authUrl

  togglePublishToFacebook: ->
    publish = !@model.get('publish_to_facebook')
    @model.set({ publish_to_facebook: publish }, { silent: true })
    @saveSettings()

  onSubmit: ->
    @clearErrors()
    values = {}
    values.name  = @$name.val()
    values.email = @$email.val()
    if @$emailConfirmation.val()
      values.email_confirmation = @$emailConfirmation.val()
    values.phone = @$phone.val()
    values.profession = @$profession.val()
    values.receive_weekly_email       = @$('#user-weekly-email').is "[data-state='on']"
    values.receive_personalized_email = @$('#user-personalized-email').is "[data-state='on']"
    values.receive_follow_users_email = @$('#user-follows-email').is "[data-state='on']"
    values.receive_offer_emails       = @$('#user-offer-emails').is "[data-state='on']"

    @submitPassword()
    @model.save values, trigger: true
    false
