_ = require 'underscore'

module.exports = (state) -> _.defer ->
  steps = state.get('steps')
    .map((step) -> if _.isObject(step) then _.keys(step)[0] else step)
    .join(' > ')

  current = new RegExp "(#{state.current()})", 'ig'
  html = steps.replace current, '<span style="background-color: yellow">$1</span>'

  $('.js-debug').html html
