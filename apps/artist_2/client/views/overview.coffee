_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
# Sub-header
RelatedGenesView = require '../../../../components/related_links/types/artist_genes.coffee'
# Bottom sections
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
initWorksSection = require '../../components/works_section/index.coffee'
template = -> require('../../templates/sections/overview.jade') arguments...
splitTest = require '../../../../components/split_test/index.coffee'
viewHelpers = require '../../view_helpers.coffee'
gradient = require '../../../../components/gradient_blurb/index.coffee'

module.exports = class OverviewView extends Backbone.View
  subViews: []
  fetches: []

  initialize: ({ @user, @statuses }) ->

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
    gradient $('.artist-overview-header'),
      limit: 170,
      label: 'Read More',
      heightBreakOffset: 20
      onClick: =>
        @sticky.rebuild()
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
    @listenToOnce @filterView.artworks, 'sync error', dfd.resolve
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
    { @filterView, @sticky } = initWorksSection
      el: @$('#artwork-section')
      model: @model
      allLoaded: => @fadeInSections()
    @subViews.push @filterView
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
    @filterView.artworks.off 'sync'
    _.invoke @subViews, 'remove'
