_                       = require 'underscore'
Backbone                = require 'backbone'
relatedArtistsTemplate  = -> require('../templates/related_artists.jade') arguments...
Artist                  = require '../../../models/artist.coffee'

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

module.exports = class RelatedArtists extends Backbone.View

  initialize: (options) ->
    @currentUser = options.currentUser
    @pageSize = options.pageSize

    @artists = @model.relatedArtists(@pageSize).models
    return @$el.remove() if @artists.length is 0

    @renderOnce = _.after @artists.length, => @render()
    @getArtistImages @artists

  render: ->
    @$el.html relatedArtistsTemplate( artists: @artists, currentUser: @currentUser )

    @setupFollowing() if @currentUser

  getArtistImages: (artists) ->
    for artist in artists
      artist.once 'change:poster_artwork', @renderOnce
      artist.fetchPosterArtwork()
      artist

  # return {Array} array of artist IDs
  setupFollowButtons: ($buttons, message, following) ->
    _.map $buttons, (el) =>
      id = ($el = $(el)).data 'id'
      new FollowButton
        analyticsFollowMessage: message
        following: following
        model: new Artist id: id
        modelName: 'artist'
        el: $el
      id

  setupFollowing: ->
    following = new Following(null, kind: 'artist')
    artistIds = @setupFollowButtons @$('.follow-button'), "Followed from Post page", following
    following.syncFollows artistIds
