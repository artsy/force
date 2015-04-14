_ = require 'underscore'
Backbone = require 'backbone'
FeedbackView = require '../../contact/feedback.coffee'
SpecialistView = require '../../contact/general_specialist.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = class FooterView extends Backbone.View
  events:
    'click .mlf-feedback': 'feedback'
    'click .mlf-specialist': 'openSpecialist'

  initialize: (options) ->
    mediator.on 'open:feedback', @openFeedback, @
    mediator.on 'infinite:scroll:start', @hide, @
    mediator.on 'infinite:scroll:end', @show, @

  feedback: (e) ->
    e.preventDefault()
    mediator.trigger 'open:feedback'

  hide: ->
    @$el.hide()

  show: ->
    @$el.show()

  openFeedback: ->
    new FeedbackView

  openSpecialist: (e) ->
    e.preventDefault()
    new SpecialistView
