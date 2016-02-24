Backbone = require 'backbone'
{ formatMoney } = require 'accounting'
createSlider = require '../../../slider/index.coffee'

template = -> require('./index.jade') arguments...

module.exports = class SizeFilterView extends Backbone.View
  classNames: 'cf-size cf-filter'
  min: 0
  max: 120

  initialize: ({ @params, @attr }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenToOnce @params, 'change', @render

  render: ->
    @$el.html template()

    _.defer =>
      @_postRender()

  _postRender: ->
    @slider = createSlider
      $container: @$('.cf-size-slider')
      name: @attr
      min: @min
      max: @max
      start: @params.get(@attr)?.split('-')
      step: 1
      append: " in"
      formatter: (val) -> "#{parseInt val}"

    @slider.on 'set', @updateParams

  updateParams: (values) =>
    parsedValues = _.map values, (val) -> parseInt(val)
    if _.isEqual parsedValues, [@min, @max]
      @params.unset @attr
      @params.set page: 1
    else
      @params.set
        "#{@attr}": values.join '-'
        page: 1
