_         = require 'underscore'
sd        = require('sharify').data
moment    = require 'moment'
Backbone  = require 'backbone'
{ Fetch } = require 'artsy-backbone-mixins'
Clock     = require './mixins/clock.coffee'

module.exports = class Sale extends Backbone.Model

  _.extend @prototype, Clock

  urlRoot: "#{sd.ARTSY_URL}/api/v1/sale"

  href: -> "/feature/#{@get('id')}"
  registrationSuccessUrl: -> "#{@href()}/confirm-registration"

  fetchArtworks: (options) ->
    _.extend Backbone.Collection.prototype, Fetch(sd.ARTSY_URL)
    saleArtworks = new Backbone.Collection []
    saleArtworks.comparator = (saleArtwork) -> saleArtwork.get('position')
    saleArtworks.url = "#{sd.ARTSY_URL}/api/v1/sale/#{@get 'id'}/sale_artworks"
    saleArtworks.fetchUntilEnd options

  calculateOffsetTimes: (options = {}) ->
    new Backbone.Model().
      fetch
        url: "#{sd.ARTSY_URL}/api/v1/system/time"
        success: (model) =>
          offset = moment().diff(model.get('time'))
          @set('offsetStartAtMoment', moment(@get 'start_at').add(offset))
          @set('offsetEndAtMoment', moment(@get 'end_at').add(offset))
          @updateState()
          options.success() if options?.success?
        error: options?.error

  updateState: ->
    @set('auctionState', (
      if moment().isAfter(@get 'offsetEndAtMoment')
        'closed'
      else if moment().isAfter(@get 'offsetStartAtMoment') and moment().isBefore(@get 'offsetEndAtMoment')
        'open'
      else if moment().isBefore(@get 'offsetStartAtMoment')
        'preview'
    ))

  registerUrl: (redirectUrl) ->
    "/auction-registration/#{@get 'id'}?redirect_uri=#{redirectUrl}"

  isRegisterable: ->
    @isAuction() && _.include(['preview','open'], @get('auction_state'))

  isAuction: ->
    @get('is_auction')

  isBidable: ->
    @isAuction() && _.include(['open'], @get('auction_state'))
