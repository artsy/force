Backbone = require 'backbone'
State = require './state.coffee'
template = -> require('./templates/index.jade') arguments...

module.exports = class AuctionArtworkListView extends Backbone.View
  className: 'auction-artwork-list'

  events:
    'change .js-auction-artwork-list-sort': 'setState'

  initialize: ->
    @state = new State

    @listenTo @state, 'change', @render
    @listenTo @collection, 'reset add remove', @render

  setState: (e) ->
    e.preventDefault()
    @state.set 'sort', $(e.currentTarget).val()

  sorts: (artwork) ->
    { saleArtwork, artist } = artwork.related()

    default: saleArtwork.get('position') or saleArtwork.id
    name_asc: artist.get('sortable_id')
    bids_desc: -(saleArtwork.get('bidder_positions_count'))
    bids_asc: saleArtwork.get('bidder_positions_count')
    amount_desc: -(saleArtwork.get('highest_bid_amount_cents') or saleArtwork.get('opening_bid_cents'))
    amount_asc: saleArtwork.get('highest_bid_amount_cents') or saleArtwork.get('opening_bid_cents')
    estimate_asc: saleArtwork.get('high_estimate_cents') or saleArtwork.get('estimate_cents') or saleArtwork.get('low_estimate_cents')
    estimate_desc: -(saleArtwork.get('high_estimate_cents') or saleArtwork.get('estimate_cents') or saleArtwork.get('low_estimate_cents'))

  artworks: ->
    @collection.sortBy (artwork) =>
      @sorts(artwork)[@state.get('sort')]

  render: ->
    @$el.html template
      state: @state
      auction: @model
      artworks: @artworks()
    this
