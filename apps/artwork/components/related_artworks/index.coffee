{ CLIENT } = require('sharify').data
Sticky = require '../../../../components/sticky/index.coffee'
ArtworkRelatedArtworksView = require './view.coffee'

module.exports = ->
  $el = $('.js-artwork-related-artworks')

  return unless $el.length

  view = new ArtworkRelatedArtworksView id: CLIENT.id, el: $el

  artworks = view.sections()
    .find '.js-artwork-brick'
    .map -> $(this).data 'id'
    .get()
    .map (id) -> id: id

  view.postRender artworks

  sticky = new Sticky
  sticky.add $el.find '.js-artwork-related-artworks-tabs-nav'
