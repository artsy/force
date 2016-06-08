_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
AuctionLotsView = require '../../../../components/auction_lots/client/view.coffee'
AuctionLotDetailView = require '../../../../components/auction_lots/client/detail.coffee'
template = -> require('../../templates/sections/auction_lots.jade') arguments...

module.exports = class AuctionResultsView extends Backbone.View

  initialize: ({ @model, @user, @collection }) ->
    @originalPath = location.pathname
    mediator.on 'modal:closed', @return
    @listenTo @collection, 'sync', @render

  events:
    'click .auction-lot-details-link': 'auctionDetail'

  auctionDetail: (e) ->
    auctionLotId = $(e.currentTarget).data('auction-lot-id')
    new AuctionLotDetailView lot: @collection.get(auctionLotId), artist: @model, width: '900px'

  close: ->
    mediator.trigger 'modal:close'

  return: =>
    return if @originalPath is window.location.pathname
    window.history.back()

  render: ->
    unless @collection?.length
      @$el.html "<div class='loading-spinner'></div>"
      return this

    @$el.html template(artist: @model, auctionLots: @collection, user: @user)
    new AuctionLotsView el: @$el, artist: @model
    this
