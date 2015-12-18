sd = require('sharify').data
mapapi = require('google-maps-api')(sd.GOOGLE_MAPS_API_KEY)
geocode = require('google-maps-api/geocode')

module.exports =
  init: ({ location, id }) ->
    return unless sd.GOOGLE_MAPS_API_KEY

    mapapi().then ->
      if location.get('coordinates')
        { lat, lng } = location.get('coordinates')
        latlng = new google.maps.LatLng(lat, lng)
        displayMap latlng, id
      else if location.get('address')
        geocode({ address: location.get('address') }).then (result) ->
          displayMap result[0].geometry.location, id
      else
        $("##{id}").remove()


  displayMap: displayMap = (latlng, id)->
    mapOptions =
      zoom: 16,
      center: latlng
      disableDefaultUI: true
      draggable: false
      zoomControl: false
      scrollWheel: false
      styles: [
        {
          featureType: "all",
          stylers: [
            { saturation: -100, lightness: 50 }
          ]
        }
      ]

    marker = new google.maps.Marker
      position: latlng
      icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'

    map = new google.maps.Map(document.getElementById(id), mapOptions)

    marker.setMap(map)
