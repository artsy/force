_ = require 'underscore'
sd = require('sharify').data
moment = require 'moment'
Backbone = require 'backbone'
{ Fetch } = require 'artsy-backbone-mixins'
Clock = require './mixins/clock.coffee'
SaleArtworks = require '../collections/sale_artworks.coffee'
Relations = require './mixins/relations/sale.coffee'

module.exports = class Sale extends Backbone.Model
  _.extend @prototype, Clock
  _.extend @prototype, Relations

  urlRoot: "#{sd.API_URL}/api/v1/sale"

  href: ->
    if @isSale()
      "/sale/#{@id}"
    else
      "/auction/#{@id}"

  registrationSuccessUrl: ->
    "#{@href()}/confirm-registration"

  buyersPremiumUrl: ->
    "#{@href()}/buyers-premium"

  registerUrl: (redirectUrl) ->
    url = "/auction-registration/#{@id}"
    url += "?redirect_uri=#{redirectUrl}" if redirectUrl
    url

  bidUrl: (artwork) ->
    "#{@href()}/bid/#{artwork.id}"

  redirectUrl: (artwork) ->
    if @isBidable() and artwork?
      @bidUrl artwork
    else
      @href()

  fetchArtworks: (options = {}) ->
    @artworks = new SaleArtworks [], id: @id
    @artworks.fetchUntilEnd options

  calculateOffsetTimes: (options = {}) ->
    new Backbone.Model().
      fetch
        url: "#{sd.API_URL}/api/v1/system/time"
        success: (model) =>
          offset = moment().diff(model.get('time'))
          @set('offsetStartAtMoment', moment(@get 'start_at').add(offset))
          @set('offsetEndAtMoment', moment(@get 'end_at').add(offset))
          @updateState()
          options.success() if options?.success?
        error: options?.error

  updateState: ->
    @set('clockState', (
      if moment().isAfter(@get 'offsetEndAtMoment')
        'closed'
      else if moment().isAfter(@get 'offsetStartAtMoment') and moment().isBefore(@get 'offsetEndAtMoment')
        'open'
      else if moment().isBefore(@get 'offsetStartAtMoment')
        'preview'
    ))

  # NOTE
  # auction_state helpers are used serverside of if updateState hasn't been run
  # clockState used after updateState is run
  isRegisterable: ->
    @isAuction() and _.include(['preview', 'open'], @get('auction_state'))

  isAuction: ->
    @get('is_auction')

  isBidable: ->
    @isAuction() and _.include(['open'], @get('auction_state'))

  isPreviewState: ->
    @isAuction() and _.include(['preview'], @get('auction_state'))

  isOpen: ->
    @state() is 'open'

  isPreview: ->
    @state() is 'preview'

  isClosed: ->
    @state() is 'closed'

  # We desire a state when accessing from the server
  state: ->
    if @has('clockState') then @get('clockState') else @get('auction_state')

  # Returns an object of button attributes for a given user/artwork combination
  # corresponding to the action that should be taken given the state of the sale/user/artwork
  actionButtonState: (user, artwork) ->
    # 'Contact' button state
    if @isAuctionPromo()
      label: "Contact #{@related().profile.displayName() or 'Auction House'}", enabled: true, classes: 'js-inquiry-button'

    # 'Buy Now' button state
    else if @isOpen() and artwork.get('acquireable') and not artwork.get('sold')
      label: 'Buy Now', enabled: true, classes: 'js-acquire-button', href: ''
    else if @isOpen() and artwork.get('acquireable') and artwork.get('sold')
      label: 'Sold', enabled: false, classes: 'is-disabled', href: ''

    # 'Bid' button state
    else if @isPreview() and !user?.get('registered_to_bid')
      label: 'Register to bid', enabled: true, classes: '', href: @registerUrl()
    else if @isPreview() and user?.get('registered_to_bid')
      label: 'Registered to bid', enabled: false, classes: 'is-success is-disabled', href: ''
    else if @isOpen()
      label: 'Bid', enabled: true, classes: 'js-bid-button', href: (@bidUrl(artwork) if artwork)
    else if @isClosed()
      label: 'Online Bidding Closed', enabled: false, classes: 'is-disabled', href: ''

    # Fallback
    else if artwork?
      label: 'View', enabled: true, classes: '', href: artwork.href()
    else
      {}

  date: (attr) ->
    moment(@get attr)

  isAuctionPromo: ->
    @get('sale_type') is 'auction promo'

  isSale: ->
    not @isAuction() and
    not @isAuctionPromo()
