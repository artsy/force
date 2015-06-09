_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
Form = require '../../mixins/form.coffee'
CurrentUser = require '../../../models/current_user.coffee'

module.exports = class ContactView extends Backbone.View
  _.extend @prototype, Form

  className: 'scontact'

  template: (->)

  events:
    'click button': 'submit'

  initialize: ->
    @user = CurrentUser.orNull()

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    (@$submit ?= @$('button'))
      .attr 'data-state', 'loading'

    @model.save @serializeForm(),
      error: (model, response, options) =>
        @reenableForm()
        @$submit.attr 'data-state', 'error'
        (@$errors ?= @$('.js-form-errors'))
          .text @errorMessage(response)

  render: ->
    @$el.html @template
      user: @user
    this
