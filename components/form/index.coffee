_ = require 'underscore'
Backbone = require 'backbone'
Errors = require './errors.coffee'
Serializer = require './serializer.coffee'
Validator = require './validator.coffee'

module.exports = class Form
  _.extend @prototype, Backbone.Events

  constructor: ({ @model, @$form, options}) ->
    { @$submit, @$errors } = _.defaults options or {},
      $submit: @$form.find('button')
      $errors: @$form.find('.js-form-errors')

    @serializer = new Serializer @$form
    @validator = new Validator @$form
    @errors = new Errors @$form

  submit: (e, options = {}) ->
    return unless @validator.valid()
    return if @submitting()

    e?.preventDefault()

    options.error = _.wrap options.error, (error, args...) =>
      @state 'error'
      @reenable false
      @$errors.text @errors.parse args[1]
      error? args...

    @state 'loading'
    @model.save @serializer.data(), options

  submitting: ->
    return @__submitting__ if @__submitting__
    @__submitting__ = true
    @$submit.prop 'disabled', true
    false

  reenable: (reset = false) ->
    @reset() if reset
    @__submitting__ = false
    @$submit.prop 'disabled', false

  reset: ->
    @$form
      .find 'button, input, textarea'
      .attr 'data-state', null

  state: (state) ->
    @$submit.attr 'data-state', state
