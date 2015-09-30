StepView = require './step.coffee'
FlashMessage = require '../../flash/index.coffee'

module.exports = class Confirmation extends StepView
  template: -> ''

  initialize: ({ @modal, @state }) ->
    @modal.dialog 'slide-out', =>
      flash = new FlashMessage
        message: 'Your inquiry has been sent'
        backdrop: false

      @listenToOnce flash, 'closed', =>
        @modal.dialog 'slide-in', =>
          @next()
