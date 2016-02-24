{ map } = require 'underscore'
slider = require 'nouislider'
template = -> require('./index.jade') arguments...

module.exports = ({ $container, start, min, max, name, step, append = "", formatter = (val) -> val }) ->
  return unless $container
  $container.html template name: name

  el = $container.find('.slider__slider')[0]
  $label = $container.find('.slider__top__label')

  return unless el

  sliderInstance = slider.create el,
    start: start || [min, max]
    connect: true
    step: step
    range:
      min: min
      max: max

  sliderInstance.on 'update', (values, handle) ->
    formattedValues = map values, formatter
    plus = if parseInt(values[1]) is max then "+" else ""
    $label.html "#{formattedValues.join("-")}#{plus}#{append}"

  sliderInstance
