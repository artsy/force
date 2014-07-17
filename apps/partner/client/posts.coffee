_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
FeedItems = require '../../../components/feed/collections/feed_items.coffee'
PoplockitFeed = require '../../../components/feed/client/poplockit_feed.coffee'
{ API_URL } = require('sharify').data

module.exports = class PartnerPostsView extends Backbone.View

  initialize: (options={}) ->
    { @profile, @partner } = options
    @feedItems = new FeedItems()
    @render()
    @initializePosts()

  render: ->
    template = '<div id="partner-posts"><div class="loading-spinner"></div></div>'
    $(template).appendTo @$el.empty()

  initializePosts: ->
    url = "#{API_URL}/api/v1/profile/#{@profile.get('id')}/posts"
    @feedItems.fetch
      url: url
      success: (items) =>
        items.urlRoot = url
        new PoplockitFeed
          limitPostBodyHeight: true
          feedItems: items
          el: @$('#partner-posts')
