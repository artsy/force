Q = require 'bluebird-q'
_ = require 'underscore'
artsyXapp = require 'artsy-xapp'
Artist = require '../../models/artist'
Artwork = require '../../models/artwork'
Artworks = require '../../collections/artworks'
AuctionLot = require '../../models/auction_lot'
AuctionLots = require '../../collections/auction_lots'
totalCount = require 'artsy-ezel-components/pagination/total_count'

randomPage = (total, pageSize) ->
  Math.floor(Math.random() * (total / pageSize)) + 1

@detail = (req, res, next) ->
  lot = new AuctionLot id: req.params.id
  artist = new Artist id: req.params.artist_id
  { artworks } = artist.related()
  auctionLots = new AuctionLots [], id: req.params.artist_id, state: currentPage: 1, pageSize: 3

  Q
    .all [
      lot.fetch cache: true
        .catch ->
          error = new Error
          error.lot = true
          throw error

      artist.fetch cache: true
    ]

    .then ->
      Q.all [
        artworks.fetch cache: true, data: size: 10, published: true
        auctionLots.fetch cache: true
      ]

    .then ->
      if lot.get('artist_id') is artist.get('_id')
        res.locals.sd.AUCTION_LOT = lot.toJSON()
        res.locals.sd.ARTIST = artist.toJSON()
        res.locals.sd.AUCTION_LOTS = auctionLots.toJSON()
        res.locals.sd.ARTWORKS = artworks.toJSON()

        res.render 'detail',
          lot: lot
          artist: artist
          auctionLots: auctionLots
          artworks: artworks
      else
        err = new Error 'Not Found'
        err.status = 404
        throw err

    .catch (err) ->
      if err.lot
        res.redirect 301, "#{artist.href()}/auction-results"
      else
        next err

@artist = (req, res, next) ->
  currentPage = parseInt req.query.page or 1
  sort = req.query.sort
  artist = new Artist id: req.params.id
  auctionLots = new AuctionLots [], id: req.params.id, sortBy: sort, state: currentPage: currentPage

  totalCount artsyXapp.token, auctionLots.url()
    .then (count) ->
      total = parseInt count, 10
      maxPage = Math.ceil total / auctionLots.state.pageSize
      auctionLots.state.currentPage = maxPage if maxPage < currentPage

      Q
        .all [
          artist.fetch cache: true
          auctionLots.fetch cache: true
        ]
        .then ->
          res.locals.sd.ARTIST = artist.toJSON()
          res.locals.sd.AUCTION_LOTS = auctionLots.toJSON()

          if auctionLots.length
            res.render 'artist',
              auctionLots: auctionLots
              artist: artist
          else
            res.redirect artist.href()

        .catch next

@artwork = (req, res) ->
  res.redirect 301, "/artwork/#{req.params.id}"
