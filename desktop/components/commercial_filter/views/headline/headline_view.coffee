Backbone = require 'backbone'
_ = require 'underscore'
s = require 'underscore.string'
{ formatMoney } = require 'accounting'
colorMap = require './color_map'
mediumMap = require '../../filters/medium/medium_map'

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
      mediumMap[@params.get('medium')]
    else
      "Artworks"

  price: ->
    if @params.has('price_range')
      [ min, max ] = _.map @params.get('price_range').split("-"), (val) -> parseInt val
      if min > 0 and max < 50000
        "Between #{formatMoney(min, { precision: 0 })} and #{formatMoney(max, { precision: 0 })}"
      else if min > 0 and isNaN(max)
        "Above #{formatMoney(min, { precision: 0 })}"
      else if min is 0 and max < 50000
        "Below #{formatMoney(max, { precision: 0 })}"
    else
      "for Sale"

  showDefault: ->
    !(@params.has('medium') or @params.has('color') or @params.has('price_range'))

  render: ->
    @$el.html template
      color: @color()
      medium: @medium()
      price: @price()
      showDefault: @showDefault()
