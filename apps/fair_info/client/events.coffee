Backbone = require 'backbone'
sd = require('sharify').data
module.exports = class FairInfoEvents extends Backbone.View

  initialize: (options) ->
    # console.log 'fair event: ', options.fairEvent
    # options.fairEvent.fetch
    #   cache: true
    #   error: console.log "there was an error!"
    #   success: ->
    #     console.log 'fetched fairEvent'
    # @fairEvent = options.fairEvent
