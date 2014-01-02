_ = require 'underscore'

Artist        = require '../../models/artist'
AuctionLots   = require '../../collections/auction_lots'

@artist = (req, res) ->
  artist        = null
  auctionLots   = null
  currentPage   = parseInt req.query.page || 1
  sort          = req.query.sort

  render = _.after 2, ->
    res.render 'artist',
      auctionLots : auctionLots
      artist      : artist

  new Artist(id: req.params.id).fetch
    cache  : true
    success: (response) -> artist = response; render()
    error  : res.backboneError
  new AuctionLots([],
    id    : req.params.id
    sortBy: sort
    state : { currentPage: currentPage }
  ).fetch
    cache  : true
    success: (response) -> auctionLots = response; render()
    error  : res.backboneError

Artwork           = require '../../models/artwork'
ComparableSales   = require '../../collections/comparable_sales'

@artwork = (req, res) ->
  artwork       = null
  auctionLots   = null

  render = _.after 2, ->
    res.render 'artwork',
      artwork: artwork
      auctionLots: auctionLots

  new Artwork(id: req.params.id).fetch
    cache   : true
    success : (response) -> artwork = response; render()
  new ComparableSales([],
    id: req.params.id
  ).fetch
    success : (response) -> auctionLots = response; render()
    error   : res.backboneError
