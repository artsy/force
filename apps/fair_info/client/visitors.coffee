Backbone = require 'backbone'
sd = require('sharify').data
embeddedMap = require '../../../components/embedded_map/index.coffee'

module.exports = class FairInfoVisitors extends Backbone.View

  mapWidth: 1000
  mapHeight: 250
  scale: 1
  zoom: 16

  events: ->
    'click.handler .fair-info2-get-directions-link': 'onClickShowDirections'

  initialize: (options) ->
    @fair = options.fair
    location = @fair.location()
    if @fair.location()
      @displayMap location
    @targetBlankLinks()

  displayMap: (location) ->
    embeddedMap.init
      location: location,
      id: 'fair-info2-map'

    @$('.fair-info2-map-link').attr
      'href': location.googleMapsLink()

  targetBlankLinks: ->
    @$('a').attr target: "_blank"

  onClickShowDirections: (e) ->
    e.preventDefault()
    destination = $('.fair-info2-directions input').val()
    window.open(@fair.location().mapDirections(destination), '_blank')
