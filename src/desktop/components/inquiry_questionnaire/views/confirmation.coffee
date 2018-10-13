Backbone = require 'backbone'
FlashMessage = require '../../flash/index.coffee'

module.exports = class Confirmation extends Backbone.View
  initialize: ({ @modal, @state }) ->
    @modal.dialog 'slide-out', =>
      flash = new FlashMessage
        message: 'Your Message Has Been Sent'
        backdrop: false

      @listenToOnce flash, 'closed', =>
        @modal.dialog 'slide-in', =>
          @state.next()
