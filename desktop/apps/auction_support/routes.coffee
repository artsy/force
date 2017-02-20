_ = require 'underscore'
Feature = require '../../models/feature.coffee'
Sale = require '../../models/sale.coffee'
Order = require '../../models/order.coffee'
Artwork = require '../../models/artwork.coffee'
SaleArtwork = require '../../models/sale_artwork.coffee'
BidderPositions = require '../../collections/bidder_positions.coffee'
buyersPremium = require '../../components/buyers_premium/index.coffee'
metaphysics = require '../../lib/metaphysics'

registerOrRender = (sale, req, res, next) ->
  req.user.fetchCreditCards
    error: res.backboneError
    success: (creditCards) ->
      if creditCards.length > 0
        req.user.createBidder
          saleId: sale.get('id')
          error: res.backboneError
          success: -> res.redirect sale.registrationSuccessUrl()
      else
        order = new Order()
        res.render 'registration',
          sale: sale
          monthRange: order.getMonthRange()
          yearRange: order.getYearRange()

@auctionRegistration = (req, res, next) ->
  unless req.user
    return res.redirect "/log_in?redirect_uri=/auction-registration/#{req.params.id}"

  new Sale(id: req.params.id).fetch
    error: res.backboneError
    success: (sale) ->
      res.locals.sd.SALE = sale

      # Sale is a registerable auction
      if sale.isRegisterable()
        # Check if the user has registered for the sale
        # If so, redirect back to the feature
        # If not, render the auction registration page
        req.user.checkRegisteredForAuction
          saleId: sale.get('id')
          error: res.backboneError
          success: (isRegistered) ->
            if isRegistered
              return res.redirect sale.registrationSuccessUrl()
            else
              registerOrRender sale, req, res, next

      # Sale is not registerable yet: render error page
      else if sale.isAuction()
        res.render 'registration-error',
          sale: sale

      # Sale is not an auction: 404
      else
        err = new Error('Not Found')
        err.status = 404
        next err

@bid = (req, res, next) ->
  unless req.user
    return res.redirect "/log_in?redirect_uri=/auction/#{req.params.id}/bid/#{req.params.artwork}"

  sale = new Sale(id: req.params.id)
  saleArtwork = new SaleArtwork(artwork: new Artwork(id: req.params.artwork), sale: sale)
  bidderPositions = new BidderPositions(null, { saleArtwork: saleArtwork, sale: sale })

  render = _.after 4, ->
    res.locals.sd.BIDDER_POSITIONS = bidderPositions.toJSON()
    res.locals.sd.SALE = sale.toJSON()
    res.locals.sd.SALE_ARTWORK = saleArtwork.toJSON()
    res.render 'bid-form',
      sale: sale
      artwork: saleArtwork.artwork()
      saleArtwork: saleArtwork
      bidderPositions: bidderPositions
      isRegistered: res.locals.sd.REGISTERED
      maxBid: (if req.query.bid then ( req.query.bid / 100 ) else '')
      monthRange: new Order().getMonthRange()
      yearRange: new Order().getYearRange()

  sale.fetch
    error: res.backboneError
    success: ->
      if sale.isBidable()
        render()
      else
        err = new Error('Not Found')
        err.status = 404
        next err
  saleArtwork.fetch
    error: res.backboneError
    success: ->
      bidderPositions.fetch
        data: { access_token: req.user.get('accessToken') }
        error: res.backboneError
        success: render
  req.user.checkRegisteredForAuction
    saleId: sale.get('id')
    error: res.backboneError
    success: (registered) ->
      res.locals.sd.REGISTERED = registered
      render()

  # TODO: Refactor all of this junk to use MP, or drop it in favor of
  # inline bidding component, see: https://github.com/artsy/force/issues/5118
  metaphysics
    query: """ {
      artwork(id: "#{req.params.artwork}") {
        sale_artwork {
          bid_increments
        }
      }
    } """
  .catch(next).then ({ artwork }) ->
    res.locals.bidIncrements = artwork.sale_artwork.bid_increments
    render()

@buyersPremium = (req, res, next) ->
  new Sale(id: req.params.id).fetch
    error: res.backboneError
    success: (auction) ->
      buyersPremium auction, (err, html) ->
        return next err if err
        res.render 'buyers-premium', body: html
