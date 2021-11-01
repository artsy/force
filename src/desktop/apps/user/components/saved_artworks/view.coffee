{ API_URL } = require('sharify').data
{ defer } = require 'underscore'
Backbone = require 'backbone'
{ Artworks } = require '../../../../collections/artworks'
QuasiInfiniteView = require '../quasi_infinite/view.coffee'
ArtworkColumnsView = require '../../../../components/artwork_columns/view.coffee'

module.exports = class SavedArtworksView extends QuasiInfiniteView
  className: 'settings-saved-artworks'

  kind: 'artworks'

  initialize: ({ @user }) ->
    @params = new Backbone.Model
      total_count: true
      private: true
      size: 10
      page: 1
      sort: '-position'
      user_id: @user.id

    @collection = new Artworks
    @collection.url = "#{API_URL}/api/v1/collection/saved-artwork/artworks"

    super

  postRender: -> defer =>
    if @artworkColumnsView?
      @artworkColumnsView.appendArtworks @collection.models

    else if @collection.length
      @artworkColumnsView = new ArtworkColumnsView
        el: @$('.js-settings-quasi-infinite__collection')
        collection: @collection
        numberOfColumns: 3
        gutterWidth: 30
        allowDuplicates: true
        artworkSize: 'tall'

      @subViews = [
        @artworkColumnsView
      ]
