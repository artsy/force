_ = require 'underscore'
{ API_URL, SECURE_IMAGES_URL } = require('sharify').data
moment = require 'moment-timezone'
Backbone = require 'backbone'
{ Fetch, Markdown, Image, CalendarUrls } = require 'artsy-backbone-mixins'
Clock = require './mixins/clock.coffee'
Relations = require './mixins/relations/sale.coffee'
ImageSizes = require './mixins/image_sizes.coffee'
Eventable = require './mixins/eventable.coffee'
{ getLiveAuctionUrl } = require '../../utils/domain/auctions/urls'

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

  registrationFlowUrl: ->
    "#{@href()}/registration-flow"

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
      label: 'Enter Live Auction', enabled: true, href: getLiveAuctionUrl(@get('id'), { isLoggedIn: Boolean(user) })
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

  endedTime: ->
    if @get('end_at')? then moment.utc(@get('end_at')) else moment.utc(@get('ended_at'))

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

  zone: (time) ->
    moment(time).tz('America/New_York')

  event: ->
    timeFormat = 'YYYY-MM-DD[T]HH:mm:ss'
    if @get('live_start_at')
      start = @get('live_start_at') or moment()
      end  = moment(@get('live_start_at')).add(4, 'hours')
    else
      start = @get('start_at') or moment()
      end = @get('end_at') or moment()

    event = new Backbone.Model
      start_at: @zone(start).format(timeFormat)
      end_at: @zone(end).format(timeFormat)
      name: @get('name')

    _.extend event, CalendarUrls({ title: 'name' })
    event

  upcomingLabel: ->
    timeFormat = 'MMM D h:mm A z'
    label = if @isClosed()
      "Auction Closed"
    else if @get('live_start_at') and not @isLiveOpen()
      "Live bidding begins #{@zone(@get('live_start_at')).format(timeFormat)}"
    else if @get('live_start_at')
      "Live bidding now open"
    else if @isPreviewState()
      "Auction opens #{@zone(@get('start_at')).format(timeFormat)}"
    else if !@get('is_sale')
      "Closes #{@zone(@get('end_at')).format(timeFormat)}"
    else if @get('is_auction')
      "Bidding closes #{@zone(@get('end_at')).format(timeFormat)}"
    else
      ""

    # Piggyback on common `moment` output to guard against missing / bad data
    # FIXME: This could perhaps be a bit safer
    if label.includes('Invalid')
      ""
    else
      label

  upcomingDateTime: ->
    timeFormat = 'MMM D h:mm A z'
    if @isClosed()
      "Auction Closed"
    else if @get('live_start_at') and not @isLiveOpen()
      "#{@zone(@get('live_start_at')).format(timeFormat)}"
    else if @get('live_start_at')
      "Live bidding now open"
    else if @isPreviewState()
      "#{@zone(@get('start_at')).format(timeFormat)}"
    else
      "#{@zone(@get('end_at')).format(timeFormat)}"
