_     = require 'underscore'
geo   = require '../../components/geo/index.coffee'

module.exports =
  approximateLocation: ->
    geo.locate
      accuracy : 'low'
      success  : (geoFormatted) =>
        if _.isEmpty @get('location')?.coordinates
          @setGeo geoFormatted

  setGeo: (geoFormatted) ->
    @set location:
      city        : geoFormatted.getCity() or ''
      state       : geoFormatted.getState() or ''
      state_code  : geoFormatted.getStateCode() or ''
      postal_code : geoFormatted.getPostalCode() or ''
      coordinates : geoFormatted.getCoordinates() or null
      country     : geoFormatted.getCountry() or ''
