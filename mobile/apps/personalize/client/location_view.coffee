StepView = require './step_view'
LocationSearchView = require('../../../components/location_search/index').LocationSearchView
GeoFormatter = require 'geoformatter'
template = -> require('../templates/location.jade') arguments...

class LocationView extends StepView
  update: (location) ->
    @geo = new GeoFormatter(location)
    @user.set
      location:
        city: @geo.getCity()
        state: @geo.getState()
        state_code: @geo.getStateCode()
        postal_code: @geo.getPostalCode()
        country: @geo.getCountry()
        coordinates: @geo.getCoordinates()
    @advance()

  blur: -> # Ignore

  postRender: ->
    # Render the location search
    @locationSearchView = new LocationSearchView(el: @$('#location-search-view'))
    @locationSearchView.render()
    @listenTo @locationSearchView, 'location:update', @update

  render: ->
    @$el.html template(state: @state.toJSON())
    @postRender()
    this

  remove: ->
    @locationSearchView.remove()
    super

module.exports.LocationView = LocationView
