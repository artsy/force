_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
moment = require 'moment'
{ Fetch, Markdown, Image } = require 'artsy-backbone-mixins'
Relations = require './mixins/relations/sale'
Eventable = require './mixins/eventable'

module.exports = class Sale extends Backbone.Model
  _.extend @prototype, Relations
  _.extend @prototype, Markdown
  _.extend @prototype, Image(sd.API_URL)
  _.extend @prototype, Eventable

  urlRoot: "#{sd.API_URL}/api/v1/sale"

  href: ->
    if @isSale()
      "/sale/#{@id}"
    else
      "/auction/#{@id}"

  registerUrl: (redirectUrl) ->
    url = "/auction-registration/#{@id}"
    url += "?redirect_uri=#{redirectUrl}" if redirectUrl
    url

  registrationSuccessUrl: (artworkId = null)->
    if artworkId
      "#{@href()}/bid/#{artworkId}/confirm-registration"
    else
      "#{@href()}/confirm-registration"

  buyersPremiumUrl: ->
    "#{@href()}/buyers-premium"

  calculateOffsetTimes: (options = {}) ->
    new Backbone.Model().fetch
      url: "#{sd.API_URL}/api/v1/system/time"
      success: (response) =>
        offset = moment().diff(moment(response.get('iso8601')))
        @set('offsetLiveStartAtMoment', moment(@get 'live_start_at').add(offset))
        @set('offsetStartAtMoment', moment(@get 'start_at').add(offset))
        @set('offsetEndAtMoment', moment(@get 'end_at').add(offset))
        @updateState()
        options.success() if options?.success?
      error: options?.error

  updateState: ->
    @set('clockState', (
      if moment().isAfter(@get 'offsetEndAtMoment') || @get('auction_state') == 'closed'
        'closed'
      else if @get('live_start_at') and moment().isBefore(@get 'offsetLiveStartAtMoment')
        'live'
      else if moment().isAfter(@get 'offsetStartAtMoment') and moment().isBefore(@get 'offsetEndAtMoment')
        'open'
      else if moment().isBefore(@get 'offsetStartAtMoment')
        'preview'
    ))

  state: ->
    if @has('clockState') then @get('clockState') else @get('auction_state')

  auctionState: ->
    @get('auction_state')

  isRegisterable: ->
    @isAuction() and _.contains(['preview', 'open'], @get('auction_state'))

  isAuction: ->
    @get('is_auction')

  isBidable: ->
    @isAuction() and _.contains(['open'], @get('auction_state'))

  isPreviewState: ->
    @isAuction() and _.contains(['preview'], @get('auction_state'))

  isOpen: ->
    @state() is 'open'

  isPreview: ->
    @state() is 'preview'

  isClosed: ->
    @state() is 'closed'

  isAuctionPromo: ->
    @get('sale_type') is 'auction promo'

  isRegistrationEnded: ->
    @isAuction() and moment().isAfter(@get 'registration_ends_at')

  isSale: ->
    not @isAuction() and
    not @isAuctionPromo()

  isPreliminaryAuction: ->
    @get('is_auction') and @get('is_preliminary')

  isAuctionPromoInquirable: ->
    @isAuctionPromo() and @isPreview()

  sortableDate: ->
    if @get('live_start_at')? then @get('live_start_at') else @get('end_at')

  # Feature support:
  fetchArtworks: ->
    @related().saleArtworks.fetchUntilEnd arguments...

  getMonthRange: -> [1..12]

  getYearRange: (range=10) ->
    startDate = new Date()
    startYear = startDate.getFullYear()

    endDate = new Date "01 Jan #{startYear + range}"
    endYear = endDate.getFullYear()

    [startYear..endYear]

  isLiveOpen: ->
    @get('auction_state') == 'open' and moment().isAfter(@get 'live_start_at')
