StepView            = require './step.coffee'
LocationSearchView  = require '../../../../components/location_search/index.coffee'
GeoFormatter        = require 'geoformatter'
template            = -> require('../../templates/location.jade') arguments...

module.exports = class LocationView extends StepView
  events:
    'click a': 'advance'

  update: (location) ->
    @geo = new GeoFormatter(location)
    @user.set
      location:
        city:         @geo.getCity()
        state:        @geo.getState()
        state_code:   @geo.getStateCode()
        postal_code:  @geo.getPostalCode()
        country:      @geo.getCountry()
        coordinates:  @geo.getCoordinates()
    @advance()

  remove: ->
    @locationSearchView.remove()
    super

  render: ->
    @$el.html template(state: @state)
    @postRender()
    this

  postRender: ->
    @locationSearchView = new LocationSearchView el: @$('#personalize-location-search')
    @locationSearchView.render()
    @listenTo @locationSearchView, 'location:update', @update
