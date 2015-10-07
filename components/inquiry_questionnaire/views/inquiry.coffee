Q = require 'bluebird-q'
_ = require 'underscore'
StepView = require './step.coffee'
Form = require '../../form/index.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
template = -> require('../templates/inquiry.jade') arguments...

module.exports = class Inquiry extends StepView
  template: (data) ->
    template _.extend data,
      message: @inquiry.get('message')

  __events__:
    'click button': 'serialize'

  serialize: (e) ->
    e.preventDefault()

    form = new Form model: @inquiry, $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    Q.all [
      @inquiry.save _.extend { contact_gallery: true }, form.data()
      @user.save @inquiry.pick('name', 'email')
    ]
      .done =>
        @next()
      , (e) ->
        form.error null, e
