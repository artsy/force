_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
Form = require '../../../components/mixins/form.coffee'
FlashMessage = require '../../../components/flash/index.coffee'

errorMessage = """
  An error prevented us from deleting your account through this form.
  Please <a href='javascript:window.location.reload()'>reload the page and try again</a>.
  If the problem persists, contact <a href='mailto:support@artsy.net'>support@artsy.net</a>.
"""

module.exports = class UserDeleteForm extends Backbone.View
  _.extend @prototype, Form

  events:
    'click .settings-checkbox-label': 'toggleCheckbox'
    'click #user-delete-confirm': 'toggleSubmit'
    'submit form': 'submit'
    'click button': 'submit'

  initialize: ->
    @cacheSelectors()

  cacheSelectors: ->
    @$form = @$('form')
    @$button = @$('button')
    @$confirm = @$('input:checkbox')
    @$explanation = @$('textarea')
    @$errors = @$('.settings-form-errors')

  toggleCheckbox: (e) ->
    $(e.currentTarget).siblings().find('label').click()

  toggleSubmit: ->
    @$button.prop 'disabled', !@$confirm.is(':checked')

  submit: (e) ->
    e.preventDefault()

    return false unless @$confirm.is ':checked'
    return false unless @validateForm()
    return false if @formIsSubmitting()

    @$button.attr 'data-state', 'loading'

    $.ajax
      method: 'DELETE'
      url: @model.url()
      data:
        access_token: @model.get 'accessToken'
        explanation: @$explanation.val()
        url: '/user/delete'
      success: =>
        new FlashMessage message: "<a href='/users/sign_out'>Your account has been deleted, click here to continue</a>.", autoclose: false
      error: =>
        @$errors.html errorMessage
      complete: =>
        @$button.attr 'data-state', null

module.exports.init = ->
  new UserDeleteForm
    el: $('#settings')
    model: new CurrentUser sd.USER
