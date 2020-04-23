_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
FeedView = require '../../../components/feed/client/shows_feed.coffee'
FeedItems = require '../../../components/feed/collections/feed_items.coffee'
BorderedPulldown = require '../../../components/bordered_pulldown/view.coffee'
{ ContextModule } = require "@artsy/cohesion"

module.exports.ShowsView = class ShowsView extends Backbone.View
  url: "#{sd.API_URL}/api/v1/shows/feed"

  initialize: (options) ->
    new FeedItems().fetch
      url: @url
      data: size: 3
      success: (items) =>
        if items.models.length
          items.urlRoot = @url
          new FeedView
            el: @$('#shows-feed')
            feedItems: items
            context_module: ContextModule.currentShowsRail
        else
          callback?.error()
      error: =>
        @$('#shows-feed').remove()
    new BorderedPulldown
      el: @$('.bordered-scrollable-pulldown')

module.exports.init = ->
  new ShowsView el: $('#shows-page')
