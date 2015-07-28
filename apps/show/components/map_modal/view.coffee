_ = require 'underscore'
Backbone = require 'backbone'
geo = require '../../../../components/geo/index.coffee'
colors = require '../../../../components/stylus_lib/colors'
{ getMapLink } = require '../../../../components/util/google_maps.coffee'
template = -> require('./template.jade') arguments...

module.exports = class MapModalView extends Backbone.View
  className: 'map-modal'

  events:
    'click input': 'selectAll'

  postRender: -> _.defer =>
    { lat, lng } = @model.location().get 'coordinates'

    $map = @$('.js-map-modal-show-map')

    geo.loadGoogleMaps =>
      center = new google.maps.LatLng lat, lng

      map = new google.maps.Map $map[0],
        disableDefaultUI: true
        center: center
        zoom: 16
        styles: [
          stylers: [
            { lightness: 50 }
            { saturation: -100 }
          ]
        ]

      marker = new google.maps.Marker
        icon: '/show-purple-google-map-marker.png'
        position: center
        map: map

  selectAll: (e) ->
    $(e.currentTarget).select()

  render: ->
    @$el.html template
      show: @model
      googleMapsLink: getMapLink q: @model.location().getMapsLocation()
    @postRender()
    this
