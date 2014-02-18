_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
FeedItems               = require '../../../components/feed/collections/feed_items.coffee'
FeedView                = require('../../../components/feed/client/feed.coffee')

module.exports = class BoothsView extends Backbone.View

  url: ->
    "#{@fair.url()}/shows"

  sortOrder: "-updated_at"

  initialize: (options) ->
    { @filter, @fair, @profile } = options
    @$el.show() unless sd.NODE_ENV == 'test'
    @renderHeader()
    @fetchFeedItems()

  renderHeader: ->
    @$('h1').text if @filter.section
                    "Exhibitors at #{@filter.section}"
                  else if @filter.partner_region
                    "Exhibitors from #{@filter.partner_region}"
                  else
                    'All Exhibitors'

  fetchFeedItems: ->
    url = @url()
    additionalParams = @filter
    additionalParams.artworks = true        # only shows that have artworks
    additionalParams.sortOrder = @sortOrder
    new FeedItems().fetch
      url: url
      data:
        _.extend(additionalParams, size: 3)
      success: (items) =>
        if items.models.length > 0
          items.urlRoot = url
          @feed = new FeedView
            el               : @$('.feed')
            feedItems        : items
            additionalParams : additionalParams

  destroy: ->
    @feed?.destroy()