ArtworkFilter = require '../../../../components/artwork_filter/index.coffee'
Sticky = require '../../../../components/sticky/index.coffee'

module.exports = ( { el, model, allLoaded } ) ->
  $el = $(el)
  filterRouter = ArtworkFilter.init
    el: $el
    model: model
    mode: 'grid'
    showSeeMoreLink: false

  filterView = filterRouter.view
  $('#main-layout-footer').css(display: 'none', opacity: 0)

  $.onInfiniteScroll ->
    if filterView.remaining() is 0
      $('#main-layout-footer').css(display: 'block', opacity: 1)
      $.destroyInfiniteScroll()
      allLoaded() if allLoaded
    else
      filterView.loadNextPage()
  , offset: 2 * $(window).height()

  stickyHeaderHeight = $('.artist-sticky-header-container').outerHeight(true)
  filterView.topOffset = stickyHeaderHeight

  sticky = new Sticky
  filterView.artworks.on 'sync', ->
    sticky.rebuild()
    _.defer =>
      viewportBottom = $(window).scrollTop() + $(window).height()
      viewBottom = $el.height() + $el.scrollTop()
      bottomInView = viewBottom <= viewportBottom
      filterView.loadNextPage() if bottomInView

  filterView.artworks.once 'sync', ->
    sticky.headerHeight = $('#main-layout-header').outerHeight(true) + stickyHeaderHeight + 20
    sticky.add filterView.$('#artwork-filter-selection')

  return filterView
