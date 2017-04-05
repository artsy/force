_ = require 'underscore'
CurrentUser = require '../../../../models/current_user'
SaveControls = require './../artwork_item_metaphysics/save_controls/view'

module.exports = (artworks) ->
  if user = CurrentUser.orNull()
    user.initializeDefaultArtworkCollection()
    saved = user.defaultArtworkCollection()
    saved.addRepoArtworks artworks
    saved.syncSavedArtworks()

  $artworks = $('.artwork-item')

  _.each artworks, (artwork) =>
    $el = $artworks.filter("[data-artwork='#{artwork.id}']").find '.overlay-container'
    new SaveControls el: $el, artworkCollection: saved, artwork: artwork, context_page: 'Show page'
