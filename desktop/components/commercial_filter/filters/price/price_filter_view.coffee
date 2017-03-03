Backbone = require 'backbone'
_ = require 'underscore'
{ formatMoney } = require 'accounting'
createSlider = require '../../../slider/index.coffee'

template = -> require('./index.jade') arguments...

module.exports = class PriceFilterView extends Backbone.View
  classNames: 'cf-price cf-filter'

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenToOnce @params, 'change', @render
    @listenTo @params, 'change:price_range', @resetSlider

    { @min, @max } = @params.get('ranges').price_range

  render: ->
    @$el.html template()

    _.defer =>
      @_postRender()

  resetSlider: ->
    return if @params.has('price_range')
    @slider.set([@min, @max])

  _postRender: ->
    range = @params.get('price_range')?.split('-')
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
    debugger
    @slider.on 'set', @updateParams

  updateParams: (values) =>
    parsedValues = _.map values, (val) -> parseInt val

    if _.isEqual parsedValues, [@min, @max]
      @params.set page: 1, silent: true
      @params.unset 'price_range'
    else
      values[1] = '*' if parsedValues[1] is @max
      @params.set
        price_range: values.join '-'
        page: 1
