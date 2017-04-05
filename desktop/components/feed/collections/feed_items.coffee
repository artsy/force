_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
FeedItem = require '../models/feed_item'
CurrentUser = require '../../../models/current_user'

module.exports = class FeedItems extends Backbone.Collection

  model: FeedItem

  urlRoot: "#{sd.API_URL}/api/v1/me/feed"

  pageSize: 3
  nextPage: 1

  # if we get fewer results than expected it could be due to the
  # index being out of sync so we retry
  fetchRetryMax: 1
  fetchRetries: 0
  doneFetching: false

  getParams: (options) ->
    pageSize = options?.pageSize || @pageSize
    params = { size: pageSize }
    params.cursor = @cursor if @cursor
    params.page = @page if @page
    params.feed = @feedId if @feedId
    params.sort = options.sort if options?.sort

    # Store the sort param for subsequent requests
    if options?.sort
      @sortParam = options.sort
    if not params.sort and @sortParam
      params.sort = @sortParam

    # filters out shows w/o artworks
    params.artworks = options.artworks if options?.artworks

    _.extend(params, options.additionalParams) if options?.additionalParams
    params

  fetchFeedItems: (options) =>
    return if @fetching or @doneFetching
    @fetching = true
    new FeedItems().fetch
      data: @getParams(options)
      url: @urlRoot
      success: (feedItems) =>
        if feedItems.cursor?
          @cursor = feedItems.cursor
          @feedId = feedItems.feedId
          @doneFetching = true unless @cursor?
        else
          @page ||= 1
          @page = @page + 1
          @doneFetching = true if feedItems.models.length == 0
        @fetching = false
        options?.success?(feedItems)
      error: (feedItems, xhr) =>
        options?.error?(feedItems, xhr)

  # Overrides backbone's parse
  parse: (response) =>
    if response.results
      @cursor = response.next
      @feedId = response.feed
      response.results
    else
      response

  removeFlagged: ->
    currentUser = CurrentUser.orNull()
    filtered = @filter (feedItem) =>
      return true if !feedItem.flagged()
      return true if feedItem.get('author') and currentUser?.get('id') and feedItem.get('author').id == currentUser.get('id')
      return true if currentUser?.isAdmin()
    @reset filtered
