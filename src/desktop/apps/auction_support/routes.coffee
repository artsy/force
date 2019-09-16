_ = require 'underscore'
Analytics = require 'analytics-node'
Feature = require '../../models/feature.coffee'
Sale = require '../../models/sale.coffee'
Artwork = require '../../models/artwork.coffee'
SaleArtwork = require '../../models/sale_artwork.coffee'
BidderPositions = require '../../collections/bidder_positions.coffee'
buyersPremium = require '../../components/buyers_premium/index.coffee'
metaphysics = require '../../../lib/metaphysics'
DateHelpers = require '../../components/util/date_helpers.coffee'

registerOrRender = (sale, req, res, next) ->
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
      else
        # Render the full registration + credit card form
        # TODO: When the bid + register flow is fully moved to reaction these routes
        # and templates will need cleanup and templates will need deletion.
        res.render 'registration',
          sale: sale
          monthRange: DateHelpers.getMonthRange()
          yearRange: DateHelpers.getYearRange()


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

  render = _.after 3, ->
    res.locals.sd.BIDDER_POSITIONS = bidderPositions.toJSON()
    res.locals.sd.SALE = sale.toJSON()
    res.locals.sd.SALE_ARTWORK = saleArtwork.toJSON()
    res.render 'bid-form',
      sale: sale
      artwork: saleArtwork.artwork()
      saleArtwork: saleArtwork
      bidderPositions: bidderPositions
      isRegistered: res.locals.sd.REGISTERED
      hasValidCreditCard: res.locals.sd.HAS_VALID_CREDIT_CARD
      maxBid: (if req.query.bid then ( req.query.bid / 100 ) else '')
      monthRange: DateHelpers.getMonthRange()
      yearRange: DateHelpers.getYearRange()

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

  metaphysics
    query: """
      query($sale_id: String!, $artwork_id: String!) {
        artwork(id: $artwork_id) {
          sale_artwork {
            bid_increments
          }
        }
        me {
          has_qualified_credit_cards
          bidders(sale_id: $sale_id) {
            id
          }
        }
      }
    """
    req: req,
    variables: { sale_id: sale.get('id'), artwork_id: req.params.artwork }
  .catch(next).then ({ artwork, me }) ->
    res.locals.bidIncrements = artwork.sale_artwork.bid_increments
    res.locals.sd.REGISTERED = Boolean(me?.bidders?.length > 0)
    res.locals.sd.HAS_VALID_CREDIT_CARD = Boolean(me?.has_qualified_credit_cards)
    render()

@buyersPremium = (req, res, next) ->
  new Sale(id: req.params.id).fetch
    error: res.backboneError
    success: (auction) ->
      buyersPremium auction, (err, html) ->
        return next err if err
        res.render 'buyers-premium', body: html
