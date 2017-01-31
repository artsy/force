Backbone = require 'backbone'
_ = require 'underscore'
{ formatMoney } = require 'accounting'
createSlider = require '../../../slider/index.coffee'

template = -> require('./index.jade') arguments...

module.exports = class RangeFilterView extends Backbone.View
  classNames: 'cf-price cf-filter'

  initialize: ({ @params, @rangeType }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires a range type' unless @rangeType?

    @listenToOnce @params, 'change', @render
    @listenTo @params, "change:#{@rangeType}", @resetSlider

    { @min, @max } = @params.get('ranges')[@rangeType]

  render: ->
    @$el.html template()

    _.defer =>
      @_postRender()

  resetSlider: ->
    return if @params.has(@rangeType)
    @slider.set([@min, @max])

  _postRender: ->
    range = @params.get(@rangeType)?.split('-')
    range[1] = @max if range?[1] is '*'
    @slider = createSlider
      $container: @$('.cf-price-slider')
      name: 'Price'
      min: @min
      max: @max
      start: range
      range: {
        min: [@min, 100]
        '20%': [10000, 500]
        '50%': [25000, 1000]
        max: [@max]
      }
      formatter: (val, index) ->
        if index is 0
          "#{formatMoney(val, { precision: 0 })}"
        else
          "#{formatMoney(val, { symbol: "", precision: 0 })}"

    @slider.on 'set', @updateParams

  updateParams: (values) =>
    parsedValues = _.map values, (val) -> parseInt(val) * 100
    if _.isEqual parsedValues, [@min, @max]
      @params.set page: 1, silent: true
      @params.unset @rangeType
    else
      parsedValues[1] = '*' if parsedValues[1] is @max
      @params.set
        "#{@rangeType}": parsedValues.join '-'
        page: 1
