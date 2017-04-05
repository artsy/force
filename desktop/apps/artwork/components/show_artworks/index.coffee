ArtworkMasonryView = require '../../../../components/artwork_masonry/view'

module.exports = ->
  $el = $('.js-artwork-show-artworks')

  masonryView = new ArtworkMasonryView
    el: $el
    context_page: 'Artwork page'
    context_module: 'Artwork show module'

  artworks = $el
    .find '.js-artwork-brick'
    .map -> $(this).data 'id'
    .get()
    .map (id) -> id: id

  masonryView
    .reset artworks
    .postRender()
