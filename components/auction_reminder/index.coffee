_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
Sales = require '../../collections/sales.coffee'
Artwork = require '../../models/artwork.coffee'
SaleArtworks = require '../../collections/sale_artworks.coffee'
{ API_URL } = require('sharify').data
Cookies = require 'cookies-js'
analytics = require '../../lib/analytics.coffee'
track = analytics.track
auctionTemplate = -> require('./template.jade') arguments...
Sale = require '../../models/sale.coffee'
AuctionClock = require './clock/view.coffee'

class AuctionReminderModal extends Backbone.View

  events: ->
    'click .modal-close': 'close'
    'click .auction-reminder-container': 'clickAuctionReminder'

  initialize: ({ @auctionName, @auctionId, @auctionImage, @auctionEndat }) ->

    # Reminder doesn't show on auction page
    if window.location.pathname == @auctionId
      return
    # Reminder only shows if 24 hours until end
    diff = moment(@auctionEndat).diff(moment(),'hours')
    if diff > 23
      return

    @calculateOffsetEndAtMoment (calculatedOffsetEndAtMoment) =>
      # Reminder only shows if there are at least 10 seconds remaining
      if moment.duration(moment(calculatedOffsetEndAtMoment).diff(moment()))._milliseconds > 10000
        @offsetEndAtMoment = moment(calculatedOffsetEndAtMoment)
        @open()

    @$container = $('body')

  open: =>
    @$el.
      addClass("auction-reminder-modal").
      html auctionTemplate
        auctionId: @auctionId
        auctionImage: @auctionImage
        auctionName: @auctionName
    @$dialog = @$('.modal-dialog')
    @setupClock()
    @$container.append @$el

    $('.auction-reminder-clock').on 'auctionClosed', ->
      $('.modal-dialog').removeClass('is-spring-in')
      $('.modal-dialog').removeClass('is-static-open')
      $('.modal-dialog').addClass('is-close-out')

    # Transition based on if they've seen the reminder already
    if Cookies.get('firstAuctionReminderSeen')
      @$('.modal-dialog').addClass('is-static-open')
    else
      cookieValue = "#{@auctionName}|#{@auctionId}|#{@auctionImage}|#{@auctionEndat}"
      cookieExpiration = moment.duration(moment(@offsetEndAtMoment).diff(moment()))._milliseconds
      Cookies.set('firstAuctionReminderSeen', cookieValue, { expires: cookieExpiration })
      activate = => @$dialog.addClass("is-spring-in")
      _.delay(activate,5000)

  close: (cb) ->
    @$('.modal-dialog').removeClass('is-spring-in')
    $('.modal-dialog').removeClass('is-static-open')
    @$('.modal-dialog').addClass('is-close-out')

    Cookies.set('closeAuctionReminder', true)
    track.click 'Closed Auction Reminder'
    analytics.snowplowStruct 'auction_reminder', 'dismiss', @auctionId, 'feature'

  calculateOffsetEndAtMoment: (callback) ->
    new Backbone.Model().
      fetch
        url: "#{API_URL}/api/v1/system/time"
        success: (model) =>
          offset = moment().diff(model.get('iso8601'))
          endat = moment(@auctionEndat).add(offset)
          callback endat

  setupClock: ->
    @clock = new AuctionClock
      el: @$Clock = @$('.auction-reminder-clock')
      auctionEndat: @offsetEndAtMoment
    @$Clock.addClass 'is-fade-in'
    @clock.start()

  clickAuctionReminder: (e)->
    e.preventDefault()
    Cookies.set('closeAuctionReminder', true)
    track.click 'Clicked Auction Reminder'
    analytics.snowplowStruct 'auction_reminder', 'click', @auctionId, 'feature'
    location.assign("/auction/#{@auctionId}")

module.exports = (callBack) ->
  if Cookies.get 'firstAuctionReminderSeen'
    [ auctionName, auctionId, auctionImage, auctionEndat ] = Cookies.get('firstAuctionReminderSeen').split("|")
    new AuctionReminderModal
      auctionName: auctionName
      auctionId: auctionId
      auctionImage: auctionImage
      auctionEndat: auctionEndat
  else
    @sales = new Sales
    @sales.fetch
      url: "#{API_URL}/api/v1/sales?is_auction=true&published=true&live=true"
      error: callBack
      success: (sales) =>
        if (@featuredSale = sales.first())?
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
                  new AuctionReminderModal
                    auctionName: @featuredSale.get('name')
                    auctionImage: @featuredImage
                    auctionId: @featuredSale.id
                    auctionEndat: @featuredSale.get('end_at')
