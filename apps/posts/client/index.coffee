_              = require 'underscore'
Backbone       = require 'backbone'
sd             = require('sharify').data
FeedItems      = require('../../../components/feed/collections/feed_items.coffee')
PoplockitFeed  = require('../../../components/feed/client/poplockit_feed.coffee')

module.exports = class PostsView extends Backbone.View

  url: (tab) ->
    switch tab
      when 'featured'
        "#{sd.ARTSY_URL}/api/v1/posts/featured/feed"
      when 'all'
        "#{sd.ARTSY_URL}/api/v1/posts/feed"
      else
        "#{sd.ARTSY_URL}/api/v1/me/feed"

  initialize: (options) ->
    throw "requires options.tab" unless options.tab
    url = @url(options.tab)
    new FeedItems().fetch
      url: url
      data:
        size: 3
      success: (items) =>
        if items.models.length > 0
          items.urlRoot = url
          new PoplockitFeed
            feedItems : items
            el        : @$('.feed')
        else
          callback?.error()

      error: =>
        @$('.feed')
          .html('empty')
          .removeClass('is-loading')

module.exports.init = ->
  new PostsView
    el : $('#posts-page')
    tab: ($('#posts-page .is-active').attr('data-tab') or 'featured')
