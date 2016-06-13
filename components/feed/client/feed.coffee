_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../models/artwork.coffee'
sd = require('sharify').data
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
FeedItems = require '../collections/feed_items.coffee'
Profile = require '../../../models/profile.coffee'
FollowProfiles = require '../../../collections/follow_profiles.coffee'
FeedItem = require '../models/feed_item.coffee'
FeedItemView = require('./feed_item.coffee').FeedItemView
feedItemsTemplate = -> require('../templates/feed_items.jade') arguments...
feedItemsContainerTemplate = -> require('../templates/feed_items_container.jade') arguments...

module.exports = class FeedView extends Backbone.View

  rendered: false
  marginLeftRight: 110
  maxWidth: 1194
  minWidth: 950
  textColumnWidth: 404
  textColumnMargin: 80
  feedItemClass: 'feed-item-partner-show'
  feedName: 'Shows Feed'
  items: []

  initialize: (options) ->
    throw 'Requires options' unless options
    throw 'Requires options.feedItems' unless options.feedItems?

    { @context_page, @context_module } = options
    @$window = $(window)
    @windowHeight = @$window.innerHeight()
    @$htmlBody = $('html, body')
    @storeOptions options
    @setupCurrentUser()

    @initialFeedItems = @feedItems.removeFlagged()
    if @currentUser
      @currentUser.fetch success: =>
        @followProfiles = new FollowProfiles
        @render @initialFeedItems
    else
      @render @initialFeedItems

    throttledInfiniteScroll = _.throttle (=> @infiniteScroll()), 250
    @$window.on 'scroll.feed', throttledInfiniteScroll

    mediator.trigger 'infinite:scroll:start'

    if @onResize
      throttledOnResize = _.throttle (=> @onResize()), 250
      @$window.on 'resize.feed', throttledOnResize

  storeOptions: (options) ->
    @feedItems = options.feedItems

    # for Fair labels
    @headingText = options.headingText or false
    @headingSortOrder = options.headingSortOrder or false

    @afterFetchCont = options.afterFetch
    @widthOffset = options.widthOffset or 0
    @sortOrder = options.sortOrder
    @limitPostBodyHeight = options.limitPostBodyHeight
    @additionalParams = options.additionalParams
    @hideSeeMoreButtons = options.hideSeeMoreButtons

    if options.afterLoadCont
      @afterLoadCont = options.afterLoadCont

  render: (items) =>
    @latestItems = items

    @fixedWidth = @getFixedWidth()
    @imageWidth = @getImageWidth()

    @$el.html feedItemsContainerTemplate(
      headingText: @headingText
      headingSortOrder: @headingSortOrder
      fixedWidth: @fixedWidth
      imageWidth: @imageWidth
      feedItemClass: @feedItemClass
      hideSeeMoreButtons: @hideSeeMoreButtons
      displayPurchase: @displayPurchase
      sd: sd
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
    analyticsHooks.trigger 'feed:paginating'
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
        @feedExhausted() unless items.cursor?
      error: => @waiting = false

  getFeedItemHtml: (items, opts = {}) ->
    $html = $(feedItemsTemplate(
      feedItems: items
      fixedWidth: @fixedWidth
      imageWidth: @imageWidth
      textColumnWidth: @textColumnWidth
      sd: sd
      currentUser: @currentUser
      feedItemClass: @feedItemClass
      hideSeeMoreButtons: @hideSeeMoreButtons
      displayPurchase: @displayPurchase
    ))
    $html.attr('data-cursor', @feedItems.lastCursor)
    for $item, index in $html
      @initializeFeedItem $item, items[index]
    $html

  initializeFeedItem: ($item, model) ->
    params =
      limitPostBodyHeight: @limitPostBodyHeight
      artworkCollection: @artworkCollection
      currentUser: @currentUser
      model: model
      el: $item
      additionalParams: @additionalParams
      parent: @
      context_page: @context_page
      context_module: @context_module
    new FeedItemView params

  handleFetchedItems: (items) ->
    return @handleDoneFetching?() unless items.length > 0
    @latestItems = items
    @removeItemsFromTop() if @removeItemsFromTop
    @$feedItems.append @getFeedItemHtml(items)
    @lastItem = @$('.feed-item:last')
    @handleDoneFetching?()

  infiniteScroll: (scrollTop) ->
    @scrollTop = scrollTop || @$window.scrollTop()

    # return if done or if have not computed size yet
    return if @feedItems.doneFetching or @waiting
    return unless @lastItem?.length

    top = if @lastItem.offset() then @lastItem.offset().top else 0
    if @scrollTop + 1500 > top
      if @$el.is(':visible')
        @fetchMoreItems()
      else
        @feedExhausted()
    @trackScroll()

  scrollPositionsTracked: {}
  scrollInterval: 3000
  lastScrollIntervalTracked: 0
  trackScroll: ->
    scrollPosition = @lastScrollIntervalTracked + @scrollInterval
    if @scrollTop > scrollPosition and not @scrollPositionsTracked[scrollPosition]
      @scrollPositionsTracked[scrollPosition] = true
      @lastScrollIntervalTracked = scrollPosition
      analyticsHooks.trigger 'feed:scroll',
        name: @feedName
        scrollPosition: scrollPosition

  feedExhausted: ->
    mediator.trigger 'infinite:scroll:end'

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

  getImageWidth: -> 260

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

  destroy: =>
    @$el.html ''
    @$window.off '.feed'
