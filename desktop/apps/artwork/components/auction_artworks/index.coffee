ArtworkMasonryView = require '../../../../components/artwork_masonry/view.coffee'
gradient = require '../../../../components/gradient_blurb/index.coffee'

module.exports = ->
  $el = $('.js-artwork-auction-artworks')

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

  gradient($el, limit: 940, showGradient: false) if $el.length
