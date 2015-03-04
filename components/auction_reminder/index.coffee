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

    $('auction-reminder-clock').on 'auctionClosed'
    @calculateOffsetEndAtMoment (offsetEndAtMoment) =>
      @offsetEndAtMoment = offsetEndAtMoment
      debugger
      console.log "The end at from the callback is " + @offsetEndAtMoment

    @$container = $('body')
    @open()

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

    $('.auction-reminder-clock').on 'auctionEnded', ->
      $('.modal-dialog').removeClass('is-spring-in')
      $('.modal-dialog').addClass('is-close-out')

    # Transition based on if they've seen the reminder already
    if Cookies.get('firstAuctionReminderSeen')
      @$('.modal-dialog').css
        bottom: "40px"
    else
      cookieValue = "#{@auctionName}|#{@auctionId}|#{@auctionImage}|#{@auctionEndat}"
      Cookies.set('firstAuctionReminderSeen', cookieValue)
      activate = => @$dialog.addClass("is-spring-in")
      _.delay(activate,5000)

  close: (cb) ->
    @$('.modal-dialog').removeClass('is-spring-in')
    @$('.modal-dialog').addClass('is-close-out')

    Cookies.set('closeAuctionReminder', true)
    track.click 'Closed Auction Reminder'
    analytics.snowplowStruct 'auction_reminder', 'dismiss', @auctionId, 'feature'

  calculateOffsetEndAtMoment: (callback) ->
    new Backbone.Model().
      fetch
        url: "#{sd.API_URL}/api/v1/system/time"
        success: (model) =>
          offset = moment().diff(model.get('time'))
          endat = moment(@auctionEndat).add(offset)
          console.log "the endat in the callback is " + endat
          callback endat

  setupClock: ->
    console.log @offsetEndAtMoment
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
    location.assign(@auctionId)

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
      # url: "#{API_URL}/api/v1/sales?is_auction=true&published=true&live=true"
      url: "#{API_URL}/api/v1/sales?is_auction=true&published=true"
      error: callBack
      success: (sales) =>
        if (@featuredSale = sales.first())?
          @featuredSale.set('end_at','2015-03-04 15:45:00')
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