FeedbackView = require './views/feedback.coffee'
modalize = require '../modalize/index.coffee'
defaults = require './defaults.coffee'
FlashMessage = require '../flash/index.coffee'

module.exports = ->
  view = new FeedbackView

  modal = modalize view, defaults

  modal.open()

  view.model.once 'sync', ->
    modal.close ->
      new FlashMessage message: 'Thank you. Your message has been sent.'
