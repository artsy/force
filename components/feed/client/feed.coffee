_                       = require 'underscore'
Backbone                = require 'backbone'
Artworks                = require '../../../models/artwork.coffee'
sd                      = require('sharify').data
analytics               = require '../../../lib/analytics.coffee'
CurrentUser             = require '../../../models/current_user.coffee'
FeedItems               = require '../collections/feed_items.coffee'
Profile                 = require '../../../models/profile.coffee'
FollowProfiles          = require '../../../collections/follow_profiles.coffee'
FeedItem                = require '../models/feed_item.coffee'
FeedItemView            = require('./feed_item.coffee').FeedItemView
FeedItemPost            = require('../../post/client/feed_item_post.coffee').FeedItemPost
feedItemsTemplate       = -> require('../templates/feed_items.jade') arguments...
FollowProfileButton     = require '../../../apps/partners/client/follow_profiles_button.coffee'
feedItemsContainerTemplate = -> require('../templates/feed_items_container.jade') arguments...

module.exports = class FeedView extends Backbone.View

  rendered: false
  marginLeftRight: 110
  maxWidth: 1194
  minWidth: 950
  textColumnWidth: 404
  textColumnMargin: 80
  feedItemClass: 'feed-item-partner-show'
  analyticsFollowMessage: 'Followed partner profile from feed'
  analyticsUnfollowMessage: 'Unfollowed partner profile from feed'
  feedName: 'Shows Feed'
  items: []

  initialize: (options) ->
    throw 'Requires options' unless options
    throw 'Requires options.feedItems' unless options.feedItems?

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

    if @onResize
      throttledOnResize = _.throttle (=> @onResize()), 250
      @$window.on 'resize.feed', throttledOnResize

  storeOptions: (options) ->
    @feedItems             = options.feedItems

    # for Fair labels
    @headingText           = options.headingText or false
    @headingSortOrder      = options.headingSortOrder or false

    @afterFetchCont        = options.afterFetch
    @widthOffset           = options.widthOffset or 0
    @sortOrder             = options.sortOrder
    @limitPostBodyHeight   = options.limitPostBodyHeight
    @additionalParams      = options.additionalParams
    if options.afterLoadCont
      @afterLoadCont       = options.afterLoadCont

  render: (items) =>
    @latestItems = items

    @fixedWidth = @getFixedWidth()
    @imageWidth = @getImageWidth()

    @$el.html feedItemsContainerTemplate(
      headingText       : @headingText
      headingSortOrder  : @headingSortOrder
      fixedWidth        : @fixedWidth
      imageWidth        : @imageWidth
      feedItemClass     : @feedItemClass
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
      feedItemClass     : @feedItemClass
    ))
    $html.attr('data-cursor', @feedItems.lastCursor)
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
    return @handleDoneFetching?() unless items.length > 0
    @latestItems = items
    @removeItemsFromTop() if @removeItemsFromTop
    @$feedItems.append @getFeedItemHtml(items)
    @lastItem = @$('.feed-item:last')
    @handleDoneFetching()

  handleDoneFetching: ->
    ids = []
    @$('.unrendered-feed-item').each (index, item) =>
      $feedItem = $(item).removeClass 'unrendered-feed-item'
      $button = $feedItem.find('.follow-button')
      id = $button.attr('data-id')
      model = new Profile(id: id)
      @initFollowButton model, $button
      ids.push id
    @followProfiles?.syncFollows ids

  initFollowButton: (profile, el) ->
    new FollowProfileButton
      el         : el
      model      : profile
      collection : @followProfiles
      analyticsFollowMessage   : @analyticsFollowMessage
      analyticsUnfollowMessage : @analyticsUnfollowMessage

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
        # Destroy the feed if it isn't visible (helps with fair filtering)
        @destroy()
    @trackScroll()

  scrollPositionsTracked: {}
  scrollInterval: 3000
  lastScrollIntervalTracked: 0
  trackScroll: ->
    scrollPosition = @lastScrollIntervalTracked + @scrollInterval
    if @scrollTop > scrollPosition and not @scrollPositionsTracked[scrollPosition]
      @scrollPositionsTracked[scrollPosition] = true
      @lastScrollIntervalTracked = scrollPosition
      analytics.track.click "#{@feedName} scroll: #{scrollPosition}"

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

  destroy: =>
    @$el.html ''
    @$window.off '.feed'