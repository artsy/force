Backbone = require 'backbone'
FlashMessage = require '../../flash/index.coffee'

module.exports = class Done extends Backbone.View
  initialize: ({ @modal, @state, @logger }) ->
    @modal.dialog 'slide-out', =>
      message = {
        true: 'Thank you for completing your profile'
        false: 'Your inquiry has been sent'
      }[@logger.hasLoggedThisSession 'confirmation']

      flash = new FlashMessage
        message: message
        backdrop: false

      @listenToOnce flash, 'closed', =>
        @state.trigger 'done'
