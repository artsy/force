_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
FeedView                = require('../../../components/feed/client/feed.coffee').FeedView
FeedItems               = require('../../../components/feed/collections/feed_items.coffee')

module.exports.ShowsView = class ShowsView extends Backbone.View

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/shows/feed"

  initialize: (options) ->
    new FeedItems().fetch
      url: @urlRoot()
      data:
        size: 3
      success: (items) =>
        if items.models.length > 0
          items.urlRoot = @urlRoot()
          new FeedView
            feedItems : items
            el        : @$('.feed')
        else
          callback?.error()

      error: =>
        @$('.feed')
          .html('empty')
          .removeClass('loading')

module.exports.init = ->
  new ShowsView
    el: $('#shows-page')
