Backbone = require 'backbone'
setupClocks = require './clocks.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports.init = ->
  Backbone.history.start(pushState: true)

  setupClocks [sale]

  mediator.once 'clock:is-almost-over', ->
    $('.js-auction-clock').addClass 'is-almost-over'