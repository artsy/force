_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
analytics = require '../../../../lib/analytics.coffee'
mediator = require '../../../../lib/mediator.coffee'
Sticky = require '../../../../components/sticky/index.coffee'
# Sub-header
RelatedGenesView = require '../../../../components/related_links/types/artist_genes.coffee'
RelatedRepresentationsGenesView = require '../../../../components/related_links/types/artist_representations.coffee'
# Main section
WorksView = require './works.coffee'
ArtworkFilter = require '../../../../components/artwork_filter/index.coffee'
# Bottom sections
RelatedPostsView = require '../../../../components/related_posts/view.coffee'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
template = ->  require('../../templates/overview.jade') arguments...

module.exports = class OverviewView extends Backbone.View
  subViews: []

  events:
    'click .artist-works-sort a': 'onSortChange'

  initialize: ({ @user, @data }) ->
    @sticky = new Sticky

  setupSubHeader: ->
    @setupRelatedGenes()
    @setupRelatedRepresentations()

  setupArtworkFilter: ->
    # Need to resolve issues with changing heights and sticky not getting correct height
    # @listenToOnce mediator, 'artwork_filter:filter:sync', (model) ->
    #   # Once the filter height is apparent
    #   @sticky.add @$('#artwork-filter')
    # @listenTo filterRouter.view.artworks, 'sync', @sticky.rebuild
    filterRouter = ArtworkFilter.init el: @$('#artwork-section'), model: @model
    @subViews.push filterRouter.view

  setupRelatedShows: ->
    if (collection = @model.related().shows).length
      subView = new RelatedShowsView collection: collection
      @$('#artist-related-shows').html subView.render().$el
      @subViews.push subView
      @setupRelatedSection @$('#artist-related-shows-section')

  setupRelatedPosts: ->
    if (collection = @model.related().posts).length
      subView = new RelatedPostsView collection: collection, numToShow: 4
      @$('#artist-related-posts').html subView.render().$el
      @subViews.push subView
      @setupRelatedSection @$('#artist-related-posts-section')

  setupRelatedGenes: ->
    @subViews.push new RelatedGenesView(el: @$('.artist-related-genes'), id: @model.id)

  setupRelatedRepresentations: ->
    @subViews.push new RelatedRepresentationsGenesView(el: @$('.artist-related-representations'), id: @model.id)

  setupRelatedSection: ($el) ->
    $section = @fadeInSection $el
    @sticky.add $section.find('.artist-related-section-header')
    $el

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'
    $el

  setupRelatedArtists: ->
    @renderRelatedArtists 'Artists'
    @renderRelatedArtists 'Contemporary'

  renderRelatedArtists: (type) ->
    $section = @$("#artist-related-#{type.toLowerCase()}-section")
    if @model["related#{type}"]?.length
      @setupRelatedSection $section
      collection = new Backbone.Collection(@model["related#{type}"].take 5)
      subView = new ArtistFillwidthList
        el: @$("#artist-related-#{type.toLowerCase()}")
        collection: collection
        user: @user
      subView.fetchAndRender()
      @subViews.push subView
    else
      $section.remove()

  postRender: ->
    # Sub-header
    @setupSubHeader()
    # Main section
    @setupArtworkFilter()
    # Bottom sections
    @setupRelatedArtists()
    @setupRelatedShows()
    @setupRelatedPosts()

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
