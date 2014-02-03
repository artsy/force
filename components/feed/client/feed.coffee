_                       = require 'underscore'
Backbone                = require 'backbone'
Artworks                = require '../../../models/artwork.coffee'
sd                      = require('sharify').data
analytics               = require('../../../lib/analytics.coffee')
CurrentUser             = require '../../../models/current_user.coffee'
FeedItems               = require '../collections/feed_items.coffee'
FeedItem                = require '../models/feed_item.coffee'
FeedItemView            = require('./feed_item.coffee').FeedItemView
FeedItemPost            = require('../../post/client/feed_item_post.coffee').FeedItemPost
feedItemsTemplate       = -> require('../templates/feed_items.jade') arguments...
feedItemsContainerTemplate = -> require('../templates/feed_items_container.jade') arguments...

module.exports = class FeedView extends Backbone.View

  rendered: false
  marginLeftRight: 110
  maxWidth: 1194
  minWidth: 950
  textColumnWidth: 404
  textColumnMargin: 80
  items: []

  initialize: (options) ->
    throw 'Requires options' unless options
    throw 'Requires options.feedItems' unless options.feedItems?.length

    @$window = $(window)
    @windowHeight = @$window.innerHeight()
    @$htmlBody = $('html, body')
    @storeOptions options
    @setupCurrentUser()

    @initialFeedItems = @feedItems.removeFlagged()
    if @currentUser
      @currentUser.fetch success: =>
        @render @initialFeedItems
    else
      @render @initialFeedItems

    throttledInfiniteScroll = _.throttle (=> @infiniteScroll()), 250
    @$window.on 'scroll', throttledInfiniteScroll

    if @onResize
      throttledOnResize = _.throttle (=> @onResize()), 250
      @$window.on 'resize', throttledOnResize

  storeOptions: (options) ->
    @feedItems             = options.feedItems

    # for Fair labels
    @headingText           = options.headingText or false
    @headingSortOrder      = options.headingSortOrder or false

    @afterFetchCont        = options.afterFetch
    @widthOffset           = options.widthOffset or 0
    @sortOrder             = options.sortOrder
    @limitPostBodyHeight   = options.limitPostBodyHeight

  render: (items) =>
    @latestItems = items

    @fixedWidth = @getFixedWidth()
    @imageWidth = @getImageWidth()

    @$el.html feedItemsContainerTemplate(
      headingText       : @headingText
      headingSortOrder  : @headingSortOrder
      fixedWidth        : @fixedWidth
      imageWidth        : @imageWidth
      sd                : sd
    )

    @$feedItems = @$('section.feed-items')

    @handleFetchedItems items
    @afterLoadCont() if @afterLoadCont

    @lastItem = @$('.feed-item:last')
    @rendered = true

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
      imageWidth        : @imageWidth
      textColumnWidth   : @textColumnWidth
      sd                : sd
      currentUser       : @currentUser
    ))
    for $item, index in $html
      @initializeFeedItem $item, items[index]
    $html

  initializeFeedItem: ($item, model) ->
    params =
      limitPostBodyHeight: @limitPostBodyHeight
      artworkCollection  : @artworkCollection
      currentUser        : @currentUser
      model              : model
      el                 : $item
      parent             : @

    new FeedItemView params
    if model.get('_type') == 'Post'
      new FeedItemPost params

  handleFetchedItems: (items) ->
    return @handleDoneFetching() unless items.length > 0
    @latestItems = items
    @removeItemsFromTop() if @removeItemsFromTop
    @$feedItems.append @getFeedItemHtml(items)
    @lastItem = @$('.feed-item:last')
    @handleDoneFetching() if @handleDoneFetching

  infiniteScroll: (scrollTop) ->
    @scrollTop = scrollTop || @$window.scrollTop()

    # return if done or if have not computed size yet
    return if @feedItems.doneFetching or @waiting
    return unless @lastItem?.length

    top = if @lastItem.offset() then @lastItem.offset().top else 0
    if @scrollTop + 1500 > top
      @fetchMoreItems()

  getFixedWidth: ->
    windowWidth = @$window.innerWidth() || @minWidth
    windowWidth =
      if windowWidth < @minWidth
        @minWidth
      else if windowWidth > @maxWidth
        @maxWidth
      else
        windowWidth

    windowWidth - @marginLeftRight

  getImageWidth: ->
    @fixedWidth - @textColumnWidth - @textColumnMargin

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()
