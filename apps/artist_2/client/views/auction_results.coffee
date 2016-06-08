_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
AuctionLotsView = require '../../../../components/auction_lots/client/view.coffee'
AuctionLotDetailView = require '../../../../components/auction_lots/client/detail.coffee'
template = -> require('../../templates/sections/auction_lots.jade') arguments...

module.exports = class AuctionResultsView extends Backbone.View
  subViews: []

  initialize: ({ @model, @user, @collection }) ->
    @originalPath = location.pathname
    mediator.on 'modal:closed', @return
    @listenTo @collection, 'sync', @render

  events:
    'click .auction-lot-details-link': 'auctionDetail'

  auctionDetail: (e) ->
    auctionLotId = $(e.currentTarget).data('auction-lot-id')
    @subViews.push new AuctionLotDetailView lot: @collection.get(auctionLotId), artist: @model, width: '900px'

  close: ->
    mediator.trigger 'modal:close'

  return: =>
    return if @originalPath is window.location.pathname
    window.history.back()

  postRender: ->
    @subViews.push rail = new ArtworkRailView
      $el: @$(".artist-artworks-rail")
      collection: @model.related().artworks
      title: "Works by #{@model.get('name')}"
      viewAllUrl: "#{@model.href()}/works"
      imageHeight: 180

    rail.collection.trigger 'sync'

    $el = @$('#artist-related-articles-section').show()
    _.defer -> $el.addClass 'is-fade-in'

  render: ->
    unless @collection?.length
      @$('#auction-results-section').html "<div class='loading-spinner'></div>"
      return this

    @$el.html template(artist: @model, auctionLots: @collection, user: @user)
    @subViews.push new AuctionLotsView el: @$('#auction-results-section'), artist: @model
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
