StepView = require './step.coffee'
Form = require '../../form/index.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
template = -> require('../templates/inquiry.jade') arguments...

module.exports = class Inquiry extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'serialize'

  initialize: ->
    @inquiry = new ArtworkInquiry
    super

  serialize: (e) ->
    form = new Form model: @inquiry, $form: @$('form')
    form.submit e, success: =>
      @next()
