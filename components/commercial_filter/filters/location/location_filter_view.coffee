_ = require 'underscore'
Backbone = require 'backbone'
{ fullyQualifiedLocations } = require './location_map.coffee'
{ numberFormat } = require 'underscore.string'
template = -> require('./index.jade') arguments...

module.exports = class LocationFilterView extends Backbone.View
  className: 'cf-locations cf-filter'
  events:
    "change [type='checkbox']" : 'toggleLocation'
    'click .cf-periods__view-all': 'showAll'

  initialize: ({ @params, @aggregations }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires an aggregations collection' unless @aggregations?

    @listenTo @params, 'change:partner_cities', @render
    @listenTo @aggregations, 'reset', @render

  toggleLocation: (e) ->
    selectedLocation = $(e.currentTarget).attr('id')
    @params.set page: 1, silent: true
    @params.set { partner_cities: @resolveLocations(selectedLocation) }

  resolveLocations: (selectedLocation) ->
    if selectedLocation is 'location-all'
      []
    else if _.contains(@params.get('partner_cities'), selectedLocation)
      _.without(@params.get('partner_cities'), selectedLocation)
    else
      @params.get('partner_cities').concat selectedLocation

  displayLocation: (location) ->
    commaIndex = location.indexOf(',')
    location.substring(0, commaIndex)

  findAggregation: (counts, id) ->
    _.find counts, (count) -> count.id is id

  render: ->
    @$el.html template
      counts: @aggregations.get('PARTNER_CITY')?.get('counts')
      locations: fullyQualifiedLocations
      selected: @params.get('partner_cities')
      findAggregation: @findAggregation
      numberFormat: numberFormat
      _: _
      displayLocation: @displayLocation