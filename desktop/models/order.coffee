_ = require 'underscore'
Backbone = require 'backbone'
Artwork = require './artwork'
Partner = require './partner'
PartnerLocation = require './partner_location'
xssFilters = require 'xss-filters'
{ API_URL, SESSION_ID } = require('sharify').data

module.exports = class Order extends Backbone.Model

  urlRoot: -> "#{API_URL}/api/v1/me/order"

  # Link to sellers' additional terms, if any (max 1)
  sellersTerms: ->
    _.compact(li.sale_conditions_url for li in @get('line_items'))[0]

  # Concatenated special shipping notes
  shippingNote: ->
    notes = _.compact(li.shipping_note for li in @get('line_items'))
    return null if notes.length == 0
    notes = _.map notes, xssFilters.inHTMLData
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
    xssFilters.inHTMLData _.compact([ _.compact([address?.city, address?.region]).join(', '), address?.postal_code]).join(' ')

  formatShippingAddress: ->
    address = @get('shipping_address')
    address = _.compact([
      address?.name
      address?.street
      @formatShippingLocal()
      address?.country
    ])
    address = _.map address, xssFilters.inHTMLData
    address.join('<br />')

  # TOOD: This and `getYearRange` should be able to be handled by moment, and if not
  # probably better served as a /lib or static method. [1..12] also doesn't need to be
  # a method.
  getMonthRange: -> [1..12]

  getYearRange: (range=10) ->
    startDate = new Date()
    startYear = startDate.getFullYear()

    endDate = new Date "01 Jan #{startYear + range}"
    endYear = endDate.getFullYear()

    [startYear..endYear]

  # Orders require a unique identifiier. If a user is logged in, that is the accessToken, otherwise it is the session id
  getSessionData: (session_id, accessToken) ->
    data = {}
    if accessToken
      data.access_token = accessToken
    else if session_id
      data.session_id = session_id
    data

  fetchPendingOrder: (options) ->
    @fetch
      url: "#{@urlRoot()}/pending"
      success: options.success
      error: options.error
      data: @getSessionData((options.session_id or SESSION_ID), options.accessToken)

  update: (data, options) ->
    sessionData = @getSessionData((options.session_id or SESSION_ID), options.accessToken)
    if sessionData.session_id
      data.session_id = sessionData.session_id
    @save data,
      url: @url()
      success: options.success
      error: options.error

  resume: (options) =>
    @isSaved = -> false
    data = @getSessionData((options.session_id or SESSION_ID), options.accessToken)
    data.token = options.token
    @save null,
      url: "#{@url()}/resume"
      data: data
      success: options.success
      error: options.error
