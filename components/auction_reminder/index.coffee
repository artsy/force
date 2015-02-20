_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
Sales = require '../../collections/sales.coffee'
Sale = require '../../models/sale.coffee'
Artwork = require '../../models/artwork.coffee'
SaleArtworks = require '../../collections/sale_artworks.coffee'
ClockView = require '../clock/view.coffee'
{ API_URL } = require('sharify').data
mediator = require '../../lib/mediator.coffee'
Transition = require '../mixins/transition.coffee'
{ isTouchDevice } = require '../../components/util/device.coffee'
Cookies = require 'cookies-js'
auctionTemplate = -> require('./template.jade') arguments...

class AuctionReminderModal extends Backbone.View

  events: ->
    'click .modal-close': 'close'

  initialize: ({ @auction, @auctionImage }) ->

    # Reminder doesn't show on auction page
    if window.location.pathname == @auction.href()
      return
    # Reminder only shows if 24 hours until end
    auctionEndInHours = moment().diff(@auction.get('end_at'),'hours')
    if auctionEndInHours < -24
      console.log auctionEndInHours
      return

    { @dimensions, @width, @transition, @backdrop } = 
      dimensions: width: '500px'
      transition: 'fade'
      backdrop: false

    @resize = _.debounce @updatePosition, 100

    @$window = $(window)
    @$window.on 'resize', @resize

    @$container = $('body')

    @open()

  updatePosition: =>
    @$dialog.css
      top: ((@$container.height() - @$dialog.height()) - 40) + 'px'
      left: ((@$container.width() - @$dialog.width()) - 40) + 'px'

  setDimensions: (dimensions) ->
    @$dialog.css dimensions or @dimensions

  open: =>
    @$el.
      addClass("auction-reminder-modal").
      html auctionTemplate
        auction: @auction
        auctionImage: @auctionImage
    
    @$dialog = @$('.modal-dialog')
    @$dialog.addClass("is-active")
    @setupClock()
    @setDimensions(@dimensions)
    @$container.append @$el
    @updatePosition()

  close: (cb) ->
    @$window.off 'resize', @resize

    @$el.
      one($.support.transition.end, =>

        @remove()

        cb() if _.isFunction cb
      ).emulateTransitionEnd 250

    Cookies.set 'closeAuctionReminder', true

  setupClock: ->
    @clock = new AuctionClock
      modelName: 'Auction'
      model: @auction
      el: @$Clock = @$('.auction-reminder-clock')
    @$Clock.addClass 'is-fade-in'
    @clock.start()

class AuctionClock extends ClockView

  UNIT_MAP =
    'hours': 'HRS'
    'minutes': 'MIN'
    'seconds': 'SEC'

  initialize: ({ @closedText, @modelName }) ->
    @closedText ?= 'Online Bidding Closed'

  renderClock: =>
    @model.updateState()
    @$('.clock-value').html _.compact((for unit, label of UNIT_MAP
      diff = moment.duration(@toDate?.diff(moment()))[unit]()
      """
        <li>
          <div class="auction-clock-element">#{if diff < 10 then '0' + diff else diff}</div>
          <div class="auction-clock-element"><small>#{label}</small></div>
        </li>
      """
    )).join '<li>:</li>'

module.exports = (callBack) ->
  @sales = new Sales
  @sales.fetch
    url: "#{API_URL}/api/v1/sales?is_auction=true&published=true&live=true"
    error: callBack
    success: (sales) =>
      @featuredSale = sales.models[0]
      saleArtworks = new SaleArtworks
      saleArtworks.fetch
        url: "#{API_URL}/api/v1/sale/#{@featuredSale.get('id')}/sale_artworks"
        error: callBack
        success: (artworks) =>
          featuredArtworkId = artworks.models[0].id
          featuredArtwork = new Artwork id: featuredArtworkId
          featuredArtwork.fetch
            error: callBack
            success: (artwork) =>
              @featuredImage = artwork.defaultImageUrl()
              @auctionModal = new AuctionReminderModal(
                auction: @featuredSale
                auctionImage: @featuredImage
              )

