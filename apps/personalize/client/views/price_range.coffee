_             = require 'underscore'
StepView      = require './step.coffee'
priceBuckets  = require '../mixins/price_buckets.coffee'
template      = -> require('../../templates/price_range.jade') arguments...

module.exports = class PriceRangeView extends StepView
  events:
    'click .flipper': 'flip'

  flip: (e) ->
    e.preventDefault()

    (@$flippers ?= $('.flipper')).removeClass 'is-flipped'

    @user.set 'price_range', ($target = $(e.currentTarget)).data('value')

    $target.
      addClass('is-flipped').
      one($.support.transition.end, =>
        @advance()
      ).emulateTransitionEnd 500

  render: ->
    @$el.html template(state: @state, prices: priceBuckets)
    this
