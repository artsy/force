_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
FeedItems               = require '../../../../components/feed/collections/feed_items.coffee'
FeedView                = require '../../../../components/feed/client/feed.coffee'
BorderedPulldown        = require '../../../../components/bordered_pulldown/view.coffee'
qs                      = require 'querystring'

module.exports = class BoothsView extends Backbone.View

  sortOrder: "-featured"

  initialize: (options) ->
    window.view = @
    _.extend @, options
    new BorderedPulldown
      el: $('#fair-booths-sort .bordered-pulldown')

    # Set up a @params model to maintain the query param state for the @shows collection
    # attched to /api/v1/fair/:id/shows
    @params = new Backbone.Model(artworks: true, size: 3)
    @shows = new FeedItems()
    @shows.url = "#{@fair.url()}/shows"

    # Hook into param changes to update view/router state
    @params.on 'change', @fetchShows
    @params.on 'change', @renderHeader
    @params.on 'change:section', @navigateSection
    @params.on 'change:sort', @navigateSort
    @shows.on 'sync', @renderShows

  fetchShows: =>
    @shows.fetch data: @params.toJSON()

  renderHeader: =>
    @$('h1').text if @params.get 'section'
                    "Exhibitors at #{@params.get 'section'}"
                  else if @params.get 'partner_region'
                    "Exhibitors from #{@params.get 'partner_region'}"
                  else
                    'All Exhibitors'

  navigateSection: =>
    @router.navigate "#{@profile.id}/browse/booths/section/#{@params.get 'section'}"

  navigateSort: =>
    @router.navigate location.pathname + "?sort=#{@params.get 'sort'}"

  events:
    'click #fair-booths-az-as-list': 'navigateToAZ'
    'click #fair-booths-sort a': 'sort'

  navigateToAZ: ->
    @router.navigate "#{@profile.id}/browse/exhibitors", { trigger: true }

  sort: (e) ->
    @params.set sort: $(e.target).data 'sort'