Backbone = require 'backbone'
FlashMessage = require '../../flash/index'

module.exports = class Confirmation extends Backbone.View
  initialize: ({ @modal, @state }) ->
    @modal.dialog 'slide-out', =>
      flash = new FlashMessage
        message: 'Your inquiry has been sent'
        backdrop: false

      @listenToOnce flash, 'closed', =>
        @modal.dialog 'slide-in', =>
          @state.next()
