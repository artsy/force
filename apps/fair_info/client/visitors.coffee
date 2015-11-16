Backbone = require 'backbone'
sd = require('sharify').data
visitorsTemplate = -> require('../templates/visitors.jade') arguments...
# analytics = require '../../../lib/analytics.coffee'

module.exports = class FairInfoVisitors extends Backbone.View

  mapWidth: 800
  mapHeight: 300

  initialize: (options) ->
    console.log 'initialize FairInfoVisitors'
    @fair = options.fair
    location = @fair.location()
    console.log 'set location from fair'
    if @fair.location()
      @displayMap location
    @targetBlankLinks()

  displayMap: (location) ->
    src = location.mapImageSrc(@mapWidth, @mapHeight)
    @$(' .fair-info2-map img.map').attr('src': src) if src
    @$('.fair-map-link').attr
      'href': location.googleMapsLink()

  targetBlankLinks: ->
    @$('a').attr target: "_blank"