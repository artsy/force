_ = require 'underscore'
{ API_URL, SECURE_IMAGES_URL, PREDICTION_URL } = require('sharify').data
moment = require 'moment'
tz = require 'moment-timezone'
Backbone = require 'backbone'
{ Fetch, Markdown, Image, CalendarUrls } = require 'artsy-backbone-mixins'

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

  contactButtonState: (user, artwork) ->
    if @isAuctionPromo()
      label: "Contact #{@related().profile.displayName() or 'Auction House'}", enabled: true, classes: 'js-inquiry-button'

  buyButtonState: (user, artwork) ->
    if @isOpen() and artwork.get('acquireable') and not artwork.get('sold')
      label: 'Buy Now', enabled: true, classes: 'js-acquire-button', href: ''
    else if @isOpen() and artwork.get('acquireable') and artwork.get('sold')
      label: 'Sold', enabled: false, classes: 'is-disabled', href: ''


  bidButtonState: (user, artwork) ->
    if @isClosed()
      label: 'Auction Closed', enabled: false, classes: 'is-disabled', href: ''
    else if @isLiveOpen()
      label: 'Enter Live Auction', enabled: true, href: "#{PREDICTION_URL}/#{@get 'id'}"
    else if artwork.get('sold') and not artwork.get('acquireable')
      label: 'Sold', enabled: false, classes: 'is-disabled', href: ''
    else
      if @isPreview() and !user?.get('registered_to_bid')
        label: 'Register to bid', enabled: true, classes: '', href: @registerUrl()
      else if @isPreview() and user?.get('registered_to_bid')
        label: 'Registered to bid', enabled: false, classes: 'is-success is-disabled', href: ''
      else if user?.get('registered_to_bid') and not user?.get('qualified_for_bidding')
        label: 'Registration Pending', enabled: false, classes: 'is-disabled', href: ''
      else if not user?.get('qualified_for_bidding') and @isRegistrationEnded()
        label: 'Registration Closed', enabled: false, classes: 'is-disabled', href: ''
      else
        label: 'Bid', enabled: true, classes: 'js-bid-button', href: (@bidUrl(artwork) if artwork)

  isRegisterable: ->
    @isAuction() and _.include(['preview', 'open'], @get('auction_state'))

  isAuction: ->
    @get('is_auction')

  isBidable: ->
    @isAuction() and _.include(['open'], @get('auction_state'))

  isPreviewState: ->
    @isAuction() and _.include(['preview'], @get('auction_state'))

  isOpen: ->
    @get('auction_state') is 'open'

  isPreview: ->
    @get('auction_state') is 'preview'

  isClosed: ->
    @get('auction_state') is 'closed'

  isRegistrationEnded: ->
    @isAuction() and moment().isAfter(@get 'registration_ends_at')

  isLiveAuction: ->
    @get('live_start_at')

  isLiveOpen: ->
    @get('auction_state') == 'open' and moment().isAfter(@get 'live_start_at')

  isAuctionPromo: ->
    @get('sale_type') is 'auction promo'

  isUpcomingOrClosed: ->
    @isPreview() || @isOpen()

  isSale: ->
    not @isAuction() and
    not @isAuctionPromo()

  isPreliminaryAuction: ->
    @get('is_auction') and @get('is_preliminary')

  isAuctionPromoInquirable: ->
    @isAuctionPromo() and @isPreview()

  sortableDate: ->
    if @get('live_start_at')? then @get('live_start_at') else @get('end_at')

  # if a reminder is in order, return relevant data. else undefined.
  reminderStatus: ->
    return 'closing_soon' if @isClosingSoon()
    return 'live_open' if @isLiveOpen()
    return 'live_open_soon' if @isLiveOpenSoon()

  # Between 24 hours left and 10 seconds remaining
  isClosingSoon: (offset = 0) ->
    return false if @isLiveAuction()
    end = @date('end_at').add offset, 'milliseconds'

    twentyFourHours = end.clone().subtract 24, 'hours'
    tenSeconds = end.clone().subtract 10, 'seconds'

    moment().isBetween twentyFourHours, tenSeconds

  isLiveOpenSoon: (offset = 0) ->
    return false unless @isLiveAuction()
    startAt = @date('live_start_at').add offset, 'milliseconds'
    twentyFourHours = startAt.clone().subtract 10, 'minutes'
    moment().isBetween twentyFourHours, startAt

  isWithHeaderImage: ->
    @get('image_versions')?.length > 0

  # Support for Feature in artsy-backbone-mixins
  fetchArtworks: ->
    @related().saleArtworks.fetchUntilEnd arguments...

  event: ->
    event = new Backbone.Model
      start_at: @get('live_start_at') or @get('start_at') or moment()
      end_at: @get('end_at') or moment()
      name: @get('name')
    _.extend event, CalendarUrls({ title: 'name' })
    event

  upcomingLabel: ->
    zone = (attr) => moment(@get attr).tz('America/New_York').format 'MMM D h:mm:ssA z'
    if @isClosed()
      "Auction Closed"
    else if @get('live_start_at') and not @isLiveOpen()
      "Live bidding begins #{zone 'live_start_at'}"
    else if @get('live_start_at')
      "Live bidding now open"
    else if @isPreviewState()
      "Auction opens #{zone 'start_at'}"
    else
      "Bidding closes #{zone 'end_at'}"
