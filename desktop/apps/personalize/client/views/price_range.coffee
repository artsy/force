_ = require 'underscore'
StepView = require './step'
template = -> require('../../templates/price_range.jade') arguments...

module.exports = class PriceRangeView extends StepView
  events:
    'click .flipper': 'flip'

  flip: (e) ->
    e.preventDefault()

    (@$flippers ?= $('.flipper')).removeClass 'is-flipped'

    $target = $(e.currentTarget)
    [min, max] = $target.data('value').split ':'
    @user.set price_range_min: min, price_range_max: max

    $target.
      addClass('is-flipped').
      one($.support.transition.end, =>
        @advance()
      ).emulateTransitionEnd 500

  render: ->
    @$el.html template(state: @state, user: @user)
    this
