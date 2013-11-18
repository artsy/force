_             = require 'underscore'
Backbone      = require 'backbone'
FeedbackView  = require '../../feedback/view.coffee'

module.exports = class FooterView extends Backbone.View
  events:
    'click .mlf-feedback': 'feedback'

  feedback: (e) ->
    e.preventDefault()

    # FeedbackView inherits ModalView which auto-renders
    # and disposes of itself on close
    new FeedbackView(width: '500px')
