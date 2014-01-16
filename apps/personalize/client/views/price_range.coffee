_         = require 'underscore'
StepView  = require './step.coffee'
template  = -> require('../../templates/price_range.jade') arguments...

module.exports = class PriceRangeView extends StepView
  events:
    'click .flipper': 'flip'

  initialize: (options) ->
    @prices = [
      { display: 'Under $500', value: '-1:500' },
      { display: 'Up to $2,500', value: '-1:2500' },
      { display: 'Up to $5,000', value: '-1:5000' },
      { display: 'Up to $10,000', value: '-1:10000' },
      { display: 'Up to $25,000', value: '-1:25000' },
      { display: 'Up to $50,000', value: '-1:50000' },
      { display: 'Up to $100,000', value: '-1:100000' },
      { display: '$100,000+', value: '100000:1000000000000' }
    ]

    super

  flip: (e) ->
    e.preventDefault()

    (@$flippers ||= $('.flipper')).removeClass 'is-flipped'

    @user.set 'price_range', ($target = $(e.currentTarget)).data('value')

    $target.
      addClass('is-flipped').
      one($.support.transition.end, =>
        @advance()
      ).emulateTransitionEnd 500

  render: ->
    @$el.html template(state: @state, prices: @prices)
    this
