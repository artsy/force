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
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
template = -> require('../../templates/sections/overview.jade') arguments...
artistCellTemplate = -> require('../../../../components/artist_cell/index.jade') arguments...

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
    .then ({ artist }) => @trigger 'metaphysicsSync', artist

  renderRails: (artist)->
    console.log 'fetched'
    _.each artist, (value, key) =>
      $el = @$("#artist-related-#{key}-section")
      this["renderRelated#{capitalize(key)}"]($el.find('.js-mgr-cells'), value)

      _.defer -> initCarousel $el.find('.js-artist-rail')

  renderRelatedArtists: (el, artists) ->
    $(el).html _.map artists, (artist) ->
      artist.counts.artworks ?= 0
      artist.counts.for_sale_artworks ?= 0
      $(artistCellTemplate artist: artist).addClass 'js-mgr-cell mgr-cell'
    _.defer => @setupFollowButtons section: el, type: 'artist'

  setupFollowButtons: ({section, type})=>
    ids = $(section).find('.follow-button').map ->
      following = @following
      id = ($el = $(this)).data 'id'
      new FollowButton
        context_page: "Artists page"
        context_module: "Overview tab, related #{type} rail"
        following: following
        model: new Backbone.Model id: id
        modelName: type
        el: $el

    @following?.syncFollows ids

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'
    $el

  fadeInSections: ->
    _.each @statuses, (status, key) =>
      @fadeInSection @$("#artist-related-#{key}-section") if status

  postRender: ->
    console.log 'postRender'
    # Sub-header
    @setupRelatedGenes()
    # Main section
    { @filterView, @sticky } = initWorksSection
      el: @$('#artwork-section')
      model: @model
      allLoaded: => @fadeInSections()
    @subViews.push @filterView

  setupRelatedGenes: ->
    subView = new RelatedGenesView(el: @$('.artist-related-genes'), id: @model.id)
    subView.collection.on 'sync', =>
      @setupBlurb()
      mediator.trigger 'related:genes:render'
    @subViews.push subView

  render: ->
    # Template expects plain JSON, not a Backbone model.
    @$el.html template
      artist: @model.toJSON()
      viewHelpers: viewHelpers
      statuses: @statuses
    console.log 'render'
    _.defer => @postRender()
    this

  remove: ->
    @filterView.artworks.off 'sync'
    _.invoke @subViews, 'remove'
