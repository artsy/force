_ = require 'underscore'
FeedView = require('./feed.coffee')
imagesLoaded = require 'imagesloaded'
{ isTouchDevice } = require '../../util/device.coffee'

module.exports = class PoplockitFeed extends FeedView

  maxItemsInDom: 20
  limitPostBodyHeight: true
  displayPurchase: true
  feedItemClass: 'feed-item-post'
  feedName: 'Posts Feed'

  afterLoadCont: ->
    @$el.popLockIt
      columnSelector: '.feed-column'
      feedItems: @$('.feed-item')
      preventFixed: isTouchDevice()
      onScroll: ((scrollTop) => @infiniteScroll(scrollTop))
    @$feedItems.removeClass 'unrendered-feed-item'
    @popLockItInitialized = true

    @$el.imagesLoaded =>
      @recomputeEachShowHeight()

  onResize: =>
    return if @width == @$window.innerWidth()
    @windowHeight = @$window.innerHeight()
    @reRender()

  reRender: =>
    @$el.popLockIt 'destroy'
    $.data(@$el, "plugin_popLockIt", 0)
    @popLockItInitialized = false
    @render @feedItems.removeFlagged()

  # Removes 1st @maxItemsInDom items from the dom
  removeItemsFromTop: ->
    $feedItems = @$('.feed_item')
    if $feedItems.length > @maxItemsInDom
      itemsRemoved = @maxItemsInDom/2
      $removedItems = $feedItems.slice(0, itemsRemoved)
      height = 0
      for item in $removedItems
        height += $(item).outerHeight()
      bottom = $removedItems.offset().top + height
      $removedItems.remove()
      if @scrollTop > bottom
        @$htmlBody.scrollTop(@scrollTop - height)

  # @override
  handleDoneFetching: (items) ->
    return unless @popLockItInitialized

    $unrenderedItems = @$('.unrendered-feed-item')
    @createNewItems $unrenderedItems
    $unrenderedItems.removeClass 'unrendered-feed-item'

    @$el.imagesLoaded =>
      @recomputeEachShowHeight()

  createNewItems: ($items) ->
    return unless $items and $items.length
    @$el.popLockIt 'addFeedItems', $items

  recomputeEachShowHeight: =>
    @$el.popLockIt('recompute')

  recomputeItemColumn: (index, columnIndex) =>
    @$el.popLockIt 'recomputeItemColumn', index, columnIndex

  getImageWidth: ->
    @fixedWidth - @textColumnWidth - @textColumnMargin

  recomputeItem: ($item) =>
    index = @$('article').index $item
    @$el.popLockIt 'recomputeItem', index
