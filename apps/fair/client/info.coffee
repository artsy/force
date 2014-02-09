Backbone          = require 'backbone'
sd                = require('sharify').data
infoTemplate      = -> require('../templates/info.jade') arguments...

module.exports = class FairInfo extends Backbone.View

  mapWidth: 300
  mapHeight: 165

  initialize: (options) ->
    @fair = options.fair
    location = @fair.location()
    if @fair.location()
      @displayMap location
    @targetBlankLinks()

  displayMap: (location) ->
    src = location.mapImageSrc(@mapWidth, @mapHeight)
    @$('img.map').attr('src': src) if src
    @$('.fair-map-link').attr
      'href' : location.googleMapsLink()

  targetBlankLinks: ->
    @$('a').attr target: "_blank"
