Backbone = require 'backbone'
SaveControls = require '../../../../components/artwork_item/save_controls.coffee'
{ trackArtworkImpressions } = require '../../../../components/analytics/impression_tracking.coffee'
FeaturedArtworks = require './collection.coffee'
template = -> require('./template.jade') arguments...

module.exports = class FeaturedArtworksView extends Backbone.View
  initialize: ({ @user }) ->
    @collection = new FeaturedArtworks [], user: @user
    @listenTo @collection, 'sync', @render

  attachSaveControls: (artwork) =>
    new SaveControls
      el: @$("figure[data-artwork=#{artwork.id}]").find('.overlay-container')
      artworkCollection: @savedArtworks
      model: artwork

  syncArtworks: (collection) ->
    trackArtworkImpressions collection.models, @$el
    @user?.initializeDefaultArtworkCollection()
    @savedArtworks = @user?.defaultArtworkCollection()
    collection.map @attachSaveControls
    @savedArtworks?.addRepoArtworks collection
    @savedArtworks?.syncSavedArtworks()

  render: ->
    @$el.html template(artworks: @collection)
    @syncArtworks @collection
    this
