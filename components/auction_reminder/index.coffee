_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
Sales = require '../../collections/sales.coffee'
Sale = require '../../models/sale.coffee'
Artwork = require '../../models/artwork.coffee'
SaleArtworks = require '../../collections/sale_artworks.coffee'
ModalView = require '../modal/view.coffee'
ClockView = require '../clock/view.coffee'
{ API_URL } = require('sharify').data
auctionTemplate = -> require('./template.jade') arguments...

class AuctionReminderModal extends ModalView

  initialize: ({ @auction, @auctionImage }) ->
    super width: 500

  postRender: ->
    @isLoading()
    @$('.modal-body').html(auctionTemplate 
      auction: @auction
      auctionImage: @auctionImage
    )
    @setupClock()
    @updatePosition()
    @isLoaded()

  setupClock: ->
    console.log "clock was called"
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
          #{if diff < 10 then '0' + diff else diff}
          <small>#{label}</small>
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

