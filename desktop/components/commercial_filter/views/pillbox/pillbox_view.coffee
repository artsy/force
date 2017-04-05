Backbone = require 'backbone'
_ = require 'underscore'
s = require 'underscore.string'
mediumMap = require '../../filters/medium/medium_map'
{ formatMoney } = require 'accounting'

template = -> require('./index.jade') arguments...

module.exports = class PillboxView extends Backbone.View
  events:
    'click .cf-pillbox__pillboxes_clear' : 'clear'

  initialize: ({ @params, @artworks, @categoryMap }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires an artworks collection' unless @artworks?

    @listenTo @params, 'change', @render

  clear: (e) ->
    param = $(e.currentTarget).data('value')
    filter = $(e.currentTarget).data('filter')
    # Here we want to unset a param, and also change the page param
    # Use silent: true to only trigger one change event
    @params.set { page: 1 }, silent: true
    if filter is 'major_period'
      majorPeriods = _.without(@params.get('major_periods'), "#{param}")
      @params.set { major_periods: majorPeriods }
    else if filter is 'partner_city'
      partnerCities = _.without(@params.get('partner_cities'), "#{param}")
      @params.set { partner_cities: partnerCities }
    else
      @params.unset param

  category: ->
    if @params.get('gene_id')
      categories = @categoryMap[@params.get('medium') || 'global']
      _.findWhere categories, {id: "#{@params.get('gene_id')}"}

  medium: ->
    mediumMap[@params.get('medium')] if @params.has('medium')

  size: (label, attr) ->
    if @params.has(attr)
      [ min, max ] = _.map @params.get(attr).split("-"), (val) -> parseInt val
      if isNaN(max)
        max = @params.get('ranges')[attr]?.max
        plus = '+'
      else
        plus = ''
      "#{label}: #{min} – #{max}#{plus} in"

  price: ->
    if @params.has('price_range')
      [ min, max ] = _.map @params.get('price_range').split("-"), (val) -> parseInt val
      if isNaN(max)
        max = @params.get('ranges').price_range.max
        plus = '+'
      else
        plus = ''
      "#{formatMoney(min, { precision: 0 })} – #{formatMoney(max, { symbol: "", precision: 0 })}#{plus}"

  displayLocation: (location) ->
    commaIndex = location.indexOf(',')
    location.substring(0, commaIndex)

  render: ->
    @$el.html template
      color: @params.get('color')
      category: @category()
      medium: @medium()
      price: @price()
      width: @size 'Width', 'width'
      height: @size 'Height', 'height'
      majorPeriods: @params.get('major_periods')
      partnerCities: @params.get('partner_cities')
      displayLocation: @displayLocation
