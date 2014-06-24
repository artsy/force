_ = require 'underscore'
Backbone = require 'backbone'
FlashMessage = require '../../../components/flash/index.coffee'
Form = require '../../../components/mixins/form.coffee'

module.exports = class SubForm extends Backbone.View
  _.extend @prototype, Form

  events:
    'submit form': 'submit'
    'click button': 'submit'

  initialize: (options = {}) ->
    { @model, @user } = options

    @cacheSelectors()

  cacheSelectors: ->
    @$form = @$('form')
    @$button = @$('button')
    @$errors = @$('.settings-form-errors')

  preSubmit: (e) ->
    e.preventDefault()

    return false unless @validateForm()
    return false if @formIsSubmitting()

    @$button.attr 'data-state', 'loading'

  submit: (e) ->
    if @preSubmit e
      @model.save @serializeForm(), success: @submitSuccess, error: @submitError

  submitSuccess: (model, response, options) =>
    @reenableForm()
    @user.refresh()
    @$errors.text ''
    new FlashMessage message: 'Your settings have been saved'

  submitError: (model, response, options) =>
    @reenableForm()
    @$button.attr 'data-state', 'error'
    @$errors.text @errorMessage response
