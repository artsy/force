_ = require 'underscore'
{ STATUSES } = require('sharify').data
Backbone = require 'backbone'
analytics = require '../../../../lib/analytics.coffee'
mediator = require '../../../../lib/mediator.coffee'
Sticky = require '../../../../components/sticky/index.coffee'
# Sub-header
RelatedGenesView = require '../../../../components/related_links/types/artist_genes.coffee'
# Main section
ArtworkFilter = require '../../../../components/artwork_filter/index.coffee'
# Bottom sections
RelatedPostsView = require '../../../../components/related_posts/view.coffee'
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
lastModified = require './last_modified.coffee'
template = -> require('../../templates/overview.jade') arguments...

module.exports = class OverviewView extends Backbone.View
  subViews: []
  fetches: []

  initialize: ({ @user }) ->
    @sticky = new Sticky

  setupArtworkFilter: ->
    filterRouter = ArtworkFilter.init el: @$('#artwork-section'), model: @model, mode: 'grid'
    @filterView = filterRouter.view
    @subViews.push @filterView

  setupRelatedShows: ->
    if STATUSES.shows
      @fetches.push @model.related().shows.fetch(remove: false, data: solo_show: true, size: 4)
      @fetches.push @model.related().shows.fetch(remove: false, data: solo_show: false, size: 4)
      subView = new RelatedShowsView model: @model, collection: @model.related().shows
      @$('#artist-related-shows').html subView.render().$el
      @subViews.push subView
      @setupRelatedSection @$('#artist-related-shows-section')

  setupRelatedPosts: ->
    if STATUSES.posts
      if 'Articles' in (sd.CURRENT_USER?.lab_features or [])
        @fetches.push @model.related().articles.fetch()
        subView = new RelatedArticlesView collection: @model.related().articles, numToShow: 4
      else
        @fetches.push @model.related().posts.fetch()
        subView = new RelatedPostsView collection: @model.related().posts, numToShow: 4
      @$('#artist-related-posts').html subView.render().$el
      @subViews.push subView
      @setupRelatedSection @$('#artist-related-posts-section')

  setupRelatedGenes: ->
    subView = new RelatedGenesView(el: @$('.artist-related-genes'), id: @model.id)
    subView.collection.on 'sync', -> mediator.trigger 'related:genes:render'
    @subViews.push subView

  setupRelatedSection: ($el) ->
    $section = @fadeInSection $el
    @sticky.add $section.find('.artist-related-section-header')
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
    @setupRelatedPosts()
    @setupLastModifiedDate()

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
