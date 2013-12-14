_             = require 'underscore'
Artist        = require '../../models/artist'
AuctionLots   = require '../../collections/auction_lots'

@index = (req, res) ->
  artist        = null
  auctionLots   = null
  currentPage   = parseInt req.query.page || 1

  render = _.after 2, ->
    res.render 'template',
      auctionLots: auctionLots
      artist     : artist

  new Artist(id: req.params.id).fetch
    cache  : true
    success: (response) -> artist = response; render()
    error  : res.backboneError

  new AuctionLots([],
    id    : req.params.id
    sortBy: req.query.sort
    state : { currentPage: currentPage }
  ).fetch
    cache  : true
    success: (response) -> auctionLots = response; render()
    error  : res.backboneError
