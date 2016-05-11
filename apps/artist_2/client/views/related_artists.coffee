_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
FollowButton = require '../../../../components/follow_button/view.coffee'
template = -> require('../../templates/sections/related_artists.jade') arguments...
artistCellTemplate = -> require('../../../../components/artist_cell/index.jade') arguments...
metaphysics = require '../../../../lib/metaphysics.coffee'

query =
  """
  query artist($artist_id: String!, $contemporary: Boolean!, $artists: Boolean!) {
    artist(id: $artist_id) {
      ... relatedArtists
    }
  }
  #{require '../../components/related_artists/query.coffee'}

  """

module.exports = class RelatedArtistsView extends Backbone.View
  subViews: []

  initialize: ({ @user, @statuses }) ->
    @keys = _.select ['artists', 'contemporaory'], (key) => @statuses[key]
    if @user?
      @following = new Following(null, kind: 'artist')

    @listenTo this, 'metaphysicsSync', @renderRelated

  fetchRelated: ->
    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
        contemporary: @statuses.contemporary
        artists: @statuses.artists

    .then ({artist}) => @trigger 'metaphysicsSync', artist

  renderRelated: (artist)->
    console.log 'render related'
    _.each artist, (value, key) =>
      $section = @$("#artist-related-#{key}-section")
      $body = $section.find("#artist-related-#{key}-content")
      $body.html _.map value, (artist) ->
        artist.counts.artworks ?= 0
        artist.counts.for_sale_artworks ?= 0
        $(artistCellTemplate artist: artist).addClass 'grid-item'
      @fadeInSection $section

    _.defer @setupFollowButtons

  setupFollowButtons: =>
    ids = @$('#artist-related-artists-sections').find('.follow-button').map ->
      following = @following
      id = ($el = $(this)).data 'id'
      new FollowButton
        context_page: "Artists page"
        context_module: "Related Artists tab"
        following: following
        model: new Backbone.Model id: id
        modelName: 'artist'
        el: $el

    @following?.syncFollows ids

  postRender: ->
    @subViews.push new ArtworkRailView
      $el: @$(".artist-artworks-rail")
      collection: @model.related().artworks
      title: "Works by #{@model.get('name')}"
      viewAllUrl: "#{@model.href()}/works"
      imageHeight: 180

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'
    $el

  render: ->
    @$el.html template statuses: @statuses
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
