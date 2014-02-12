_              = require 'underscore'
sd             = require('sharify').data
Backbone       = require 'backbone'
CurrentUser    = require '../../../models/current_user.coffee'
Artist         = require '../../../models/artist.coffee'
Artworks       = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
template       = -> require('../templates/artists_artist.jade') arguments...
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

module.exports = class PartnerArtistsArtistView extends Backbone.View

  initialize: (options={}) ->
    @listenTo @model, "sync", @render
    @render()
    @fetchArtist()
    @fetchArtworks()
    @initFollowButton()

  render: ->
    if @isRendered
      @$('.partner-artist-brief').html(
        "#{@model.get('nationality')}, #{@model.get('years')}"
      )
      @$('.partner-artist-blurb').html @model.get('blurb')
    else
      @$el.html $( template artist: @model )
      @isRendered = true

  fetchArtist: ->
    @model.fetch cache: true

  fetchArtworks: ->
    artworks = new Artworks()
    artworks.url = "#{@model.url()}/artworks"
    artworks.fetch
      success: =>
        new ArtworkColumnsView
          el: @$('.partner-artist-artworks')
          collection: artworks
          seeMore: true

  initFollowButton: ->
    following = new Following null, kind: 'artist' if sd.CURRENT_USER?
    new FollowButton
      analyticsFollowMessage: 'Followed artist from /:id/artists'
      analyticsUnfollowMessage: 'Unfollowed artist from /:id/artists'
      following: following
      model: @model
      el: @$('.follow-button')
    following?.syncFollows [@model.get('id')]
