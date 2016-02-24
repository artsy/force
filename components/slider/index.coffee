{ map } = require 'underscore'
slider = require 'nouislider'
template = -> require('./index.jade') arguments...

module.exports = ({ $container, start, min, max, name, step, formatter = (val) -> val }) ->
  return unless $container
  $container.html template name: name

  el = $container.find('.slider__slider')[0]
  $label = $container.find('.slider__top__label')

  sliderInstance = slider.create el,
    start: start || [min, max]
    connect: true
    step: step
    range:
      min: min
      max: max

  sliderInstance.on 'update', (values, handle) ->
    formattedValues = map values, formatter
    $label.html formattedValues.join("-")

  sliderInstance
