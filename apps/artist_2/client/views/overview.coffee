_ = require 'underscore'
Backbone = require 'backbone'
{ capitalize } = require 'underscore.string'
mediator = require '../../../../lib/mediator.coffee'
# Sub-header
RelatedGenesView = require '../../../../components/related_links/types/artist_genes.coffee'
# Bottom sections
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
initWorksSection = require '../../components/works_section/index.coffee'
FollowButton = require '../../../../components/follow_button/view.coffee'
splitTest = require '../../../../components/split_test/index.coffee'
viewHelpers = require '../../view_helpers.coffee'
gradient = require '../../../../components/gradient_blurb/index.coffee'
metaphysics = require '../../../../lib/metaphysics.coffee'
template = -> require('../../templates/sections/overview.jade') arguments...
renderRail = require '../../components/rails/index.coffee'

query =
  """
  query artist($artist_id: String!, $contemporary: Boolean!, $artists: Boolean!) {
    artist(id: $artist_id) {
      ... relatedArtists
    }
  }
  #{require '../../components/related_artists/query.coffee'}

  """

module.exports = class OverviewView extends Backbone.View
  subViews: []
  fetches: []

  initialize: ({ @user, @statuses }) ->
    @listenTo this, 'metaphysicsSync', @renderRails

  setupBlurb: ->
    gradient $('.artist-overview-header'),
      limit: 170,
      label: 'Read More',
      heightBreakOffset: 20
      onClick: =>
        @sticky.rebuild()
    _.defer => @$('.artist-blurb').addClass('is-fade-in')

  fetchRelated: ->
    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
        contemporary: false
        artists: @statuses.artists
    .then ({ artist }) =>
      @trigger 'metaphysicsSync', artist

  renderRails: (artist)->
    following = @following
    @$('.js-artist-rail').map ->
      section = ($el = $(this)).data('key')
      items = artist[section]
      return if not items
      renderRail { $el, section, items, following }

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'
    $el

  fadeInSections: ->
    _.each @statuses, (status, key) =>
      @fadeInSection @$("#artist-related-#{key}-section") if status

  postRender: ->
    # Sub-header
    @setupRelatedGenes()
    # Main section
    { @filterView, @sticky } = initWorksSection
      el: @$('#artwork-section')
      model: @model
      allLoaded: =>
        @fadeInSections()
    @subViews.push @filterView

  setupRelatedGenes: ->
    subView = new RelatedGenesView(el: @$('.artist-related-genes'), id: @model.id)
    subView.collection.on 'sync', =>
      @setupBlurb()
    @subViews.push subView

  render: ->
    # Template expects plain JSON, not a Backbone model.
    @$el.html template
      artist: @model.toJSON()
      viewHelpers: viewHelpers
      statuses: @statuses
    _.defer => @postRender()
    this

  remove: ->
    @filterView.artworks.off 'sync'
    _.invoke @subViews, 'remove'
