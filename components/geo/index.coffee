GeoFormatter  = require 'geoformatter'
Backbone      = require 'backbone'

module.exports =
  googleMapsAPI: 'https://maps.googleapis.com/maps/api/js?libraries=places&sensor=true'

  loadGoogleMaps: (cb) ->
    return cb() if @googleMapsLoaded

    @googleMapsLoading = (dfd = $.Deferred()).promise()

    window.googleMapsCallback = =>
      dfd.resolve()
      @googleMapsLoaded = true
      @googleMapsLoading.then cb

    $.getScript @googleMapsAPI + '&callback=googleMapsCallback'

  geoIp: (cb) ->
    new Backbone.Model().fetch
      headers  : null
      url      : 'https://freegeoip.net/json/'
      dataType : 'jsonp'
      success  : (model, response, options) ->
        cb response

  fallback: (cb) ->
    @geoIp (response) =>
      @reverseGeocode response.latitude, response.longitude, cb

  reverseGeocode: (latitude, longitude, cb) ->
    @loadGoogleMaps =>
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
