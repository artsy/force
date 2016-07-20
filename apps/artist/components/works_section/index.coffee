ArtworkFilter = require '../../../../components/artwork_filter/index.coffee'
Sticky = require '../../../../components/sticky/index.coffee'
mediator = require '../../../../lib/mediator.coffee'

module.exports = ( { el, model, allLoaded } ) ->
  $el = $(el)
  filterRouter = ArtworkFilter.init
    el: $el
    model: model
    mode: 'grid'
    showSeeMoreLink: false
    context_page: 'Artist page'
    context_module: 'Works section'

  filterView = filterRouter.view
  mediator.trigger 'infinite:scroll:start'

  $.onInfiniteScroll ->
    filterView.loadNextPage()
  , offset: 2 * $(window).height()

  stickyHeaderHeight = $('.artist-sticky-header-container').outerHeight(true)
  filterView.topOffset = stickyHeaderHeight

  sticky = new Sticky
  filterView.artworks.on 'sync', (x, { hits }) ->
    sticky.rebuild()
    if (
        filterView.remaining() is 0 or
        # `remaining` may be inaccurate (why?) so double check
        # the hits array and if it is empty then stop
        hits.length is 0
    )
      mediator.trigger 'infinite:scroll:end'
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
