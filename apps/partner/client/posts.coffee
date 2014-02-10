_             = require 'underscore'
Backbone      = require 'backbone'
CurrentUser   = require '../../../models/current_user.coffee'
FeedItems     = require '../../../components/feed/collections/feed_items.coffee'
PoplockitFeed = require '../../../components/feed/client/poplockit_feed.coffee'
{ ARTSY_URL } = require('sharify').data

module.exports = class PartnerPostsView extends Backbone.View

  initialize: (options={}) ->
    { @profile, @partner } = options
    @feedItems = new FeedItems()
    @listenTo @feedItems, "request", @renderLoading
    @listenTo @feedItems, "sync", @doneLoading
    @initializePosts()

  initializePosts: ->
    url = "#{ARTSY_URL}/api/v1/profile/#{@profile.get('id')}/posts"
    @feedItems.fetch
      url: url
      success: (items) =>
        @hideLoading()
        items.urlRoot = url
        new PoplockitFeed
          limitPostBodyHeight : true
          feedItems           : items
          el                  : $('<div id="partner-posts"></div>').appendTo @$el

  renderLoading: ->
    unless @$loadingSpinner?
      @$el.after( @$loadingSpinner = $('<div class="loading-spinner"></div>') )
    @$loadingSpinner.show()

  hideLoading: -> @$loadingSpinner.hide()
