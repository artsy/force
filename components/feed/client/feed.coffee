_                       = require 'underscore'
Backbone                = require 'backbone'
Artworks                = require '../../../models/artwork.coffee'
sd                      = require('sharify').data
analytics               = require('../../../lib/analytics.coffee')
CurrentUser             = require '../../../models/current_user.coffee'
FeedItems               = require '../collections/feed_items.coffee'
Profile                 = require '../../../models/profile.coffee'
FollowProfiles          = require '../../../collections/follow_profiles.coffee'
FeedItem                = require '../models/feed_item.coffee'
FeedItemView            = require('./feed_item.coffee').FeedItemView
FeedItemPost            = require('../../post/client/feed_item_post.coffee').FeedItemPost
feedItemsTemplate       = -> require('../templates/feed_items.jade') arguments...
FollowProfileButton     = require '../../../apps/partners/client/follow_profiles_button.coffee'
{ readCookie, deleteCookie, createCookie } = require '../../util/cookie.coffee'
feedItemsContainerTemplate = -> require('../templates/feed_items_container.jade') arguments...

module.exports = class FeedView extends Backbone.View

  rendered: false
  marginLeftRight: 110
  maxWidth: 1194
  minWidth: 950
  textColumnWidth: 404
  textColumnMargin: 80
  feedItemClass: 'feed-item-partner-show'
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

    @scrollToLastClickedLink()

  scrollToLastClickedLink: =>
    return false unless cursor = readCookie('clicked-feed-item-cursor')
    imagesLoaded = require '../../../lib/vendor/imagesloaded.js'
    href = readCookie 'clicked-feed-item-href'
    @feedItems.lastCursor = cursor
    $(document).one 'ajaxStop', =>
      @$el.prepend """
        <div class='feed-previous-button'>
          <button class='avant-garde-button-text'>
            Load previous items
          </button>
        </div>
      """
      $el = @$("a[href='#{href}']")
      return unless $el.length
      @$htmlBody.imagesLoaded => @$htmlBody.scrollTop $el.offset().top - 200
    deleteCookie 'clicked-feed-item-cursor'
    deleteCookie 'clicked-feed-item-href'
    true

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

  destroy: ->
    @$el.html ''
    @$window.off '.feed'

  events:
    'click a[href*="/"]': 'storeClickedLink'
    'click .feed-previous-button': 'loadPrevious'

  storeClickedLink: (e) ->
    return unless cursor = $(e.currentTarget).closest('.feed-item').data('cursor')
    createCookie 'clicked-feed-item-cursor', cursor
    createCookie 'clicked-feed-item-href', $(e.currentTarget).attr('href')

  loadPrevious: ->
    @$(".feed-previous-button button").addClass('is-loading')
    @feedItems.lastCursor = @feedItems.cursor = null
    @$feedItems.children().remove()
    @fetchMoreItems()
    $(document).one 'ajaxStop', => @$(".feed-previous-button").remove()