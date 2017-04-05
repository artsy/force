_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
FeedItems = require '../../../../components/feed/collections/feed_items'
ShowsFeed = require '../../../../components/feed/client/shows_feed'
BorderedPulldown = require '../../../../components/bordered_pulldown/view'
qs = require 'querystring'
FilterNav = require '../../../../components/filter/nav/view'
deslugify = require '../../../../components/deslugify/index'
mediator = require '../../../../lib/mediator'

navSectionsTemplate = -> require('./nav_sections.jade') arguments...

module.exports = class BoothsView extends Backbone.View

  sortOrder: "-featured"

  initialize: (options) ->
    _.extend @, options

    # Set up a @params model to maintain the query param state for the @shows collection
    # attched to /api/v1/fair/:id/shows
    @params = new Backbone.Model sort: '-featured', private_partner: false
    @shows = new FeedItems
    @shows.url = "#{@fair.url()}/shows"

    # Add child view
    new BorderedPulldown
      el: @$('#fair-booths-sort .bordered-pulldown')
    new FilterNav
      el: @$('#fair-booths-filter-nav')
      params: @params
      highlightAllAttrs: ['section']

    # Hook into param changes to update view/router state
    @params.on 'change', @fetchShows
    @params.on 'change reset', @toggleBoothCount
    @params.on 'change:section reset', @navigateSection
    @params.on 'change:sort', @navigateSort
    @shows.on 'request', => @$('.feed').html('')
    @shows.on 'sync', @renderShows

    # Render the navigation dropdown sections
    @fair.fetchSections success: @renderSections

    mediator.on 'infinite:scroll:end', @hideSpinner, @

  renderSections: (sections) =>
    hash = {}
    sections.each (section) -> hash[section.get 'section'] = section.get('section')
    @$('#fair-filter-sections').html navSectionsTemplate
      sections: hash
      filterRoot: "#{@fair.href()}/browse/booths"

  fetchShows: =>
    @shows.fetch data: _.extend @params.toJSON(), artworks: true

  renderShows: (items) =>
    return @hideSpinner() unless items.length > 0
    items.urlRoot = @shows.url
    @feedView?.destroy()
    @feedView = new ShowsFeed
      el: @$('.browse-section.booths .feed')
      feedItems: items
      additionalParams: @params.toJSON()
      hideSeeMoreButtons: false
      context_page: 'Fair page'
      context_module: 'Booth'
    @feedView.feedName = 'Fair Feed'

  hideSpinner: ->
    @$('#fair-booths-spinner').hide()

  toggleBoothCount: =>
    @$('.fair-booths-count-container')[if @params.get('section') then 'hide' else 'show']()

  navigateSection: =>
    if @params.get 'section'
      @router.navigate "#{@profile.id}/browse/booths/section/#{@params.get 'section'}"
    else
      @router.navigate "#{@profile.id}/browse/booths"

  navigateSort: =>
    @router.navigate location.pathname + "?sort=#{@params.get 'sort'}"

  events:
    'click #fair-booths-sort a': 'sort'
    'click #fair-filter-all-exhibitors': 'allExhibitors'

  sort: (e) ->
    @params.set sort: $(e.target).data 'sort'

  allExhibitors: ->
    false
