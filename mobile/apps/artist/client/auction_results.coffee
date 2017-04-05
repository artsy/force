_ = require 'underscore'
qs = require 'querystring'
bootstrap = require '../../../components/layout/bootstrap'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
sd = require('sharify').data
Artist = require '../../../models/artist'
auctionResultTemplate = -> require('../templates/auction_result.jade') arguments...

module.exports.ArtistAuctionResultsView = class ArtistAuctionResultsView extends Backbone.View

  el: 'body'

  auctionParams:
    page: 2       # First page already fetched on the server

  initialize: (options) ->
    @user = options.user
    sort = qs.parse(location.search.replace(/^\?/, '')).sort
    @auctionParams.sort = sort if sort
    @collection = new Backbone.Collection()
    @collection.url = "#{sd.API_URL}/api/v1/artist/#{@model.get('id')}/auction_lots"
    $.onInfiniteScroll => @fetchNextPage()
    @collection.on 'sync', @renderAuctionResults

  fetchNextPage: ->
    @collection.fetch(data: @auctionParams)
    @auctionParams.page += 1

  renderAuctionResults: =>
    html = ""
    for model in @collection.models
      html += auctionResultTemplate(result: model, sd: sd, asset: (->), user: @user)
    @$('#artist-auction-results').append html

  events:
    'change #artist-auction-results-sort select': 'sortAuctionLots'

  sortAuctionLots: ->
    val = @$('#artist-auction-results-sort select').val()
    if val then @auctionParams.sort = val else delete @auctionParams.sort
    @auctionParams.page = 1    # Now we're fetching and re-rendering client side
    @resetAuctionLots()

  resetAuctionLots: ->
    @$('#artist-auction-results').html ""
    @fetchNextPage()

module.exports.init = ->
  bootstrap()
  artist = new Artist sd.ARTIST
  new ArtistAuctionResultsView
    model: artist
    user: CurrentUser.orNull()
