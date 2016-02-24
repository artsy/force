Backbone = require 'backbone'
{ formatMoney } = require 'accounting'
createSlider = require '../../../slider/index.coffee'

template = -> require('./index.jade') arguments...

module.exports = class PriceFilterView extends Backbone.View
  classNames: 'cf-price cf-filter'
  min: 0
  max: 50000

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenToOnce @params, 'change', @render

  render: ->
    @$el.html template()

    _.defer =>
      @_postRender()

  _postRender: ->
    @slider = createSlider
      $container: @$('#cf-price-slider')
      name: 'Price'
      min: @min
      max: @max
      start: @params.get('price_range')?.split('-')
      step: 100
      formatter: (val) ->
        "#{formatMoney(val, { precision: 0 })}"

    @slider.on 'set', @updateParams

  updateParams: (values) =>
    @params.set price_range: values.join '-'
