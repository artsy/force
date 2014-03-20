_                 = require 'underscore'
Artist            = require '../../models/artist'
Artwork           = require '../../models/artwork'
Artworks          = require '../../collections/artworks'
AuctionLot        = require '../../models/auction_lot'
AuctionLots       = require '../../collections/auction_lots'
ComparableSales   = require '../../collections/comparable_sales'

totalCount  = require '../../components/pagination/total_count'
randomPage  = (total, pageSize) ->
  Math.floor(Math.random() * (total / pageSize)) + 1

@detail = (req, res) ->
  lot           = new AuctionLot id: req.params.id
  artist        = new Artist id: req.params.artist_id
  artworks      = new Artworks
  auctionLots   = new AuctionLots [], id: req.params.artist_id, state: currentPage: 1, pageSize: 3
  render        = _.after 4, ->
    res.render 'detail',
      lot         : lot
      artist      : artist
      auctionLots : auctionLots
      artworks    : artworks

  lot.fetch
    cache   : true
    error   : res.backboneError
    success : (model, response) ->
      res.locals.sd.AUCTION_LOT = response
      render()

  artist.fetch
    cache   : true
    error   : res.backboneError
    success : (model, response) ->
      res.locals.sd.ARTIST = response
      render()

  totalCount(res.locals.artsyXappToken, auctionLots.url()).then (total) ->
    auctionLots.state.currentPage = randomPage(total, auctionLots.state.pageSize)
    auctionLots.fetch
      cache   : true
      error   : res.backboneError
      success : (collection, response, options) ->
        res.locals.sd.AUCTION_LOTS = response
        # Ensure the current lot is not in this collection
        auctionLots.remove lot
        render()

  artworks.url = artist.url() + '/artworks'
  totalCount(res.locals.artsyXappToken, artworks.url).then (total) ->
    artworks.fetch
      cache   : true
      error   : res.backboneError
      data    :
        size      : 10
        published : true
        page      : randomPage(total, 10)
      success : (collection, response) ->
        res.locals.sd.ARTWORKS = response
        render()

@artist = (req, res) ->
  currentPage   = parseInt req.query.page or 1
  sort          = req.query.sort
  artist        = new Artist id: req.params.id
  auctionLots   = new AuctionLots [], id: req.params.id, sortBy: sort, state: currentPage: currentPage
  render        = _.after 2, ->
    if auctionLots.length
      res.render 'artist',
        auctionLots : auctionLots
        artist      : artist
    else
      res.redirect artist.href()

  artist.fetch
    cache   : true
    error   : res.backboneError
    success : (response) ->
      res.locals.sd.ARTIST = response
      render()

  auctionLots.fetch
    error   : res.backboneError
    success : (collection, response, options) ->
      res.locals.sd.AUCTION_LOTS = response
      render()

@artwork = (req, res) ->
  artwork       = new Artwork id: req.params.id
  artist        = null
  auctionLots   = new ComparableSales [], id: req.params.id
  render        = _.after 2, ->
    if auctionLots.length
      res.render 'artwork',
        artwork     : artwork
        artist      : artist
        auctionLots : auctionLots
    else
      res.redirect artwork.href()

  artwork.fetch
    cache   : true
    success : (model, response, options) ->
      res.locals.sd.ARTIST = response.artist
      artist = new Artist response.artist
      render()

  auctionLots.fetch
    cache   : true
    error   : res.backboneError
    success : (collection, response, options) ->
      res.locals.sd.AUCTION_LOTS = response
      render()
