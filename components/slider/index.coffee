{ map, extend } = require 'underscore'
slider = require 'nouislider'
template = -> require('./index.jade') arguments...

module.exports = ({ $container, start, min, max, name, step, append = "", range, formatter = (val) -> val }) ->
  return unless $container
  $container.html template name: name

  el = $container.find('.slider__slider')[0]
  $label = $container.find('.slider__top__label')

  return unless el

  defaultOpts = connect: true, start: start || [min, max]

  if range
    sliderInstance = slider.create el,
      extend defaultOpts,
        range: range
  else
    sliderInstance = slider.create el,
      extend defaultOpts,
        step: step
        range:
          min: min
          max: max

  sliderInstance.on 'update', (values, handle) ->
    formattedValues = map values, formatter
    plus = if parseInt(values[1]) is max then "+" else ""
    $label.html "#{formattedValues.join(" – ")}#{plus}#{append}"

  sliderInstance
