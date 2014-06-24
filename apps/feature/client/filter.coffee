Backbone                  = require 'backbone'

module.exports = class FilterView extends Backbone.View

  events:
    'click a' : 'triggerArtworkFilter'

  sortHash:
    'artist-a-to-z' : (model) ->
      model.get('artist').sortable_id
    'most-bids': (model) ->
      - model.get('saleArtwork').get('bidder_positions_count')
    'least-bids': (model) ->
      model.get('saleArtwork').get('bidder_positions_count')
    'highest-current-bid' : (model) ->
      - model.get('saleArtwork').get('highest_bid_amount_cents')
    'lowest-current-bid' : (model) ->
      model.get('saleArtwork').get('highest_bid_amount_cents')

  initialize: (options) ->
    @artworks = options.artworks
    @reRender = options.reRender
    @sortArtworks options.startingSearch

  triggerArtworkFilter: (event) ->
    @sortArtworks $(event.target).attr 'data-id'
    false

  sortArtworks: (sortId) ->
    @$('.active, .faux-underline').removeClass('faux-underline').removeClass('active')
    @$("a[data-id=#{sortId}]").addClass('active').addClass('faux-underline')
    return unless @sortHash[sortId]
    @artworks.comparator = @sortHash[sortId]
    @artworks.sort()
    @reRender(@artworks)
