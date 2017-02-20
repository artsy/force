_ = require 'underscore'
Backbone = require 'backbone'
accounting = require 'accounting'
Feature = require '../../models/feature'
Sale = require '../../models/sale'
Artwork = require '../../models/artwork'
{ API_URL } = require '../../config'
sanitizeRedirect = require '../../components/sanitize_redirect'
metaphysics = require '../../lib/metaphysics'

module.exports.index = (req, res, next) ->
  new Feature(id: req.params.id).fetch
    cache: true
    success: (feature) ->
      res.locals.sd.FEATURE = feature.toJSON()
      res.render 'page', feature: feature
    error: res.backboneError

module.exports.auctionRegister = (req, res, next) ->
  # If not logged in, send them to sign up to return to this handler
  unless req.user
    res.redirect "/sign_up?action=register-for-auction&redirect-to=#{req.url}"
    return

  req.user.registeredForAuction req.params.auctionId,
    error: res.backboneError
    success: (registered) ->
      new Sale(id: req.params.auctionId).fetch
        error: res.backboneError
        success: (sale) ->
          # If logged in and registered for this auction send them to bid page
          if registered
            res.redirect sanitizeRedirect(req.query?.redirect_uri or sale.href())
          # If unregistered render auction registration
          else
            res.locals.sd.SALE = sale.toJSON()
            res.locals.sd.REDIRECT_URI = (req.query?.redirect_uri or sale.href()) + "/confirm-registration"
            res.render 'auction_registration',
              sale: sale
              monthRange: sale.getMonthRange()
              yearRange: sale.getYearRange()

module.exports.bid = (req, res, next) ->
  res.locals.error = req.session.error
  req.session.error = null

  saleArtwork = null; auction = null; registered = false; qualified = false;
  artwork = new Artwork id: req.params.artworkId
  fullURL = req.protocol + "://" + req.get('host') + req.url
  render = _.after 3, ->
    res.render 'bid_page',
      artwork: artwork
      saleArtwork: saleArtwork
      auction: auction
      registered: registered
      qualified: qualified
      registerUrl: auction.registerUrl(fullURL)
  artwork.fetch
    cache: true
    success: render
    error: res.backboneError
  artwork.fetchAuctionAndSaleArtwork
    success: (a, sa) ->
      saleArtwork = sa
      auction = a
      res.locals.sd.SALE_ARTWORK = _.extend saleArtwork.toJSON(), sale: auction.toJSON()
      res.locals.sd.AUCTION = auction

      if req.user
        req.user.registeredForAuction auction.get('id'),
          success: (r) ->
            registered = r
            if registered
              req.user.fetchQualifiedBidder auction.get('id'),
                success: (q) =>
                  qualified = q
                  render()
            else
              render()
          error: res.backboneError
      else
        render()
    error: res.backboneError
  # TODO: Refactor all of this junk to use MP, or drop it in favor of
  # inline bidding component, see: https://github.com/artsy/force/issues/5118
  metaphysics
    req: req
    query: """ {
      artwork(id: "#{req.params.artworkId}") {
        sale_artwork {
          bid_increments
        }
      }
      me {
        lot_standing(
          artwork_id: "#{req.params.artworkId}"
          sale_id: "#{req.params.id}"
        ) {
          most_recent_bid {
            max_bid {
              cents
            }
          }
        }
      }
    } """
  .then ({ artwork, me }) ->
    res.locals.bidIncrements = artwork.sale_artwork.bid_increments
    res.locals.myLastMaxBid = me?.lot_standing?.most_recent_bid.max_bid.cents
    render()
  .catch next

module.exports.confirmRegistration = (from) ->
  return (req, res, next) ->
    locals = switch from
      when 'artwork'
        href: "/artwork/#{req.params.id}"
        buttonCopy: 'Continue Bidding'
      when 'bid'
        href: "/auction/#{req.params.id}/bid/#{req.params.artworkId}"
        buttonCopy: 'Continue Bidding'
      when 'auction'
        href: "/auction/#{req.params.id}"
        buttonCopy: 'Back to Auction'
    locals = _.extend locals,
      h1Copy: 'Registration Complete'
      h2Copy: "We'll notify you when the auction opens."
    res.render "confirm_page", locals
