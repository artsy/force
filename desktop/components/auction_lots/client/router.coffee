sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../lib/mediator'
Artist = require '../../../models/artist'
Artworks = require '../../../collections/artworks'
AuctionLot = require '../../../models/auction_lot'
AuctionLots = require '../../../collections/auction_lots'
AuctionResultsView = require './view'
DetailView = require './detail'

module.exports = class AuctionResultsRouter extends Backbone.Router
  routes:
    'artist/:artist_id/auction-results': 'close'
    'artist/:artist_id/auction-result/:id': 'details'

  initialize: ->
    @originalPath = location.pathname
    mediator.on 'modal:closed', @return

    @artist = new Artist sd.ARTIST
    @artworks = new Artworks sd.ARTWORKS
    @auctionLots = new AuctionLots sd.AUCTION_LOTS

    @view = new AuctionResultsView
      el: $('body')
      artist: @artist
      artworks: @artworks

  close: ->
    mediator.trigger 'modal:close'

  details: (artist_id, id) ->
    if @originalPath is window.location.pathname
      @close()
    else
      new DetailView lot: @auctionLots.get(id), artist: @artist, width: '900px'

  return: =>
    return if @originalPath is window.location.pathname
    window.history.back()
