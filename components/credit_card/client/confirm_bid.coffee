_             = require 'underscore'
ModalView     = require '../../modal/view.coffee'
mediator      = require '../../../lib/mediator.coffee'

template      = -> require('../templates/bid-confirmation.jade') arguments...

module.exports = class ConfirmBid extends ModalView

  className: 'confirm'

  template: template

  defaults: ->
    width: '510px'
    artwork: null
    paddleNumber: null

  initialize: (options = {}) ->
    @options = _.defaults options, @defaults()
    _.extend @templateData,
      artwork: @options.artwork
      paddleNumber: @options.paddleNumber
    super @options
