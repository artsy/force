_                       = require 'underscore'
Backbone                = require 'backbone'
Artworks                = require '../../../models/artwork.coffee'
sd                      = require('sharify').data
analytics               = require('../../../lib/analytics.coffee')
CurrentUser             = require '../../../models/current_user.coffee'
FeedItems               = require '../collections/feed_items.coffee'
FeedItem                = require '../models/feed_item.coffee'
FeedItemView            = require('./feed_item.coffee').FeedItemView
{ isTouchDevice }       = require '../../util/device.coffee'
feedItemsTemplate       = -> require('../templates/feed_items.jade') arguments...
feedItemsContainerTemplate = -> require('../templates/feed_items_container.jade') arguments...

# TODO: add jump module

module.exports.FeedView = class FeedView extends Backbone.View

  rendered: false
  maxItemsInDom: 20
  marginLeftRight: 110
  maxWidth: 1084
  items: []

  initialize: (options) ->
    throw 'Requires options' unless options
    throw 'Requires options.feedItems' unless options.feedItems?.length

    @items = []
    @$window = $(window)
    @windowHeight = @$window.innerHeight()
    @$htmlBody = $('html, body')
    @storeOptions options

    @initialFeedItems = @feedItems.removeFlagged()
    @render @initialFeedItems

    throttledInfiniteScroll = _.throttle (=> @infiniteScroll()), 250
    @$window.on 'scroll', throttledInfiniteScroll

  storeOptions: (options) ->
    @feedItems             = options.feedItems

    # for Fair labels
    @headingText           = options.headingText or false
    @headingSortOrder      = options.headingSortOrder or false

    @afterFetchCont        = options.afterFetch
    @widthOffset           = options.widthOffset or 0
    @sortOrder             = options.sortOrder

  render: (items) =>
    return @handleFetchedItems(items) if @rendered
    @latestItems = items

    @fixedWidth = @getFixedWidth()

    @$el.html feedItemsContainerTemplate(
      headingText       : @headingText
      headingSortOrder  : @headingSortOrder
      fixedWidth        : @fixedWidth
    )

    @$feedItems = @$('section.feed-items')
    @handleFetchedItems items

    if @$feedItems.length and items.length and @latestItems.length
      @lastItem = @$('.feed-item:last')
      @rendered = true
      @afterLoadCont() if @afterLoadCont
    else
      @fetchMoreItems()

  # Fetch / create items
  fetchMoreItems: =>
    @doneInitializingFeedItems = false
    @waiting = true
    analytics.track.click "Paginating FeedItems"
    @feedItems.fetchFeedItems
      additionalParams: @additionalParams
      artworks: true
      sort: @sortOrder
      cursor: @feedItems.cursor
      success: (items) =>
        numberOfItemsFetched = items.length
        items.removeFlagged()
        @afterFetchCont?(items)
        @handleFetchedItems items.models
        @waiting = false
      error: => @waiting = false

  getFeedItemHtml: (items, opts = {}) ->
    $html = $(feedItemsTemplate(
      feedItems         : items
      fixedWidth        : @fixedWidth
    ))
    for $item, index in $html
      @items.push (new FeedItemView
        artworkCollection: @artworkCollection
        model  : items[index]
        el     : $item
        parent : @
      )
    $html

  handleFetchedItems: (items) ->
    return @handleDoneFetching() unless items.length > 0
    @latestItems = items
    $items = @getFeedItemHtml items
    $feedItems = @$('.feed-item')

    # removes 1st @maxItemsInDom items from the dom
    if $feedItems.length > @maxItemsInDom
      itemsRemoved = @maxItemsInDom/2
      $removedItems = $feedItems.slice(0, itemsRemoved)
      height = 0
      for item in $removedItems
        height += $(item).outerHeight()
      bottom = $removedItems.offset().top + height
      $removedItems.remove()
      @$feedItems.append $items
      if @scrollTop > bottom
        @$htmlBody.scrollTop(@scrollTop - height)
    else
      @$feedItems.append $items

    @lastItem = $feedItems.last()

  infiniteScroll: ->
    @scrollTop = @$window.scrollTop()

    # return if done or if have not computed size yet
    return if @feedItems.doneFetching or @waiting
    return unless @lastItem.length

    top = if @lastItem.offset() then @lastItem.offset().top else 0
    if @scrollTop + 1500 > top
      @fetchMoreItems()

  #
  # Helpers
  getFixedWidth: ->
    windowWidth = @$window.innerWidth()  || 800
    if windowWidth > @maxWidth then @maxWidth else windowWidth - @marginLeftRight
  showLoading: => @$el.addClass('loading')
  hideLoading: => @$el.removeClass('loading')

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()
