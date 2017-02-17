ArtworkMasonryView = require '../../../../components/artwork_masonry/view.coffee'

module.exports = ->
  $el = $('.js-artwork-auction-artworks')

  console.log 'hi'
  masonryView = new ArtworkMasonryView
    el: $el
    context_page: 'Artwork page'
    context_module: 'Artwork auction module'

  artworks = $el
    .find '.js-artwork-brick'
    .map -> $(this).data 'id'
    .get()
    .map (id) -> id: id

  masonryView
    .reset artworks
    .postRender()
