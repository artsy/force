_ = require 'underscore'
Backbone = require 'backbone'
template =
  grid: -> require('../templates/artwork/grid.jade') arguments...
  list: -> require('../templates/artwork/list.jade') arguments...

class State extends Backbone.Model
  defaults: mode: 'grid', sort: 'default'

module.exports = class AuctionArtworksView extends Backbone.View
  events:
    'click .js-toggle-artworks-sort': 'setState'

  initialize: ->
    @state = new State

    @listenTo @collection, 'reset', @renderArtworks
    @listenTo @state, 'change', @renderArtworks

  sorts: (artwork) ->
    { saleArtwork, artist } = artwork.related()

    default: saleArtwork.get('lot_number') or artwork.id
    name_asc: artist.get('sortable_id')
    bids_desc: -(saleArtwork.get('bidder_positions_count'))
    bids_asc: saleArtwork.get('bidder_positions_count')
    amount_desc: -(saleArtwork.get('highest_bid_amount_cents') or saleArtwork.get('opening_bid_cents'))
    amount_asc: saleArtwork.get('highest_bid_amount_cents') or saleArtwork.get('opening_bid_cents')

  artworks: ->
    @collection.sortBy (artwork) =>
      @sorts(artwork)[@state.get('sort')]

  setState: (e) ->
    e.preventDefault()

    (@$sorts ?= @$('.js-toggle-artworks-sort'))
      .removeClass 'is-active'

    @state.set $(e.currentTarget).addClass('is-active').data()

  renderArtwork: (artwork) =>
    template[@state.get('mode')](auction: @model, artwork: artwork)

  renderArtworks: ->
    (@$artworks ?= @$('.js-auction-artworks'))
      .attr('data-mode', @state.get('mode'))
      .html _.map(@artworks(), @renderArtwork).join ''
