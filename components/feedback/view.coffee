_           = require 'underscore'
sd          = require('sharify').data
Backbone    = require 'backbone'
ModalView   = require '../modal/view.coffee'
mediator    = require '../../lib/mediator.coffee'
Feedback    = require '../../models/feedback.coffee'
Form        = require '../mixins/form.coffee'
template    = -> require('./template.jade') arguments...

module.exports = class FeedbackView extends ModalView

  _.extend @prototype, Form

  template: -> template()

  className: 'feedback'

  events: -> _.extend super,
    'submit form': 'submit'
    'click #feedback-submit': 'submit'

  submit: (e) ->
    e.preventDefault()

    $form = @$('form')

    if @validateForm($form)
      $submit = @$('#feedback-submit')
      $submit.attr 'data-state', 'loading'
      new Feedback().save @serializeForm($form),
        success:  -> mediator.trigger 'modal:close'
        error:    -> $submit.attr 'data-state', 'error'
