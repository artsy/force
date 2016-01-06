_ = require 'underscore'
Backbone = require 'backbone'
geo = require '../geo/index.coffee'
colors = require '../stylus_lib/colors'
{ getMapLink } = require '../util/google_maps.coffee'

module.exports = class MapModalView extends Backbone.View
  className: 'map-modal'

  events:
    'click input': 'selectAll'

  initialize: ({ @model, @latlng, @template, @location, @mapElement })->
    # no op

  postRender: -> _.defer =>
    $map = @$(@mapElement)

    geo.loadGoogleMaps =>
      map = new google.maps.Map $map[0],
        disableDefaultUI: true
        center: @latlng
        zoom: 16
        styles: [
          stylers: [
            { lightness: 50 }
            { saturation: -100 }
          ]
        ]

      marker = new google.maps.Marker
        icon: '/show-purple-google-map-marker.png'
        position: @latlng
        map: map

  selectAll: (e) ->
    $(e.currentTarget).select()

  render: ->
    @$el.html @template
      model: @model
      googleMapsLink: getMapLink q: @location
      location: @location
    @postRender()
    this
