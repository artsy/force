_ = require 'underscore'
Backbone = require 'backbone'
openFeedback = require '../../simple_contact/feedback.coffee'
SpecialistView = require '../../contact/general_specialist.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = class FooterView extends Backbone.View
  events:
    'click .mlf-feedback': 'openFeedback'
    'click .mlf-specialist': 'openSpecialist'

  initialize: ->
    @listenTo mediator, 'infinite:scroll:start', @hide
    @listenTo mediator, 'infinite:scroll:end', @show

  hide: ->
    @$el.hide()

  show: ->
    @$el.show()

  openFeedback: (e) ->
    e.preventDefault()
    openFeedback()

  openSpecialist: (e) ->
    e.preventDefault()
    new SpecialistView
