_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../../mixins/form.coffee'
CurrentUser = require '../../../models/current_user.coffee'
mediator = require '../../../lib/mediator.coffee'
sd = require('sharify').data

template = -> require('../templates/form.jade') arguments...
successTemplate = -> require('../templates/success.jade') arguments...

module.exports = class SpecialistView extends Backbone.View
  _.extend @prototype, Form
  className: 'main-side-margin contact-modal-height'

  events:
    "click #modal-contact-submit": "submitForm"

  initialize: ->
    @listenTo @collection, 'sync', @render

  render: ->
    @$el.html template
      user: CurrentUser.orNull()
      representative: @collection.first()
      placeholder: 'Leave your comments'

  submitForm: (e) ->
    e.preventDefault()
    return unless @validateForm(@$('form'))
    return if @formIsSubmitting()

    $.ajax
      url: "#{sd.API_URL}/api/v1/feedback"
      data: @serializeForm(@$('form'))
      type: "POST"
      success: =>
        @$el.html successTemplate
        setTimeout(->
          mediator.trigger 'modal:close'
        , 2000)

