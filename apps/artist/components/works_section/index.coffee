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

  filterView = filterRouter.view
  mediator.trigger 'infinite:scroll:start'

  stickyHeaderHeight = $('.artist-sticky-header-container').outerHeight(true)
  filterView.topOffset = stickyHeaderHeight
  sticky = new Sticky

  setupInfiniteScroll = ->
    $.onInfiniteScroll ->
      filterView.loadNextPage()
    , offset: 2 * $(window).height()

  setupInfiniteScroll()

  onSync = ->
    if filterView.remaining() is 0 or filterView.expired()
      mediator.trigger 'infinite:scroll:end'
      $.destroyInfiniteScroll()
      allLoaded() if allLoaded
    else
      _.defer =>
        threshold = $(window).scrollTop() + 2 * $(window).height()
        viewBottom = $el.height() + $el.scrollTop()
        loadMore = viewBottom <= threshold
        filterView.loadNextPage() if loadMore

  filterView.artworks.on 'sync', (x, { hits }) ->
    if filterView.filter.__active__()
      onSync()
    else
      filterView.filter.once 'sync:new', ->
        onSync()

  filterView.filter.selected.on 'change', ->
    setupInfiniteScroll()

  filterView.artworks.once 'sync', ->
    sticky.headerHeight = $('#main-layout-header').outerHeight(true) + stickyHeaderHeight + 20
    sticky.add filterView.$('#artwork-filter-selection')

  return { filterView, sticky }
