Backbone = require 'backbone'
sd = require('sharify').data
geo = require '../../../components/geo/index.coffee'

module.exports = class FairInfoVisitors extends Backbone.View
  events:
    'click .js-get-directions-link': 'showDirections'

  maybeDisplayMap: ->
    geo.loadGoogleMaps =>
      @$map = @$('#fair-info2-map')

      if @model.location().has('coordinates')
        { lat, lng } = @model.location().get('coordinates')
        @displayMap lat, lng
      else
        @$map.remove()

  displayMap: (lat, lng)->
    center = new google.maps.LatLng lat, lng

    map = new google.maps.Map @$map[0],
      disableDefaultUI: true
      center: center
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
      icon: '/show-purple-google-map-marker.png'
      position: center
      map: map

  showDirections: (e) ->
    e.preventDefault()
    destination = $('.fair-info2-directions input').val()
    window.open(@model.location().mapDirections(destination), '_blank')
