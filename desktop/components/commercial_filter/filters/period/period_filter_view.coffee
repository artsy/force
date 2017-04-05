_ = require 'underscore'
Backbone = require 'backbone'
{ allPeriods, displayPeriods } = require './period_map'
{ numberFormat } = require 'underscore.string'
template = -> require('./index.jade') arguments...

module.exports = class PeriodFilterView extends Backbone.View
  className: 'cf-periods cf-filter'
  events:
    "change [type='checkbox']" : 'togglePeriod'
    'click .cf-periods__view-all': 'showAll'

  initialize: ({ @params, @aggregations }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires an aggregations collection' unless @aggregations?

    # We want to expand the list on initial render if hidden options are pre-selected
    @showAllPeriods = _.difference(@params.get('major_periods'), displayPeriods).length > 0
    @listenTo @params, 'change:major_periods', @render
    @listenTo @aggregations, 'reset', @render

  togglePeriod: (e) ->
    selectedPeriod = $(e.currentTarget).attr('id')
    @params.set page: 1, silent: true
    @params.set { major_periods: @resolvePeriods(selectedPeriod) }

  resolvePeriods: (selectedPeriod) ->
    if selectedPeriod is 'period-all'
      []
    else if _.contains(@params.get('major_periods'), selectedPeriod)
      _.without(@params.get('major_periods'), selectedPeriod)
    else
      @params.get('major_periods').concat selectedPeriod

  findAggregation: (counts, id) ->
    _.find counts, (count) -> count.id is id

  showAll: (e) ->
    e.preventDefault()
    @showAllPeriods = true
    @render()

  render: ->
    @$el.html template
      counts: @aggregations.get('MAJOR_PERIOD')?.get('counts')
      periods: if !@showAllPeriods then displayPeriods else allPeriods
      selected: @params.get('major_periods')
      findAggregation: @findAggregation
      numberFormat: numberFormat
      _: _
      showAllPeriods: @showAllPeriods
