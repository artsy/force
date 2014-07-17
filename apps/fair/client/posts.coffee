_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
FeedItems = require '../../../components/feed/collections/feed_items.coffee'
PoplockitFeed = require('../../../components/feed/client/poplockit_feed.coffee')

module.exports = class FairPosts extends Backbone.View

  initialize: (options) ->
    @$el.addClass 'feed'
    @fetchPosts()

  fetchPosts: ->
    url = "#{sd.API_URL}/api/v1/profile/#{@model.get('id')}/posts"
    new FeedItems().fetch
      url: url
      data:
        size: 3
      success: (items) =>
        items.urlRoot = url
        new PoplockitFeed
          limitPostBodyHeight: true
          feedItems: items
          el: @$el
