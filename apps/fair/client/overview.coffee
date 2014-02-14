_              = require 'underscore'
Backbone       = require 'backbone'
sd             = require('sharify').data
FeedItems      = require '../../../components/feed/collections/feed_items.coffee'
FeedView       = require '../../../components/feed/client/feed.coffee'

module.exports = class Overview extends Backbone.View

  initialize: (options) ->
    @fair = options.fair
    @fetchBooths()

  fetchBooths: ->
    url = "#{@fair.url()}/shows"
    additionalParams = artworks: true, sortOrder: @sortOrder
    new FeedItems().fetch
      url: url
      data:
        _.extend(additionalParams, size: 3)
      success: (items) =>
        if items.models.length > 0
          items.urlRoot = url
          new FeedView
            el               : @$('.browse-section.booths .feed')
            feedItems        : items
            additionalParams : additionalParams
          @$('.browse-sections .browse-section.booths').show()
