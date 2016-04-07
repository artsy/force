_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
# Sub-header
RelatedGenesView = require '../../../../components/related_links/types/artist_genes.coffee'
# Main section
ArtworkFilter = require '../../../../components/artwork_filter/index.coffee'
# Bottom sections
Sticky = require '../../../../components/sticky/index.coffee'
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
template = -> require('../../templates/sections/overview.jade') arguments...
splitTest = require '../../../../components/split_test/index.coffee'
viewHelpers = require '../../view_helpers.coffee'
gradient = require '../../../../components/gradient_blurb/index.coffee'

module.exports = class OverviewView extends Backbone.View
  subViews: []
  fetches: []

  initialize: ({ @user, @statuses }) ->
    @sticky = new Sticky

  setupArtworkFilter: ->
    filterRouter = ArtworkFilter.init
      el: @$('#artwork-section')
      model: @model
      mode: 'grid'
      showSeeMoreLink: false

    @filterView = filterRouter.view
    stickyHeaderHeight = $('.artist-sticky-header-container').outerHeight(true)
    @filterView.topOffset = stickyHeaderHeight
    @subViews.push @filterView

    @listenTo @filterView.artworks, 'sync', @fetchWorksToFillPage
    @sticky.headerHeight = $('#main-layout-header').outerHeight(true) + stickyHeaderHeight + 20
    @sticky.add @filterView.$('#artwork-filter-selection')

    $.onInfiniteScroll =>
      if @filterView.remaining() is 0
        @fadeInSections()
      else
        @filterView.loadNextPage()

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

  setupRelatedArticles: ->
    if @statuses.articles
      @fetches.push @model.related().articles.fetch()
      subView = new RelatedArticlesView collection: @model.related().articles, numToShow: 4
      @$('#artist-related-articles').html subView.render().$el
      @subViews.push subView

  setupRelatedGenes: ->
    subView = new RelatedGenesView(el: @$('.artist-related-genes'), id: @model.id)
    subView.collection.on 'sync', =>
      @setupBlurb()
      mediator.trigger 'related:genes:render'
    @subViews.push subView


  setupBlurb: ->
    gradient $('.artist-overview-header'), limit: 280, label: 'Read More', heightBreakOffset: 20
    _.defer => @$('.artist-blurb').addClass('is-fade-in')

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

  waitForFilter: ->
    dfd = $.Deferred()
    { filter, artworks } = @filterView
    @listenToOnce artworks, 'sync error', dfd.resolve
    @fetches.push dfd.promise()

  renderRelatedArtists: (type) ->
    $section = @$("#artist-related-#{type}-section")
    if @statuses[type]
      collection = new Backbone.Collection(@model.related()[type].take 5)
      subView = new ArtistFillwidthList
        el: @$("#artist-related-#{type}")
        collection: collection
        user: @user
      subView.fetchAndRender()
      @subViews.push subView
    else
      $section.remove()

  fadeInSections: ->
    _.each @statuses, (status, key) =>
      @setupRelatedSection @$("#artist-related-#{key}-section") if status
      @renderRelatedArtists key if key is ('artists' or 'contemporary')

  postRender: ->
    # Sub-header
    @setupRelatedGenes()
    # Main section
    @setupArtworkFilter()
    # Bottom sections
    @setupRelatedArtists()
    @setupRelatedShows()
    @setupRelatedArticles()
    @waitForFilter()
    $.when.apply(null, @fetches).then =>
      mediator.trigger 'overview:fetches:complete'

  render: ->
    # Template expects plain JSON, not a Backbone model.
    @$el.html template
      artist: @model.toJSON()
      viewHelpers: viewHelpers
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
