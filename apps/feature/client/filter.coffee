Backbone = require 'backbone'

module.exports = class FilterView extends Backbone.View

  events:
    'click a' : 'triggerArtworkFilter'

  sortHash:
    'artist-a-to-z' : (a) ->
      a.get('artist').sortable_id
    'most-bids': (a) ->
      - a.get('saleArtwork').get('bidder_positions_count')
    'least-bids': (a) ->
      a.get('saleArtwork').get('bidder_positions_count') +
      if a.get('sold') then 0.5 else 0
    'highest-current-bid' : (a) ->
      - a.get('saleArtwork').get('highest_bid_amount_cents')
    'lowest-current-bid' : (a) ->
      a.get('saleArtwork').get('highest_bid_amount_cents')

  initialize: (options) ->
    @on 'doneFetching', =>
      @sortArtworks options.startingSort

  triggerArtworkFilter: (event) ->
    @sortArtworks $(event.target).attr 'data-id'
    false

  setArtworks: (artworks) =>
    @artworks = artworks

  sortArtworks: (sortId) ->
    @$('.active, .faux-underline').removeClass('faux-underline').removeClass('active')
    @$("a[data-id=#{sortId}]").addClass('active').addClass('faux-underline')
    return unless @sortHash[sortId]
    @artworks.comparator = @sortHash[sortId]
    @artworks.sort()
    @artworks.trigger 'filterSort'
