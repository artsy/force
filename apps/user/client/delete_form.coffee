_            = require 'underscore'
sd           = require('sharify').data
Backbone     = require 'backbone'
CurrentUser  = require '../../../models/current_user.coffee'
ErrorHelpers = require './error_handling.coffee'

module.exports = class UserDeleteForm extends Backbone.View

  _.extend @prototype, ErrorHelpers

  initialize: (options) ->
    # Reference to frequently accessed DOM elements
    @$confirm = @$ '#user-delete-confirm'
    @$explanation = @$ '#user-delete-explanation'
    @$submitButton = @$ '#user-delete-submit'
    @$hideMe = @$ 'form, .settings-cancel-delete-account-link'
    @$successMessage = @$ '.settings-user-delete-success'
    @$failureMessage = @$ '.settings-user-delete-error'
    @

  events:
    'click #user-delete-confirm': 'onConfirmToggle'
    'click #user-delete-submit'   : 'onSubmit'
    'form'                      : 'onFormSubmit'

  onConfirmToggle: ->
    if @$confirm.is ':checked'
      @$submitButton.removeAttr "disabled"
    else
      @$submitButton.attr "disabled", "disabled"

  # Let's make this really dilberate and for a click on the button
  # Hitting enter can happen unintentionally at times...
  onFormSubmit: ->
    false

  onSubmit: ->
    return false unless @$confirm.is ':checked'
    @$submitButton.addClass 'is-loading'
    @model.destroy
      data:
        explanation: @$explanation.val()
        url: '/user/delete'
      success: =>
        @$successMessage.show()
        $('#main-layout-header').remove()
        @$hideMe.hide()
      error: =>
        @$failureMessage.show()
        @$hideMe.hide()
    false


module.exports.init = ->

  new UserDeleteForm
    el   : $('#settings')
    model: new CurrentUser sd.USER
