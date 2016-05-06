_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
AuctionLots = require '../../../../collections/auction_lots.coffee'
mediator = require '../../../../lib/mediator.coffee'
AuctionLotsView = require '../../../../components/auction_lots/client/view.coffee'
AuctionLotDetailView = require '../../../../components/auction_lots/client/detail.coffee'
template = -> require('../../templates/sections/auction_lots.jade') arguments...
qs = require 'querystring'

module.exports = class AuctionResultsView extends Backbone.View

  initialize: ({ @model, @user }) ->
    @originalPath = location.pathname
    mediator.on 'modal:closed', @return
    { sort, page } = qs.parse(location.search.replace(/^\?/, ''))
    currentPage = parseInt page or 1
    @auctionLots = new AuctionLots [], id: @model.get('id'), sortBy: sort, state: currentPage: currentPage
    @listenTo @auctionLots, 'sync', @render
    @auctionLots.fetch()

  events:
    'click .auction-lot-details-link': 'auctionDetail'

  auctionDetail: (e) ->
    auctionLotId = $(e.currentTarget).data('auction-lot-id')
    new AuctionLotDetailView lot: @auctionLots.get(auctionLotId), artist: @model, width: '900px'

  close: ->
    mediator.trigger 'modal:close'

  return: =>
    return if @originalPath is window.location.pathname
    window.history.back()

  render: ->
    unless @auctionLots?.length
      @$el.html "<div class='loading-spinner'></div>"
      return this

    @$el.html template(artist: @model, auctionLots: @auctionLots, user: @user)
    new AuctionLotsView el: @$el, artist: @model
    this
