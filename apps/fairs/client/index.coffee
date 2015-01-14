_ = require 'underscore'
sd = require('sharify').data
Fairs = require '../../../collections/fairs.coffee'
Clock = require '../../../components/clock/view.coffee'

module.exports.init = ->
  $clocks = $('.fpff-clock')
  fairs = new Fairs sd.FAIRS
  fairs.map (fair) ->
    clock = new Clock modelName: 'Fair', model: fair, el: $clocks.filter("[data-id='#{fair.id}']")
    clock.start()
