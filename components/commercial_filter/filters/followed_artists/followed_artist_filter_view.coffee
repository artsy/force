_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class FollowedArtistsFilterView extends Backbone.View
  className: 'cf-followed-artists cf-filter'
  events:
    "change [type='checkbox']" : 'toggleFollowedArtists'

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?
    @listenTo @params, 'change:include_artworks_by_followed_artists', @render

  toggleFollowedArtists: (e) ->
    selectedPeriod = $(e.currentTarget).attr('id')
    @params.set page: 1, silent: true
    @params.set { major_periods: @resolvePeriods(selectedPeriod) }

  render: ->
    @$el.html template
      counts: @aggregations.get('MAJOR_PERIOD')?.get('counts')
      periods: if !@showAllPeriods then displayPeriods else allPeriods
      selected: @params.get('major_periods')
      findAggregation: @findAggregation
      numberFormat: numberFormat
      _: _
      showAllPeriods: @showAllPeriods