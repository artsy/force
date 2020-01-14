Analytics = require 'analytics-node'
Sale = require '../../models/sale.coffee'
buyersPremium = require '../../components/buyers_premium/index.coffee'
DateHelpers = require '../../components/util/date_helpers.coffee'

registerAndRedirect = (sale, req, res, next) ->
  req.user.fetchCreditCards
    error: res.backboneError
    success: (creditCards) ->
      if (creditCards.length > 0)
        # If the user did not accept conditions explicitly
        # (through the AcceptConditionsOfSaleModal) redirect to the auction flow
        if req.query['accepted-conditions'] != 'true'
          res.redirect sale.registrationFlowUrl()
        else
          req.user.createBidder
            saleId: sale.get('id')
            error: res.backboneError
            success: (bidder) ->
              analytics = new Analytics(res.locals.sd.SEGMENT_WRITE_KEY)
              analytics.track(
                event: 'Registration submitted',
                userId: req.user.get('id'),
                properties: {
                  auction_slug: sale.get('id'),
                  auction_state: sale.get('auction_state'),
                  user_id: req.user.get('id'),
                  bidder_id: bidder.get('id')
                }
              )
              res.redirect sale.registrationSuccessUrl()


@modalAuctionRegistration = (req, res, next) ->
  unless req.user
    return res.redirect "/log_in?redirect_uri=/auction-registration/#{req.params.id}"
    
  new Sale(id: req.params.id).fetch
    error: res.backboneError
    success: (sale) ->
      if sale.isRegisterable()
        req.user.checkRegisteredForAuction
          saleId: sale.get('id')
          error: res.backboneError
          success: (isRegistered) ->
            if isRegistered
              return res.redirect sale.registrationSuccessUrl()
            else
              registerAndRedirect sale, req, res, next

      # Sale is not registerable yet: render error page
      else if sale.isAuction()
        res.render 'registration-error',
          sale: sale

      # Sale is not an auction: 404
      else
        err = new Error('Not Found')
        err.status = 404
        next err

@buyersPremium = (req, res, next) ->
  new Sale(id: req.params.id).fetch
    error: res.backboneError
    success: (auction) ->
      buyersPremium auction, (err, html) ->
        return next err if err
        res.render 'buyers-premium', body: html
