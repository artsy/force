StepView = require './step_view.coffee'
template = -> require('../templates/price_range.jade') arguments...

class PriceRangeView extends StepView
  initialize: (options) ->
    super

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

  events:
    'click a': 'setRange'

  setRange: (e) ->
    [min, max] = $(e.target).data('value').split ':'
    @user.unset('price_range')
    @user.set price_range_min: min, price_range_max: max
    @done()

  done: ->
    @state.trigger 'done'

  render: ->
    @$el.html template(state: @state.toJSON(), prices: @prices)
    this

module.exports.PriceRangeView = PriceRangeView
