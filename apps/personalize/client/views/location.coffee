_                   = require 'underscore'
StepView            = require './step.coffee'
LocationSearchView  = require '../../../../components/location_search/index.coffee'
GeoFormatter        = require 'geoformatter'
template            = -> require('../../templates/location.jade') arguments...

module.exports = class LocationView extends StepView
  events:
    'click a': 'advance'

  update: (location) ->
    @geo = new GeoFormatter(location)
    @user.setGeo @geo
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
    @locationSearchView.render @user.location().cityStateCountry()
    @listenTo @locationSearchView, 'location:update', @update
