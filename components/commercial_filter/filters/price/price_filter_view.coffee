Backbone = require 'backbone'
_ = require 'underscore'
{ formatMoney } = require 'accounting'
createSlider = require '../../../slider/index.coffee'

template = -> require('./index.jade') arguments...

module.exports = class PriceFilterView extends Backbone.View
  classNames: 'cf-price cf-filter'
  min: 50.00
  max: 50000.00

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenToOnce @params, 'change', @render
    @listenTo @params, 'change:price_range', @resetSlider

  render: ->
    @$el.html template()

    _.defer =>
      @_postRender()

  resetSlider: ->
    return if @params.has('price_range')
    @slider.set([@min, @max])

  _postRender: ->
    @slider = createSlider
      $container: @$('.cf-price-slider')
      name: 'Price'
      min: @min
      max: @max
      start: @params.get('price_range')?.split('-')
      step: 100
      formatter: (val) ->
        "#{formatMoney(val, { precision: 0 })}"

    @slider.on 'set', @updateParams

  updateParams: (values) =>
    parsedValues = _.map values, (val) -> parseInt(val)
    if _.isEqual parsedValues, [@min, @max]
      @params.unset 'price_range'
      @params.set page: 1
    else
      @params.set
        price_range: values.join '-'
        page: 1
