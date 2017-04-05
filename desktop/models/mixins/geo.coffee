_ = require 'underscore'
geo = require '../../components/geo/index'
Location = require '../location'
GeoFormatter = require 'geoformatter'

module.exports =
  location: ->
    new Location @get 'location' if @get 'location'

  approximateLocation: (options = {}) ->
    geo.locate
      accuracy: 'low'
      success: _.wrap options.success, (success, geoFormatted) =>
        unless @hasLocation()
          @setGeo geoFormatted, silent: true
        success?()

  # Gravity runs a delayed job after user saves that geolocates
  # the last_sign_in_ip. So, for now, this is the most accurate way to
  # ascertain whether or not we have a usable location as this is the string
  # that would be displayed as the value in the location input
  hasLocation: ->
    not _.isEmpty(@location()?.cityStateCountry())

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
        city: obj.name or ''
        state: ''
        state_code: ''
        postal_code: ''
        coordinates: null
        country: ''
    else
      @setGeo new GeoFormatter(obj)

  setGeo: (geoFormatted, options = {}) ->
    @set location:
      city: geoFormatted.getCity() or ''
      state: geoFormatted.getState() or ''
      state_code: geoFormatted.getStateCode() or ''
      postal_code: geoFormatted.getPostalCode() or ''
      coordinates: geoFormatted.getCoordinates() or null
      country: geoFormatted.getCountry() or ''
    , options
