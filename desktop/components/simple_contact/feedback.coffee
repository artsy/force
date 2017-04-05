FeedbackView = require './views/feedback'
modalize = require '../modalize/index'
defaults = require './defaults'
FlashMessage = require '../flash/index'

module.exports = ->
  view = new FeedbackView

  modal = modalize view, defaults

  modal.open()

  view.model.once 'sync', ->
    modal.close ->
      new FlashMessage message: 'Thank you. Your message has been sent.'
