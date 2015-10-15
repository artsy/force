_ = require 'underscore'
Backbone = require 'backbone'
openFeedbackModal = require '../../feedback_modal/index.coffee'
openSpecialistModal = require '../../simple_contact/specialist.coffee'
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
    openFeedbackModal()

  openSpecialist: (e) ->
    e.preventDefault()
    openSpecialistModal()
