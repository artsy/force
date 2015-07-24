_ = require 'underscore'
StepView = require './step.coffee'
Form = require '../../form/index.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
defaultMessage = require '../../contact/default_message.coffee'
template = -> require('../templates/inquiry.jade') arguments...

module.exports = class Inquiry extends StepView
  template: (data) ->
    template _.extend data,
      message: @inquiry.get('message')

  __events__:
    'click button': 'serialize'

  serialize: (e) ->
    @inquiry.set
      contact_gallery: true
      anonymous_session_id: @user.related().collectorProfile.get('anonymous_session_id')

    form = new Form model: @inquiry, $form: @$('form')
    form.submit e, {}, 'set'

    @next()
