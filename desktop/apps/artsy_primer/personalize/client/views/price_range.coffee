{ formatMoney } = require 'accounting'
StepView = require './step.coffee'
createSlider = require '../../../../../components/slider/index.coffee'
template = -> require('../../templates/price_range.jade') arguments...

module.exports = class PriceRangeView extends StepView
  formatter: (val, index) ->
    if index is 0
      "#{formatMoney(val, { precision: 0 })}"
    else
      "#{formatMoney(val, { symbol: "", precision: 0 })}"

  onSetSlider: (_, __, [min, max]) =>
    @user.set price_range_min: min, price_range_max: max

  render: ->
    @$el.html template(state: @state, user: @user)
    @slider = createSlider
      $container: @$('.artsy-primer-personalize-slider')
      name: 'Price'
      min: 50
      max: 50000
      range: {
        min: [50, 100]
        '20%': [10000, 500]
        '50%': [25000, 1000]
        max: [50000]
      }
      formatter: @formatter
    @slider.on 'set', @onSetSlider
    this
