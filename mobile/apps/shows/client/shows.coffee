_ = require 'underscore'
sd = require('sharify').data
bootstrap = require '../../../components/layout/bootstrap'
Show = require '../../../models/show'
PartnerShows = require '../../../collections/partner_shows'
PoliteInfiniteScrollView = require '../../../components/polite_infinite_scroll/client/view'
{Cities, FeaturedCities} = require 'places'
showTemplate = -> require('../templates/show-list.jade') arguments...

module.exports.ShowCityView = class ShowCityView extends PoliteInfiniteScrollView

  initialize: (options) ->
    @page = 1
    super

  onInfiniteScroll: ->
    return if @finishedScrolling
    @addItemsToCollection()

  addItemsToCollection: ->
    @page++
    @collection.fetch
      data: _.extend(@params, page: @page)
      remove: false
      success: (partnerShows, res) =>
        @onFinishedScrolling() if res.length is 0

  onInitialFetch: ->
    @showShowMoreButton()
    @hideSpinner()
    @onSync()

  onSync: =>
    if @collection.length > 0
      @$('#running').html showTemplate shows: @collection.models
      @$('#shows-city-empty-message').hide()
    else
      @$('#shows-city-empty-message').show()

module.exports.init = ->
  bootstrap()
  partnerShows = new PartnerShows
  partnerShows.comparator = (show) -> Date.parse(show.get('end_at'))
  new ShowCityView
    collection: partnerShows
    el: $ 'body'
    params: sd.CURRENT_CRITERIA
