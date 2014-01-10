Backbone        = require 'backbone'
_               = require 'underscore'
Artwork         = require './artwork.coffee'
Partner         = require './partner.coffee'
PartnerLocation = require './partner_location.coffee'

module.exports = class Order extends Backbone.Model

  urlRoot: "/api/v1/me/order/"

  submit: (options = {}) ->
    model = new Backbone.Model
      url             : "#{@url()}/submit"
      credit_card_uri : options.credit_card_uri
    model.save
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
