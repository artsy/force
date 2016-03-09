_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
# Sub-header
RelatedGenesView = require '../../../../components/related_links/types/artist_genes.coffee'
# Main section
ArtworkFilter = require '../../../../components/artwork_filter/index.coffee'
# Bottom sections
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
lastModified = require './last_modified.coffee'
template = -> require('../../templates/sections/overview.jade') arguments...
splitTest = require '../../../../components/split_test/index.coffee'
viewHelpers = require '../../view_helpers.coffee'

module.exports = class OverviewView extends Backbone.View
  subViews: []
  fetches: []

  initialize: ({ @user, @statuses }) -> #

  setupArtworkFilter: ->
    test = splitTest('artist_works_infinite_scroll')
    outcome = test.outcome()
    showSeeMore = outcome is 'finite'
    filterRouter = ArtworkFilter.init
      el: @$('#artwork-section')
      model: @model
      mode: 'grid'
      showSeeMoreLink: showSeeMore

    @filterView = filterRouter.view
    @filterView.topOffset = $('.artist-sticky-header-container').height()
    @subViews.push @filterView

    if outcome is 'infinite'
      @listenTo @filterView.artworks, 'sync', @fetchWorksToFillPage
      @$('#artwork-section').waypoint (direction) =>
        return if not direction is 'down'
        @filterView.loadNextPage()
      , { offset: 'bottom-in-view' }


  # If you scroll quickly, a new page of artworks may not reach all the way to the bottom of the window.
  # The waypoint must be pushed below the the window bottom in order to be triggered again on subsequent scroll events.
  fetchWorksToFillPage: ->
    _.defer =>
      $.waypoints 'refresh'
      viewportBottom = $(window).scrollTop() + $(window).height()
      viewBottom = @$('#artwork-section').height() + @$('#artwork-section').scrollTop()
      bottomInView = viewBottom < viewportBottom

      @filterView.loadNextPage() if bottomInView

  setupRelatedShows: ->
    if @statuses.shows
      @fetches.push @model.related().shows.fetch(remove: false, data: solo_show: true, size: 4)
      @fetches.push @model.related().shows.fetch(remove: false, data: solo_show: false, size: 4)
      subView = new RelatedShowsView model: @model, collection: @model.related().shows
      @$('#artist-related-shows').html subView.render().$el
      @subViews.push subView
      @setupRelatedSection @$('#artist-related-shows-section')

  setupRelatedArticles: ->
    if @statuses.articles
      @fetches.push @model.related().articles.fetch()
      subView = new RelatedArticlesView collection: @model.related().articles, numToShow: 4
      @$('#artist-related-articles').html subView.render().$el
      @subViews.push subView
      @setupRelatedSection @$('#artist-related-articles-section')

  setupRelatedGenes: ->
    subView = new RelatedGenesView(el: @$('.artist-related-genes'), id: @model.id)
    subView.collection.on 'sync', -> mediator.trigger 'related:genes:render'
    @subViews.push subView

  setupRelatedSection: ($el) ->
    $section = @fadeInSection $el
    $el

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'
    $el

  setupRelatedArtists: ->
    _.each _.pick(@statuses, 'artists', 'contemporary'), (display, key) =>
      if display
        @fetches.push @model.related()[key].fetch
          data: size: 5
          success: =>
            @renderRelatedArtists key

  setupLastModifiedDate: ->
    @fetches.push @waitForFilter()
    $.when.apply(null, @fetches).then =>
      mediator.trigger 'overview:fetches:complete'
      lastModified @model, @filterView.artworks

  waitForFilter: ->
    dfd = $.Deferred()
    { filter, artworks } = @filterView
    @listenToOnce artworks, 'sync error', dfd.resolve
    dfd.promise()

  renderRelatedArtists: (type) ->
    $section = @$("#artist-related-#{type}-section")
    if @model.related()[type].length
      @setupRelatedSection $section
      collection = new Backbone.Collection(@model.related()[type].take 5)
      subView = new ArtistFillwidthList
        el: @$("#artist-related-#{type}")
        collection: collection
        user: @user
      subView.fetchAndRender()
      @subViews.push subView
    else
      $section.remove()

  postRender: ->
    # Sub-header
    @setupRelatedGenes()
    # Main section
    @setupArtworkFilter()
    # Bottom sections
    @setupRelatedArtists()
    @setupRelatedShows()
    @setupRelatedArticles()
    @setupLastModifiedDate()

  render: ->
    # Template expects plain JSON, not a Backbone model.
    @$el.html template
      artist: _.extend @model.toJSON()
      viewHelpers: viewHelpers
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
