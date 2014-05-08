GeoFormatter = require 'geoformatter'
Backbone = require 'backbone'

module.exports =
  geoIp: (cb) ->
    new Backbone.Model().fetch
      headers  : null
      url      : 'http://freegeoip.net/json/'
      dataType : 'jsonp'
      success  : (model, response, options) ->
        cb response

  fallback: (cb) ->
    @geoIp (response) =>
      @reverseGeocode response.latitude, response.longitude, cb

  reverseGeocode: (latitude, longitude, cb) ->
    new google.maps.Geocoder().geocode
      latLng: new google.maps.LatLng latitude, longitude
    , (results, status) ->
      if (status is google.maps.GeocoderStatus.OK) and results[0]
        cb new GeoFormatter results[0]

  locate: (options) ->
    if navigator.geolocation and (options.accuracy is 'high')
      navigator.geolocation.getCurrentPosition (position) =>
        @reverseGeocode position.coords.latitude, position.coords.longitude, options.success
      , => # If the user denies location access
        @fallback options.success
    else
      # If the user's browser doesn't support geolocation
      # or we don't care about accuracy
      @fallback options.success
