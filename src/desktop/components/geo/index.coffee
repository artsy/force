GeoFormatter = require 'geoformatter'
Backbone = require 'backbone'
{ GOOGLE_MAPS_API_KEY } = require('sharify').data

module.exports =
  googleMapsAPI: "https://maps.googleapis.com/maps/api/js?key=#{GOOGLE_MAPS_API_KEY}&libraries=places&sensor=true&language=en"

  loadGoogleMaps: (cb) ->
    if @googleMapsLoading? and @googleMapsLoading.state() is 'resolved'
      cb()
      return

    alreadyLoading = @googleMapsLoading?

    @googleMapsLoading ?= $.Deferred()
    @googleMapsLoading.then cb
    window.googleMapsCallback = =>
      @googleMapsLoading.resolve()

    return if alreadyLoading

    $.getScript "#{@googleMapsAPI}&callback=googleMapsCallback"

    return

  geoIp: (cb) ->
    new Backbone.Model().fetch
      headers: null
      url: 'https://freegeoip.net/json/'
      dataType: 'jsonp'
      success: (model, response, options) ->
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

  lookUpAddress: (address, cb) ->
    @loadGoogleMaps =>
      new google.maps.Geocoder().geocode
        address: address
      , (result, status) ->
        if (status == google.maps.GeocoderStatus.OK) and result[0]
          cb {
            lat: result[0].geometry.location.lat()
            lng: result[0].geometry.location.lng()
          }
