_             = require 'underscore'
geo           = require '../../components/geo/index.coffee'
Location      = require '../location.coffee'
GeoFormatter  = require 'geoformatter'

module.exports =
  location: ->
    new Location @get 'location' if @get 'location'

  approximateLocation: ->
    geo.locate
      accuracy : 'low'
      success  : (geoFormatted) =>
        if _.isEmpty @get('location')?.coordinates
          @setGeo geoFormatted

  setLocation: (obj) ->
    # Google will return an object with nothing but a name property if it
    # doesn't know what to do with it. Geoformatter will choke on those objects.
    #
    # Google will also return { name: "" } if you submit an empty result
    keys = _.keys obj
    if (keys.length is 1) and (keys[0] is 'name')
      # We just set the name as the "city"
      # this also lets the user remove their location
      @set location:
        city        : obj.name or ''
        state       : ''
        state_code  : ''
        postal_code : ''
        coordinates : null
        country     : ''
    else
      @setGeo new GeoFormatter(obj)

  setGeo: (geoFormatted) ->
    @set location:
      city        : geoFormatted.getCity() or ''
      state       : geoFormatted.getState() or ''
      state_code  : geoFormatted.getStateCode() or ''
      postal_code : geoFormatted.getPostalCode() or ''
      coordinates : geoFormatted.getCoordinates() or null
      country     : geoFormatted.getCountry() or ''
