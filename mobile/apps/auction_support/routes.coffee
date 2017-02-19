_ = require 'underscore'
Sale = require '../../models/sale.coffee'
Order = require '../../models/order.coffee'
sanitizeRedirect = require '../../components/sanitize_redirect'

registerOrRender = (sale, req, res, next) ->
  req.user.fetchCreditCards
    error: res.backboneError
    success: (creditCards) ->
      if creditCards.length > 0
        req.user.createBidder
          saleId: sale.get('id')
          success: ->
            if req.query.redirect_uri?
              return res.redirect req.query.redirect_uri
            else
              return res.redirect sale.registrationSuccessUrl()
          error: ->
            res.backboneError
      else
        order = new Order()
        res.render 'registration',
          sale: sale
          monthRange: [1..12]
          yearRange: order.getYearRange()

module.exports.auctionRegistration = (req, res, next) ->
  unless req.user
    return res.redirect "/log_in?redirect_uri=" +
        "/auction-registration/#{req.params.id}" +
        "?redirect_uri=#{req.query.redirect_uri}"

  new Sale(id: req.params.id).fetch
    error: res.backboneError
    success: (sale) ->
      res.locals.sd.SALE = sale
      res.locals.sd.REDIRECT_URI = sanitizeRedirect(req.query.redirect_uri) if req.query.redirect_uri?

      # Sale is a registerable auction
      if sale.isRegisterable()
        # Check if the user has registered for the sale
        # If so, redirect back to the feature
        # If not, render the auction registration page
        req.user.registeredForAuction sale.get('id'),
          error: res.backboneError
          success: (isRegistered) ->
            if isRegistered
              if req.query.redirect_uri?
                return res.redirect req.query.redirect_uri
              else
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
