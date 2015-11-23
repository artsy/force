CurrentUser = require '../../../../models/current_user.coffee'
SaveControls = require '../../../../components/artwork_item/save_controls.coffee'

module.exports = (artworks) ->
  if user = CurrentUser.orNull()
    user.initializeDefaultArtworkCollection()
    saved = user.defaultArtworkCollection()
    saved.addRepoArtworks artworks
    saved.syncSavedArtworks()

  $artworks = $('.artwork-item')

  artworks.each (artwork) ->
    $el = $artworks.filter("[data-artwork='#{artwork.id}']").find '.overlay-container'
    new SaveControls el: $el, artworkCollection: saved, model: artwork
