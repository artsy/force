_ = require 'underscore'
Backbone = require 'backbone'
{ fullyQualifiedLocations } = require './location_map.coffee'
{ numberFormat } = require 'underscore.string'
TypeaheadView = require '../../../../components/typeahead/view.coffee'
{ GEOCODED_CITIES } = require('sharify').data
{ cleanDiacritics } = require 'underscore.string'
template = -> require('./index.jade') arguments...
searchItemTemplate = -> require('./search_item.jade') arguments...
emptyTemplate = -> require('./empty.jade') arguments...

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

    @additionalLocations = @params.get('partner_cities') || []

  bloodHound: ->
    cities = _.pluck GEOCODED_CITIES, 'name'
    @hound = new Bloodhound
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: @queryTokenizer,
      local: _.map(cities, (city) => { value: cleanDiacritics(city), display: city })
    @hound.initialize()
    @hound

  queryTokenizer: (q) =>
    Bloodhound.tokenizers.whitespace(cleanDiacritics(q))

  setupTypeahead: ->
    $input = @$('input#cf-location-search-bar-input')
    $input.typeahead({}, {
      source: @bloodHound().ttAdapter()
      name: 'commercial-filtering'
      templates:
        suggestion: @suggestionTemplate
        empty: @noResultsTemplate
        header: ''
    })
    $input.on 'typeahead:selected', @onDropdownSelection

  onDropdownSelection: (e, selectedLocation) =>
    if selectedLocation?.display?
      selectedCity = selectedLocation.display
      return if _.contains(@params.get('partner_cities'), selectedCity)
      partner_cities = @params.get('partner_cities').concat selectedCity
      @additionalLocations.push selectedCity
      @params.set { partner_cities: partner_cities, aggregation_partner_cities: @additionalLocations }

  allLocations: ->
    _.uniq(fullyQualifiedLocations.concat @additionalLocations.concat @params.get('partner_cities'))

  noResultsTemplate: (result) =>
    emptyTemplate query: result.query

  suggestionTemplate: (item) =>
    searchItemTemplate item: item

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
      locations: @allLocations()
      selected: @params.get('partner_cities')
      findAggregation: @findAggregation
      numberFormat: numberFormat
      _: _
      displayLocation: @displayLocation
    @setupTypeahead()
