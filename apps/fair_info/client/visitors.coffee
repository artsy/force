Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class FairInfoVisitors extends Backbone.View

  mapWidth: 410
  mapHeight: 150
  scale: 2
  zoom: 16

  initialize: (options) ->
    @fair = options.fair
    location = @fair.location()
    if @fair.location()
      @displayMap location
    @targetBlankLinks()

  displayMap: (location) ->
    src = location.mapImageSrc(@mapWidth, @mapHeight, @scale, @zoom)
    @$(' .fair-info2-map img.map').attr('src': src) if src
    @$('.fair-map-link').attr
      'href': location.googleMapsLink()

  targetBlankLinks: ->
    @$('a').attr target: "_blank"