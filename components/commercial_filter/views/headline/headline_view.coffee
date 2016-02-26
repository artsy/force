Backbone = require 'backbone'
_ = require 'underscore'
s = require 'underscore.string'
{ formatMoney } = require 'accounting'
colorMap = require './color_map.coffee'

template = -> require('./index.jade') arguments...

module.exports = class HeadlineView extends Backbone.View

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenTo @params, 'change', @render

  color: ->
    if @params.has('color')
      colorMap @params.get('color')
    else
      ""

  medium: ->
    if @params.has('medium')
      s(@params.get('medium'))
        .humanize()
        .replace('slash', '/')
        .capitalize()
        .value()
    else
      "Artworks"

  price: ->
    if @params.has('price_range')
      [ min, max ] = _.map @params.get('price_range').split("-"), (val) -> parseInt val
      if min > 0 and max < 50000
        "Between #{formatMoney(min, { precision: 0 })} and #{formatMoney(max, { precision: 0 })}"
      else if min > 0 and max is 50000
        "Above #{formatMoney(min, { precision: 0 })}"
      else if min is 0 and max < 50000
        "Below #{formatMoney(max, { precision: 0 })}"
    else
      "for Sale"

  render: ->
    @$el.html template
      color: @color()
      medium: @medium()
      price: @price()
