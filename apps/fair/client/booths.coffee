_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
FeedItems               = require '../../../components/feed/collections/feed_items.coffee'
FeedView                = require '../../../components/feed/client/feed.coffee'
BorderedPulldown        = require '../../../components/bordered_pulldown/view.coffee'

module.exports = class BoothsView extends Backbone.View

  url: ->
    "#{@fair.url()}/shows"

  sortOrder: "-updated_at"

  initialize: (options) ->
    { @filter, @fair, @profile, @router } = options
    new BorderedPulldown el: $('#fair-booths-sort .bordered-pulldown')
    @$el.show() unless sd.NODE_ENV == 'test'
    @renderHeader()
    @renderExhibitorCount()
    @fetchFeedItems()

  renderHeader: ->
    @$('h1').text if @filter.section
                    "Exhibitors at #{@filter.section}"
                  else if @filter.partner_region
                    "Exhibitors from #{@filter.partner_region}"
                  else
                    'All Exhibitors'

  renderExhibitorCount: ->
    @fair.fetchExhibitors success: (az, c, galleries) =>
      @$('#fair-booths-count').html galleries.length

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

  events:
    'click #fair-booths-az-as-list': 'navigateToAZ'
    'click #fair-booths-sort a': 'sort'

  navigateToAZ: ->
    @router.navigate "#{@profile.id}/browse/exhibitors", { trigger: true }

  sort: (e) ->
    @router.navigate "#{@profile.id}/browse/booths?sort=#{$(e.target).data 'sort'}", { trigger: true }