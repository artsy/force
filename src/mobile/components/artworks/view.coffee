_ = require 'underscore'
PoliteInfiniteScrollView = require '../../components/polite_infinite_scroll/client/view.coffee'
artworkColumnsTemplate = -> require('../../components/artwork_columns/template.jade') arguments...

module.exports.ArtworksView = class ArtworksView extends PoliteInfiniteScrollView
  page: 1

  onInfiniteScroll: ->
    return if @finishedScrolling
    @page++
    @collection.fetch
      data: _.extend(@params, page: @page)
      remove: false
      success: (artworks, res) =>
        @onFinishedScrolling() if res.length is 0
