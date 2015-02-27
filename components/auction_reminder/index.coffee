_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
Sales = require '../../collections/sales.coffee'
Artwork = require '../../models/artwork.coffee'
SaleArtworks = require '../../collections/sale_artworks.coffee'
ClockView = require '../clock/view.coffee'
{ API_URL } = require('sharify').data
Cookies = require 'cookies-js'
analytics = require '../../lib/analytics.coffee'
auctionTemplate = -> require('./template.jade') arguments...

class AuctionReminderModal extends Backbone.View

  events: ->
    'click .modal-close': 'close'
    'click .auction-reminder-container': 'clickAuctionReminder'

  initialize: ({ @auction, @auctionImage }) ->

    # Reminder doesn't show on auction page
    if window.location.pathname == @auction.href()
      return
    # Reminder only shows if 24 hours until end
    if moment(@auction.get('end_at')).diff(moment(),'hours') > 23
      return

    @$container = $('body')
    @open()

  open: =>
    @$el.
      addClass("auction-reminder-modal").
      html auctionTemplate
        auction: @auction
        auctionImage: @auctionImage
    
    @$dialog = @$('.modal-dialog')
    @setupClock()
    @$container.append @$el

    if Cookies.get('firstAuctionReminderSeen')
      @$('.modal-dialog').css
        bottom: "40px"
    else
      Cookies.set('firstAuctionReminderSeen', true)
      activate = => @$dialog.addClass("is-spring-in")
      _.delay(activate,5000)

  close: (cb) ->
    @$('.modal-dialog').removeClass('is-spring-in')
    @$('.modal-dialog').addClass('is-close-out')

    Cookies.set('closeAuctionReminder', true)

    analytics.snowplowStruct 'auction_reminder', 'dismiss', @auction.get('id'), 'feature'

  setupClock: ->
    @clock = new AuctionClock
      modelName: 'Auction'
      model: @auction
      el: @$Clock = @$('.auction-reminder-clock')
    @$Clock.addClass 'is-fade-in'
    @clock.start()

  clickAuctionReminder: ->
    Cookies.set('closeAuctionReminder', true)
    analytics.snowplowStruct 'auction_reminder', 'click', @auction.get('id'), 'feature'

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