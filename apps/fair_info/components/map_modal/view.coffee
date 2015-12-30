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
    address = '401 Broadway New York, NY'
    $map = @$('.js-map-modal-fair-event-map')

    geo.loadGoogleMaps =>
      geocoder = new google.maps.Geocoder()

      geocoder.geocode( {address: address}, (result, status) ->

        if (status == google.maps.GeocoderStatus.OK)
          @result = result
          mapOptions =
            center: {lat: -25.363, lng: 131.044}
            zoom: 16
            draggable: false
            zoomControl: false
            scrollWheel: false
            styles: [
              stylers: [
                { lightness: 50 }
                { saturation: -100 }
              ]
            ]

          marker = new google.maps.Marker
            icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
            position: result[0].geometry.location

          map = new google.maps.Map $map[0], mapOptions

          marker.setMap(map)

          $('.js-map-modal-fair-event-map').css({
              height: '400px'
              width: '400px'
            })
      )

  selectAll: (e) ->
    $(e.currentTarget).select()

  render: ->
    @$el.html template
      fairEvent: @model
      googleMapsLink: getMapLink q: '401 Broadway New York, NY' #@model.location().getMapsLocation()
    @postRender()
    this
