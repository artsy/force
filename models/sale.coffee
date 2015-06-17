_ = require 'underscore'
{ API_URL, SECURE_IMAGES_URL } = require('sharify').data
moment = require 'moment'
Backbone = require 'backbone'
{ Fetch, Markdown, Image } = require 'artsy-backbone-mixins'

Clock = require './mixins/clock.coffee'
Relations = require './mixins/relations/sale.coffee'
ImageSizes = require './mixins/image_sizes.coffee'
Eventable = require './mixins/eventable.coffee'

module.exports = class Sale extends Backbone.Model
  _.extend @prototype, Clock
  _.extend @prototype, Relations
  _.extend @prototype, Markdown
  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, ImageSizes
  _.extend @prototype, Eventable

  urlRoot: "#{API_URL}/api/v1/sale"

  parse: (response) ->
    response.auction_state = @calculateAuctionState response.start_at, response.end_at
    response

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

  calculateAuctionState: (start_at, end_at, offset = 0) ->
    start = moment(start_at).add(offset, 'milliseconds')
    end = moment(end_at).add(offset, 'milliseconds')
    if moment().isAfter(end) or moment().isSame(end)
      'closed'
    else if moment().isBetween(start, end)
      'open'
    else if moment().isBefore(start) or moment().isSame(start)
      'preview'

  state: ->
    if @has('clockState') then @get('clockState') else @get('auction_state')

  auctionState: ->
    @calculateAuctionState _.values(@pick('start_at', 'end_at', 'offset'))...

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

  isAuctionPromo: ->
    @get('sale_type') is 'auction promo'

  isSale: ->
    not @isAuction() and
    not @isAuctionPromo()

  isPreliminaryAuction: ->
    @get('is_auction') and @get('is_preliminary')

  isAuctionPromoInquirable: ->
    @isAuctionPromo() and @isPreview()

  # Support for Feature in artsy-backbone-mixins
  fetchArtworks: ->
    @related().saleArtworks.fetchUntilEnd arguments...
