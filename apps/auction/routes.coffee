_ = require 'underscore'
Feature = require '../../models/feature.coffee'
Sale = require '../../models/sale.coffee'
Order = require '../../models/order.coffee'
Artwork = require '../../models/artwork.coffee'
SaleArtwork = require '../../models/sale_artwork.coffee'

registerOrRender = (sale, req, res, next) ->
  req.user.fetchCreditCards
    error  : res.backboneError
    success: (creditCards) ->
      if creditCards.length > 0
        req.user.createBidder
          saleId: sale.get('id')
          success: ->
            return res.redirect sale.registrationSuccessUrl()
          error  : ->
            res.backboneError
      else
        order = new Order()
        res.render 'templates/registration',
          sale: sale
          monthRange: order.getMonthRange()
          yearRange: order.getYearRange()

@auctionRegistration = (req, res, next) ->
  unless req.user
    return res.redirect "/log_in?redirect_uri=/auction-registration/#{req.params.id}"

  new Sale(id: req.params.id).fetch
    error  : res.backboneError
    success: (sale) ->
      res.locals.sd.SALE = sale

      # Sale is a registerable auction
      if sale.isRegisterable()
        # Check if the user has registered for the sale
        # If so, redirect back to the feature
        # If not, render the auction registration page
        req.user.checkRegisteredForAuction
          saleId : sale.get('id')
          error  : res.backboneError
          success: (isRegistered) ->
            if isRegistered
              return res.redirect sale.registrationSuccessUrl()
            else
              registerOrRender sale, req, res, next

      # Sale is not registerable yet: render error page
      else if sale.isAuction()
        res.render 'templates/registration_error',
          sale: sale

      # Sale is not an auction: 404
      else
        res.status 404
        next new Error('Not Found')

@bid = (req, res, next) ->
  unless req.user
    return res.redirect "/log_in?redirect_uri=/feature/#{req.params.id}/bid/#{req.params.artwork}"

  new Sale(id: req.params.id).fetch
    error  : res.backboneError
    success: (sale) ->
      res.locals.sd.SALE = sale
      unless sale.isBidable()
        res.status 404
        next new Error('Not Found')
      else
        saleArtwork = new SaleArtwork
          artwork: new Artwork(id: req.params.artwork)
          sale: sale

        saleArtwork.fetch
          error  : res.backboneError
          success: (saleArtwork) ->
            res.locals.sd.SALE_ARTWORK = saleArtwork
            order = new Order()
            req.user.checkRegisteredForAuction
              saleId : sale.get('id')
              error  : res.backboneError
              success: (isRegistered) ->
                res.render 'templates/bid-form',
                  sale: sale
                  artwork: saleArtwork.artwork()
                  saleArtwork: saleArtwork
                  isRegistered: isRegistered
                  maxBid: saleArtwork.formatBid(req.params.bid)
                  monthRange: order.getMonthRange()
                  yearRange: order.getYearRange()
