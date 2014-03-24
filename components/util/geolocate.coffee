GeoFormatter = require 'geoformatter'

module.exports =
  geoIp: (cb) ->
    $.ajax
      headers: [] # Remove the X-ACCESS-TOKEN header
      url: 'http://freegeoip.net/json/'
      success: cb

  fallback: (cb) ->
    @geoIp (response) =>
      @reverseGeocode response.latitude, response.longitude, cb

  reverseGeocode: (latitude, longitude, cb) ->
    new google.maps.Geocoder().geocode
      latLng: new google.maps.LatLng latitude, longitude
    , (results, status) ->
      if (status is google.maps.GeocoderStatus.OK) and results[0]
        cb new GeoFormatter results[0]

  locate: (cb) ->
    if navigator.geolocation
      navigator.geolocation.getCurrentPosition (position) =>
        @reverseGeocode position.coords.latitude, position.coords.longitude, cb
      , => # If the user denies location access
        @fallback cb
    else
      # If the user's browser doesn't support geolocation
      @fallback cb

  geoToUser: (geo) ->
    city        : geo.getCity()
    state       : geo.getState()
    state_code  : geo.getStateCode()
    postal_code : geo.getPostalCode()
    country     : geo.getCountry()
    coordinates : geo.getCoordinates()
