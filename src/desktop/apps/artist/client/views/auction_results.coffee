_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
AuctionLotsView = require '../../../../components/auction_lots/client/view.coffee'
AuctionLotDetailView = require '../../../../components/auction_lots/client/detail.coffee'
template = -> require('../../templates/sections/auction_lots.jade') arguments...
ArtistArtworksView = require './artworks.coffee'

module.exports = class ArtistAuctionResultsView extends ArtistArtworksView
  initialize: ({ @model, @user, @collection }) ->
    @originalPath = location.pathname
    mediator.on 'modal:closed', @return
    @listenTo @collection, 'sync', @render

  auctionDetail: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: false
    auctionLotId = $(e.currentTarget).data('auction-lot-id')
    @subViews.push new AuctionLotDetailView lot: @collection.get(auctionLotId), artist: @model, width: '900px'

  close: ->
    mediator.trigger 'modal:close'

  return: =>
    return if @originalPath is window.location.pathname
    window.history.back()

  postRender: ->
    super

    @subViews.push new AuctionLotsView
      el: @$('#auction-results-section')
      artist: @model
      onDetailClick: (e) =>
        @auctionDetail(e)

    $el = @$('#artist-related-articles-section').show()
    _.defer -> $el.addClass 'is-fade-in'

  render: ->
    @$el.html template(artist: @model, auctionLots: @collection, user: @user)
    super
    this
