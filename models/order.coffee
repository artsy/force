Backbone        = require 'backbone'
_               = require 'underscore'
Artwork         = require './artwork.coffee'
Partner         = require './partner.coffee'
PartnerLocation = require './partner_location.coffee'

module.exports = class Order extends Backbone.Model

  urlRoot: "/api/v1/me/order/"

  submit: (options = {}) ->
    model = new Backbone.Model
      credit_card_uri : options.creditCardUri
    model.isNew = -> false
    model.url = "#{@url()}/submit"
    model.save null,
      success: options?.success
      error: options?.error

  # Link to sellers' additional terms, if any (max 1)
  sellersTerms: ->
    _.compact(li.sale_conditions_url for li in @get('line_items'))[0]

  # Concatenated special shipping notes
  shippingNote: ->
    notes = _.compact(li.shipping_note for li in @get('line_items'))
    return null if notes.length == 0
    notes.join('<br/><br/>')

  getLineItemArtworks: ->
    for lineItem in @get('line_items')
      new Artwork(lineItem.artwork)

  getLineItemPartners: ->
    for lineItem in @get('line_items')
      partner = new Partner(lineItem.partner)
      partner.set partner_location: new PartnerLocation(lineItem.partner_location)
      partner

  formatShippingLocal: ->
    address = @get('shipping_address')
    _.compact([ _.compact([address?.city, address?.region]).join(', '), address?.postal_code]).join(' ')

  formatShippingAddress: ->
    address = @get('shipping_address')
    _.compact([
      address?.name
      @get('telephone')
      address?.street
      @formatShippingLocal()
    ]).join('<br />')

  getMonthRange: -> [1..12]

  getYearRange: (range=10) ->
    startDate = new Date()
    startYear = startDate.getFullYear()

    endDate = new Date "01 Jan #{startYear + range}"
    endYear = endDate.getFullYear()

    [startYear..endYear]
