Backbone = require 'backbone'
createSlider = require '../../../slider/index.coffee'

template = -> require('./index.jade') arguments...

module.exports = class SizeFilterView extends Backbone.View
  classNames: 'cf-size cf-filter'
  min: 1
  max: 120

  initialize: ({ @params, @attr }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenToOnce @params, 'change', @render
    @listenTo @params, "change:#{@attr}", @resetSlider

  resetSlider: ->
    return if @params.has(@attr)
    @slider.set([@min, @max])

  render: ->
    @$el.html template()

    _.defer =>
      @_postRender()

  _postRender: ->
    range = @params.get(@attr)?.split('-')
    range[1] = @max if range?[1] is '*'
    @slider = createSlider
      $container: @$('.cf-size-slider')
      name: @attr
      min: @min
      max: @max
      start: range
      step: 1
      append: " in"
      formatter: (val) -> "#{parseInt val}"

    @slider.on 'set', @updateParams

  updateParams: (values) =>
    parsedValues = _.map values, (val) -> parseInt(val)
    if _.isEqual parsedValues, [@min, @max]
      @params.set page: 1, silent: true
      @params.unset @attr
    else
      values[1] = '*' if parsedValues[1] is @max
      @params.set
        "#{@attr}": values.join '-'
        page: 1
