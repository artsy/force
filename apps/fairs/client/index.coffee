_ = require 'underscore'
sd = require('sharify').data
Fairs = require '../../../collections/fairs.coffee'
Clock = require '../../../components/auction_clock/view.coffee'

module.exports.init = ->
  $clocks = $('.fpfc-clock')
  fairs = new Fairs sd.FEATURED_FAIRS
  fairs.map (fair) ->
    clock = new Clock modelName: 'Fair', model: fair, el: $clocks.filter("[data-id='#{fair.id}']")
    clock.start()
