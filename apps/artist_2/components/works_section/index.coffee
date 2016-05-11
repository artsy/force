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
    filterView.loadNextPage()
  , offset: 2 * $(window).height()

  stickyHeaderHeight = $('.artist-sticky-header-container').outerHeight(true)
  filterView.topOffset = stickyHeaderHeight

  sticky = new Sticky
  filterView.artworks.on 'sync', ->
    console.log 'sync'
    sticky.rebuild()
    if filterView.remaining() is 0
      console.log 'allLoaded'
      $('#main-layout-footer').css(display: 'block', opacity: 1)
      $.destroyInfiniteScroll()
      allLoaded() if allLoaded
    else
      _.defer =>
        threshold = $(window).scrollTop() + 2 * $(window).height()
        viewBottom = $el.height() + $el.scrollTop()
        loadMore = viewBottom <= threshold
        filterView.loadNextPage() if loadMore

  filterView.artworks.once 'sync', ->
    sticky.headerHeight = $('#main-layout-header').outerHeight(true) + stickyHeaderHeight + 20
    sticky.add filterView.$('#artwork-filter-selection')

  return { filterView, sticky }
