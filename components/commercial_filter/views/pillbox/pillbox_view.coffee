Backbone = require 'backbone'
_ = require 'underscore'
s = require 'underscore.string'
{ formatMoney } = require 'accounting'

template = -> require('./index.jade') arguments...

module.exports = class PillboxView extends Backbone.View
  events:
    'click .cf-pillbox__pillboxes_clear' : 'clear'

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenTo @params, 'change', @render

  clear: (e) ->
    param = $(e.currentTarget).data('value')
    @params.unset(param)

  medium: ->
    if @params.has('medium')
      s(@params.get('medium'))
        .humanize()
        .replace('slash', '/')
        .capitalize()
        .value()

  price: ->
    if @params.has('price_range')
      [ min, max ] = _.map @params.get('price_range').split("-"), (val) -> parseInt val
      "#{formatMoney(min, { precision: 0 })} - #{formatMoney(max, { precision: 0 })}"

  render: ->
    @$el.html template
      color: @params.get('color')
      medium: @medium()
      price: @price()