{ CLIENT } = require('sharify').data
ArtworkRelatedArtworksView = require './view.coffee'

module.exports = ->
  $el = $('.js-artwork-related-artworks')

  return unless $el.length

  view = new ArtworkRelatedArtworksView id: CLIENT.id, el: $el

  artworks = view.sections()
    .find '[data-id]'
    .map -> $(this).data 'id'
    .get()
    .map (id) -> id: id

  view.postRender artworks
