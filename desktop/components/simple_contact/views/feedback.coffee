ContactView = require './index.coffee'
Feedback = require '../../../models/feedback.coffee'
template = -> require('../templates/feedback.jade') arguments...

module.exports = class FeedbackView extends ContactView
  template: ->
    template arguments...

  initialize: ->
    @model = new Feedback
    super
