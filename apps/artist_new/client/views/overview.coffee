_ = require 'underscore'
{ STATUSES, IMAGES } = require('sharify').data
Backbone = require 'backbone'
analytics = require '../../../../lib/analytics.coffee'
mediator = require '../../../../lib/mediator.coffee'
# Sub-header
AdditionalImages = require '../../../../collections/additional_images.coffee'
ImageModule = require '../../../../components/image_module/index.coffee'
RelatedGenesView = require '../../../../components/related_links/types/artist_genes.coffee'
# Main section
ArtworkFilter = require '../../../../components/artwork_filter/index.coffee'
# Bottom sections
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
lastModified = require './last_modified.coffee'
template = -> require('../../templates/overview.jade') arguments...

module.exports = class OverviewView extends Backbone.View
  subViews: []
  fetches: []
  className: 'artist-page--overview'

  initialize: ({ @user }) ->

  setupArtworkFilter: ->
    filterRouter = ArtworkFilter.init el: @$('#artist-page-section-works .artist-page-section__content'), model: @model, mode: 'grid'
    @filterView = filterRouter.view
    @subViews.push @filterView

  setupRelatedShows: ->
    if STATUSES.shows
      @fetches.push @model.related().shows.fetch(remove: false, data: solo_show: true, size: 4)
      @fetches.push @model.related().shows.fetch(remove: false, data: solo_show: false, size: 4)
      subView = new RelatedShowsView model: @model, collection: @model.related().shows
      @$('#artist-page-section-shows .artist-page-section__content').html subView.render().$el
      @subViews.push subView

  setupRelatedArticles: ->
    if STATUSES.articles
      @fetches.push @model.related().articles.fetch()
      subView = new RelatedArticlesView collection: @model.related().articles, numToShow: 4
      @$('#artist-page-section-articles .artist-page-section__content').html subView.render().$el
      @subViews.push subView
      @setupRelatedSection @$('#artist-page-section-articles .artist-page-section__content')

  setupRelatedGenes: ->
    subView = new RelatedGenesView
      el: @$('.artist-related-genes')
      id: @model.id
      headerTemplate: _.template '<h2>Known For</h2>'
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
    _.each _.pick(STATUSES, 'artists', 'contemporary'), (display, key) =>
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
    $section = @$("#artist-page-section-#{type}")
    if @model.related()[type].length
      @setupRelatedSection $section
      collection = new Backbone.Collection(@model.related()[type].take 5)
      subView = new ArtistFillwidthList
        el: @$("#artist-page-section-#{type} .artist-page-section__content")
        collection: collection
        user: @user
      subView.fetchAndRender()
      @subViews.push subView
    else
      $section.remove()

  setupImageModule: ->
    ImageModule @$('.js-image-module'), new AdditionalImages(IMAGES)

  postRender: ->
    # Sub-header
    @setupRelatedGenes()
    @setupImageModule()
    # Main section
    @setupArtworkFilter()
    # Bottom sections
    @setupRelatedArtists()
    @setupRelatedShows()
    @setupRelatedArticles()
    @setupLastModifiedDate()

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
