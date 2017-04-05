ArtworkMasonryView = require '../../../../components/artwork_masonry_4_column/view'
reveal = require '../../../../components/reveal/index'

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

  $revealButton = $ """
    <div class='reveal'>
      <a class='reveal__button' href='#'>
        <span class='icon-chevron-small-down' />
      </a>
    </div>
  """

  # FIXME: Stub out `components/reveal` and alias to gradient
  reveal $el,
    $button: $revealButton,
    limit: 940,
    showGradient: false
