_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
FollowButton = require '../../../../components/follow_button/view.coffee'
template = -> require('../../templates/sections/related_artists.jade') arguments...
metaphysics = require '../../../../lib/metaphysics.coffee'
query = require '../../queries/artists.coffee'

module.exports = class RelatedArtistsView extends Backbone.View
  subViews: []

  initialize: ({ @user, @statuses }) ->
    if @user?
      @following = new Following(null, kind: 'artist')

    @listenTo this, 'artist:artists:sync', @render

    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
        artists: @statuses.artists
        contemporary: @statuses.contemporary
    .then ({ artist }) => @trigger 'artist:artists:sync', artist

  setupFollowButtons: (artists)=>
    ids = @$('.artist-related-artists-section .follow-button').map ->
      following = @following
      id = ($el = $(this)).data 'id'
      artist = _.findWhere(artists, id:id)
      new FollowButton
        context_page: "Artists page"
        context_module: "Related Artists tab"
        following: following
        model: new Backbone.Model id: id
        modelName: 'artist'
        el: $el
        href: _.findWhere(artists, id:id).href
      id

    @following?.syncFollows ids

  postRender: ->
    @setupFollowButtons @relatedArtists
    rail = new ArtworkRailView
      $el: @$(".artist-artworks-rail")
      collection: @model.related().artworks
      title: "Works by #{@model.get('name')}"
      viewAllUrl: "#{@model.href()}/works"
      imageHeight: 180
    @subViews.push rail
    rail.collection.trigger 'sync'
    @fadeInSection @$('.artist-related-artists-section')

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'
    $el

  render: ({ artists, contemporary } = {})->
    @relatedArtists = _.flatten [artists, contemporary]
    @$el.html template { artists, contemporary }
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
