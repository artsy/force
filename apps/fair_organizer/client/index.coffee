_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Fair = require '../../../models/fair.coffee'
Clock = require '../../../components/auction_clock/view.coffee'

module.exports.init = ->
  # @fair = new Fair sd.FAIR

  # @clock = new Clock
  #   modelName: "Fair"
  #   model: @fair
  #   el: $('.fair-organizer-top__countdown__clock')
  # @clock.start()